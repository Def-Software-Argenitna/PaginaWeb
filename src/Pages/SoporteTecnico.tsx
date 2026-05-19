import React, { useState, useRef, useEffect } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  collection, addDoc, query, where, onSnapshot, serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../Context/useAuth';
import { notificarNuevoTicket } from '../services/notificationService';
import '../Css/SoporteTecnico.css';

type Prioridad    = 'baja' | 'media' | 'alta' | 'critica';
type EstadoTicket = 'pendiente' | 'en_proceso' | 'resuelto';
type FiltroEstado = 'todos' | EstadoTicket;

interface Sucursal {
  id: number;
  name: string;
  address: string | null;
}

interface FormState {
  nombre: string;
  email: string;
  sucursal: string;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  titulo?: string;
  descripcion?: string;
}

interface Ticket {
  id: string;
  nombre: string;
  email: string;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  estado: EstadoTicket;
  respuestaAdmin: string | null;
  fechaCreacion: Timestamp | null;
  fechaActualizacion: Timestamp | null;
  adjuntos: string[];
}

const PRIORIDAD_LABELS: Record<Prioridad, string> = {
  baja:    'Baja — Sin urgencia, funciona normal',
  media:   'Media — Funciona con limitaciones',
  alta:    'Alta — Impacto significativo en operaciones',
  critica: 'Crítica — Sistema caído o inaccesible',
};

const ESTADO_LABEL: Record<EstadoTicket, string> = {
  pendiente:  'Pendiente',
  en_proceso: 'En proceso',
  resuelto:   'Resuelto',
};

const ESTADO_COLOR: Record<EstadoTicket, string> = {
  pendiente:  'rgba(251,191,36,0.15)',
  en_proceso: 'rgba(59,130,246,0.15)',
  resuelto:   'rgba(16,185,129,0.15)',
};

const ESTADO_TEXT: Record<EstadoTicket, string> = {
  pendiente:  '#fbbf24',
  en_proceso: '#60a5fa',
  resuelto:   '#34d399',
};

const PRIORIDAD_TEXT: Record<Prioridad, string> = {
  baja:    '#34d399',
  media:   '#fbbf24',
  alta:    '#fb923c',
  critica: '#f87171',
};

const formatFecha = (ts: Timestamp | null): string => {
  if (!ts) return '—';
  return ts.toDate().toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

export default function SoporteTecnico() {
  const { login } = useAuth();

  // ── Auth gate: siempre empieza en false (pide credenciales en cada visita) ──
  const [soporteVerificado, setSoporteVerificado] = useState(false);
  const [usuarioActual, setUsuarioActual]         = useState<{ uid: string; email: string } | null>(null);
  const [loginEmail, setLoginEmail]               = useState('');
  const [loginPassword, setLoginPassword]         = useState('');
  const [loginError, setLoginError]               = useState('');
  const [loginLoading, setLoginLoading]           = useState(false);

  // ── Ticket form ──────────────────────────────────────────────────────────────
  const [form, setForm]         = useState<FormState>({ nombre: '', email: '', sucursal: '', titulo: '', descripcion: '', prioridad: 'media' });
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [loadingSucursales, setLoadingSucursales] = useState(false);
  const [adjuntos, setAdjuntos] = useState<File[]>([]);
  const [errors, setErrors]     = useState<FormErrors>({});
  const [enviando, setEnviando] = useState(false);
  const [ticketCreado, setTicketCreado] = useState<{ id: string; codigo: string } | null>(null);
  const [errorEnvio, setErrorEnvio]     = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Ticket list ──────────────────────────────────────────────────────────────
  const [misTickets, setMisTickets]           = useState<Ticket[]>([]);
  const [loadingTickets, setLoadingTickets]   = useState(false);
  const [filtro, setFiltro]                   = useState<FiltroEstado>('todos');
  const [expandido, setExpandido]             = useState<string | null>(null);

  // ── Login ────────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const cred = await login(loginEmail, loginPassword);
      const user = cred.user;
      setUsuarioActual({ uid: user.uid, email: user.email! });

      // Obtener nombre desde la base de datos de Gestionclientes
      let nombre = '';
      const gestionUrl = import.meta.env.VITE_GESTION_API_URL as string | undefined;
      if (gestionUrl) {
        try {
          const resp = await fetch(
            `${gestionUrl}/api/lookup/admin-email?firebaseUid=${encodeURIComponent(user.uid)}`,
          );
          if (resp.ok) {
            const data = await resp.json() as { nombre?: string | null };
            nombre = data.nombre ?? '';
          }
        } catch { /* si Gestionclientes no está disponible, el campo queda editable */ }

        // Cargar sucursales del cliente
        setLoadingSucursales(true);
        try {
          const respSuc = await fetch(
            `${gestionUrl}/api/lookup/sucursales?firebaseUid=${encodeURIComponent(user.uid)}`,
          );
          if (respSuc.ok) {
            const dataSuc = await respSuc.json() as { sucursales?: Sucursal[] };
            const lista = dataSuc.sucursales ?? [];
            setSucursales(lista);
            // Si solo hay una sucursal, seleccionarla automáticamente
            if (lista.length === 1) {
              setForm(prev => ({ ...prev, sucursal: lista[0].name }));
            }
          }
        } catch { /* sucursales no disponibles */ }
        setLoadingSucursales(false);
      }

      setForm(prev => ({ ...prev, email: user.email!, nombre }));
      setSoporteVerificado(true);
    } catch (err) {
      if (err instanceof FirebaseError) console.error('Login soporte:', err.code);
      setLoginError('Credenciales incorrectas. Usá el email y contraseña de tu aplicación.');
    }
    setLoginLoading(false);
  };

  // ── Cargar tickets en tiempo real ────────────────────────────────────────────
  useEffect(() => {
    if (!soporteVerificado || !usuarioActual) return;
    setLoadingTickets(true);
    const q = query(
      collection(db, 'tickets'),
      where('email', '==', usuarioActual.email),
    );
    const unsub = onSnapshot(q, snap => {
      const lista = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as Ticket))
        .sort((a, b) => (b.fechaCreacion?.toMillis() ?? 0) - (a.fechaCreacion?.toMillis() ?? 0));
      setMisTickets(lista);
      setLoadingTickets(false);
    });
    return unsub;
  }, [soporteVerificado, usuarioActual]);

  // ── Form helpers ─────────────────────────────────────────────────────────────
  const validar = (): boolean => {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido';
    if (!form.email.trim()) {
      e.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'El email no es válido';
    }
    if (!form.titulo.trim()) e.titulo = 'El título es requerido';
    if (!form.descripcion.trim()) {
      e.descripcion = 'La descripción es requerida';
    } else if (form.descripcion.trim().length < 20) {
      e.descripcion = 'La descripción debe tener al menos 20 caracteres';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    const omitidos: string[] = [];
    const validos: File[]    = [];
    Array.from(files).forEach(f => {
      if (!f.type.startsWith('image/')) return;
      if (f.size > 5 * 1024 * 1024) { omitidos.push(f.name); return; }
      validos.push(f);
    });
    if (omitidos.length) alert(`Los siguientes archivos superan 5 MB:\n${omitidos.join(', ')}`);
    setAdjuntos(prev => [...prev, ...validos].slice(0, 5));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => { processFiles(e.target.files); e.target.value = ''; };
  const handleDrop      = (e: React.DragEvent<HTMLDivElement>)      => { e.preventDefault(); processFiles(e.dataTransfer.files); };
  const removeFile      = (i: number) => setAdjuntos(prev => prev.filter((_, idx) => idx !== i));

  const resetForm = () => {
    setForm({ nombre: '', email: usuarioActual?.email ?? '', sucursal: sucursales.length === 1 ? sucursales[0].name : '', titulo: '', descripcion: '', prioridad: 'media' });
    setAdjuntos([]);
    setErrors({});
    setTicketCreado(null);
    setErrorEnvio(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    setEnviando(true);
    setErrorEnvio(null);
    try {
      const urlsAdjuntos: string[] = [];
      for (const file of adjuntos) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const fileRef  = storageRef(storage, `tickets/${Date.now()}_${safeName}`);
        await uploadBytes(fileRef, file);
        urlsAdjuntos.push(await getDownloadURL(fileRef));
      }

      const docRef = await addDoc(collection(db, 'tickets'), {
        nombre:      form.nombre.trim(),
        email:       form.email.trim().toLowerCase(),
        sucursal:    form.sucursal || null,
        titulo:      form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        prioridad:   form.prioridad,
        estado:      'pendiente',
        adjuntos:    urlsAdjuntos,
        respuestaAdmin: null,
        firebaseUid: usuarioActual?.uid ?? null,
        fechaCreacion:       serverTimestamp(),
        fechaActualizacion:  serverTimestamp(),
        actividad: [{
          tipo:        'creacion',
          descripcion: 'Ticket creado por el usuario',
          fecha:       new Date().toISOString(),
          usuario:     form.nombre.trim(),
        }],
      });

      notificarNuevoTicket({
        id:          docRef.id,
        nombre:      form.nombre,
        email:       form.email,
        sucursal:    form.sucursal || undefined,
        titulo:      form.titulo,
        descripcion: form.descripcion,
        prioridad:   form.prioridad,
        firebaseUid: usuarioActual?.uid,
      });

      setTicketCreado({ id: docRef.id, codigo: `TKT-${docRef.id.slice(0, 8).toUpperCase()}` });
    } catch (err) {
      console.error('Error al crear ticket:', err);
      setErrorEnvio('Ocurrió un error al enviar el ticket. Por favor, intentá nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  // ── 1. Gate de login ─────────────────────────────────────────────────────────
  if (!soporteVerificado) {
    return (
      <div className="soporte-page">
        <div className="soporte-header">
          <div className="soporte-badge"><span className="badge-dot" /> Soporte activo</div>
          <h1>Soporte Técnico</h1>
          <p>Ingresá con las credenciales de tu aplicación para acceder.</p>
        </div>

        <div className="soporte-form" style={{ maxWidth: '420px', margin: '0 auto' }}>
          {loginError && <div className="form-error-global" style={{ marginBottom: '1.25rem' }}>⚠ {loginError}</div>}

          <form onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label htmlFor="login-email">Correo electrónico</label>
              <input id="login-email" type="email" value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="tu@email.com" required autoComplete="email" />
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label htmlFor="login-password">Contraseña</label>
              <input id="login-password" type="password" value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••" required autoComplete="current-password" />
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: '0.75rem 0 1.25rem', lineHeight: 1.5 }}>
              Usá el mismo email y contraseña que en MeatManager, KioskManager u otra aplicación de DEF Software.
            </p>

            <button type="submit" className="soporte-submit-btn" disabled={loginLoading}>
              {loginLoading ? <><span className="spinner-sm" />Verificando…</> : 'Acceder al soporte'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── 2. Pantalla de éxito tras crear ticket ───────────────────────────────────
  if (ticketCreado) {
    return (
      <div className="soporte-page">
        <div className="soporte-success">
          <div className="success-icon">✓</div>
          <h2>¡Ticket enviado exitosamente!</h2>
          <p>Tu reporte fue recibido. Nuestro equipo técnico lo revisará a la brevedad.</p>
          <div className="ticket-id">ID de tu ticket: <strong>{ticketCreado.codigo}</strong></div>
          <p className="success-note">Recibirás una respuesta en <strong>{form.email}</strong></p>
          <button onClick={resetForm}>Reportar otro problema</button>
        </div>
      </div>
    );
  }

  // ── 3. Página principal: formulario + lista de tickets ───────────────────────
  const ticketsFiltrados = filtro === 'todos' ? misTickets : misTickets.filter(t => t.estado === filtro);
  const conteo = {
    todos:      misTickets.length,
    pendiente:  misTickets.filter(t => t.estado === 'pendiente').length,
    en_proceso: misTickets.filter(t => t.estado === 'en_proceso').length,
    resuelto:   misTickets.filter(t => t.estado === 'resuelto').length,
  };

  return (
    <div className="soporte-page">
      <div className="soporte-header">
        <div className="soporte-badge"><span className="badge-dot" /> Soporte activo</div>
        <h1>Soporte Técnico</h1>
        <p>Reportá un problema o falla del sistema y nuestro equipo te ayudará a resolverlo.</p>
      </div>

      {/* ── Formulario nuevo ticket ── */}
      <form className="soporte-form" onSubmit={handleSubmit} noValidate>
        <p className="form-section-title">Información de contacto</p>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input id="nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange}
              placeholder="Tu nombre y apellido" className={errors.nombre ? 'error' : ''} autoComplete="name" />
            {errors.nombre && <span className="error-msg">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email de contacto *</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="tu@email.com" className={errors.email ? 'error' : ''} autoComplete="email" />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
        </div>

        {sucursales.length > 0 && (
          <div className="form-group" style={{ marginTop: '0.5rem' }}>
            <label htmlFor="sucursal">Sucursal *</label>
            <select id="sucursal" name="sucursal" value={form.sucursal} onChange={handleChange}
              className="prioridad-select" disabled={loadingSucursales || sucursales.length === 1}>
              {sucursales.length > 1 && <option value="">Seleccioná una sucursal</option>}
              {sucursales.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name}{s.address ? ` — ${s.address}` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        <p className="form-section-title">Detalle del problema</p>

        <div className="form-group">
          <label htmlFor="titulo">Título del problema *</label>
          <input id="titulo" name="titulo" type="text" value={form.titulo} onChange={handleChange}
            placeholder="Ej: Error al emitir factura electrónica" className={errors.titulo ? 'error' : ''} />
          {errors.titulo && <span className="error-msg">{errors.titulo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción detallada *</label>
          <textarea id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange}
            placeholder="Describí el problema con el mayor detalle posible: qué estabas haciendo, cuándo ocurrió, si aparecen mensajes de error, pasos para reproducirlo, etc."
            className={errors.descripcion ? 'error' : ''} />
          <span className="char-count" style={{ color: form.descripcion.length < 20 ? 'var(--text-dim)' : 'var(--accent-cyan)' }}>
            {form.descripcion.length} caracteres{form.descripcion.length < 20 ? ' (mínimo 20)' : ''}
          </span>
          {errors.descripcion && <span className="error-msg">{errors.descripcion}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="prioridad">Nivel de prioridad *</label>
          <select id="prioridad" name="prioridad" value={form.prioridad} onChange={handleChange}
            className={`prioridad-select prioridad-${form.prioridad}`}>
            {(Object.entries(PRIORIDAD_LABELS) as [Prioridad, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <p className="form-section-title">Capturas de pantalla (opcional)</p>

        <div className="form-group">
          <div className="upload-area" onDragOver={e => e.preventDefault()} onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()} role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}>
            <span className="upload-icon">📎</span>
            <p><span>Hacé clic o arrastrá</span> imágenes aquí</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.75rem' }}>Solo imágenes · Máx. 5 archivos · 5 MB cada uno</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileInput} />
          {adjuntos.length > 0 && (
            <div className="attached-files">
              {adjuntos.map((f, i) => (
                <div key={i} className="attached-file">
                  📷 {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                  <button type="button" onClick={() => removeFile(i)} aria-label="Eliminar">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {errorEnvio && <div className="form-error-global">⚠ {errorEnvio}</div>}

        <button type="submit" className="soporte-submit-btn" disabled={enviando}>
          {enviando ? <><span className="spinner-sm" />Enviando ticket…</> : 'Enviar Ticket de Soporte'}
        </button>
      </form>

      {/* ── Lista de mis tickets ── */}
      <div className="mis-tickets-section">
        <h2 className="mis-tickets-title">Mis Tickets</h2>

        <div className="mis-tickets-tabs">
          {([
            ['todos',      'Todos',       conteo.todos],
            ['pendiente',  'Pendientes',  conteo.pendiente],
            ['en_proceso', 'En proceso',  conteo.en_proceso],
            ['resuelto',   'Resueltos',   conteo.resuelto],
          ] as [FiltroEstado, string, number][]).map(([key, label, count]) => (
            <button
              key={key}
              className={`mis-tickets-tab${filtro === key ? ' active' : ''}`}
              onClick={() => setFiltro(key)}
            >
              {label}
              {count > 0 && <span className="tab-badge">{count}</span>}
            </button>
          ))}
        </div>

        {loadingTickets ? (
          <div className="tickets-loading"><span className="spinner-sm" /> Cargando tickets…</div>
        ) : ticketsFiltrados.length === 0 ? (
          <div className="tickets-empty">
            {filtro === 'todos'
              ? 'Todavía no tenés tickets registrados.'
              : `No hay tickets ${ESTADO_LABEL[filtro as EstadoTicket]?.toLowerCase() ?? ''}.`}
          </div>
        ) : (
          <div className="tickets-lista">
            {ticketsFiltrados.map(ticket => {
              const codigo    = `TKT-${ticket.id.slice(0, 8).toUpperCase()}`;
              const abierto   = expandido === ticket.id;
              const respondido = ticket.respuestaAdmin && ticket.respuestaAdmin.trim().length > 0;

              return (
                <div key={ticket.id} className={`ticket-card${abierto ? ' abierto' : ''}`}>
                  <button
                    className="ticket-card-header"
                    onClick={() => setExpandido(abierto ? null : ticket.id)}
                    aria-expanded={abierto}
                  >
                    <div className="ticket-card-left">
                      <span className="ticket-codigo">{codigo}</span>
                      <span className="ticket-titulo">{ticket.titulo}</span>
                    </div>
                    <div className="ticket-card-right">
                      {respondido && (
                        <span className="ticket-badge-respondido">Respondido</span>
                      )}
                      <span
                        className="ticket-badge-estado"
                        style={{ background: ESTADO_COLOR[ticket.estado], color: ESTADO_TEXT[ticket.estado] }}
                      >
                        {ESTADO_LABEL[ticket.estado]}
                      </span>
                      <span
                        className="ticket-badge-prioridad"
                        style={{ color: PRIORIDAD_TEXT[ticket.prioridad] }}
                      >
                        {ticket.prioridad.charAt(0).toUpperCase() + ticket.prioridad.slice(1)}
                      </span>
                      <span className="ticket-fecha">{formatFecha(ticket.fechaCreacion)}</span>
                      <span className={`ticket-chevron${abierto ? ' rotado' : ''}`}>▾</span>
                    </div>
                  </button>

                  {abierto && (
                    <div className="ticket-card-body">
                      <div className="ticket-detalle-bloque">
                        <p className="ticket-detalle-label">Descripción</p>
                        <p className="ticket-detalle-texto">{ticket.descripcion}</p>
                      </div>

                      {ticket.adjuntos?.length > 0 && (
                        <div className="ticket-detalle-bloque">
                          <p className="ticket-detalle-label">Adjuntos</p>
                          <div className="ticket-adjuntos">
                            {ticket.adjuntos.map((url, i) => (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="ticket-adjunto-link">
                                Ver imagen {i + 1}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {respondido ? (
                        <div className="ticket-respuesta-bloque">
                          <p className="ticket-detalle-label">Respuesta del equipo</p>
                          <p className="ticket-respuesta-texto">{ticket.respuestaAdmin}</p>
                          <p className="ticket-respuesta-fecha">
                            Última actualización: {formatFecha(ticket.fechaActualizacion)}
                          </p>
                        </div>
                      ) : (
                        <div className="ticket-sin-respuesta">
                          Aún no hay respuesta. Te notificaremos cuando el equipo responda.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
