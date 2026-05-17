import React, { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { notificarNuevoTicket } from '../services/notificationService';
import '../Css/SoporteTecnico.css';

type Prioridad = 'baja' | 'media' | 'alta' | 'critica';

interface FormState {
  nombre: string;
  email: string;
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

const PRIORIDAD_LABELS: Record<Prioridad, string> = {
  baja: 'Baja — Sin urgencia, funciona normal',
  media: 'Media — Funciona con limitaciones',
  alta: 'Alta — Impacto significativo en operaciones',
  critica: 'Crítica — Sistema caído o inaccesible',
};

export default function SoporteTecnico() {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    titulo: '',
    descripcion: '',
    prioridad: 'media',
  });
  const [adjuntos, setAdjuntos] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [enviando, setEnviando] = useState(false);
  const [ticketCreado, setTicketCreado] = useState<{ id: string; codigo: string } | null>(null);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    const omitidos: string[] = [];
    const validos: File[] = [];

    Array.from(files).forEach(f => {
      if (!f.type.startsWith('image/')) return;
      if (f.size > 5 * 1024 * 1024) { omitidos.push(f.name); return; }
      validos.push(f);
    });

    if (omitidos.length) {
      alert(`Los siguientes archivos superan 5 MB y no se adjuntarán:\n${omitidos.join(', ')}`);
    }

    setAdjuntos(prev => [...prev, ...validos].slice(0, 5));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  };

  const removeFile = (i: number) => setAdjuntos(prev => prev.filter((_, idx) => idx !== i));

  const resetForm = () => {
    setForm({ nombre: '', email: '', titulo: '', descripcion: '', prioridad: 'media' });
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
        const fileRef = storageRef(storage, `tickets/${Date.now()}_${safeName}`);
        await uploadBytes(fileRef, file);
        urlsAdjuntos.push(await getDownloadURL(fileRef));
      }

      const docRef = await addDoc(collection(db, 'tickets'), {
        nombre: form.nombre.trim(),
        email: form.email.trim().toLowerCase(),
        titulo: form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        prioridad: form.prioridad,
        estado: 'pendiente',
        adjuntos: urlsAdjuntos,
        respuestaAdmin: null,
        fechaCreacion: serverTimestamp(),
        fechaActualizacion: serverTimestamp(),
        actividad: [{
          tipo: 'creacion',
          descripcion: 'Ticket creado por el usuario',
          fecha: new Date().toISOString(),
          usuario: form.nombre.trim(),
        }],
      });

      // Fire-and-forget admin notification
      notificarNuevoTicket({
        id: docRef.id,
        nombre: form.nombre,
        email: form.email,
        titulo: form.titulo,
        descripcion: form.descripcion,
        prioridad: form.prioridad,
      });

      setTicketCreado({ id: docRef.id, codigo: `TKT-${docRef.id.slice(0, 8).toUpperCase()}` });
    } catch (err) {
      console.error('Error al crear ticket:', err);
      setErrorEnvio('Ocurrió un error al enviar el ticket. Por favor, intentá nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (ticketCreado) {
    return (
      <div className="soporte-page">
        <div className="soporte-success">
          <div className="success-icon">✓</div>
          <h2>¡Ticket enviado exitosamente!</h2>
          <p>Tu reporte fue recibido. Nuestro equipo técnico lo revisará a la brevedad.</p>
          <div className="ticket-id">
            ID de tu ticket: <strong>{ticketCreado.codigo}</strong>
          </div>
          <p className="success-note">
            Recibirás una respuesta en <strong>{form.email}</strong>
          </p>
          <button onClick={resetForm}>Reportar otro problema</button>
        </div>
      </div>
    );
  }

  return (
    <div className="soporte-page">
      <div className="soporte-header">
        <div className="soporte-badge">
          <span className="badge-dot" /> Soporte activo
        </div>
        <h1>Soporte Técnico</h1>
        <p>Reportá un problema o falla del sistema y nuestro equipo te ayudará a resolverlo.</p>
      </div>

      <form className="soporte-form" onSubmit={handleSubmit} noValidate>
        <p className="form-section-title">Información de contacto</p>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre y apellido"
              className={errors.nombre ? 'error' : ''}
              autoComplete="name"
            />
            {errors.nombre && <span className="error-msg">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email de contacto *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={errors.email ? 'error' : ''}
              autoComplete="email"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
        </div>

        <p className="form-section-title">Detalle del problema</p>

        <div className="form-group">
          <label htmlFor="titulo">Título del problema *</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Ej: Error al emitir factura electrónica"
            className={errors.titulo ? 'error' : ''}
          />
          {errors.titulo && <span className="error-msg">{errors.titulo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción detallada *</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Describí el problema con el mayor detalle posible: qué estabas haciendo, cuándo ocurrió, si aparecen mensajes de error, pasos para reproducirlo, etc."
            className={errors.descripcion ? 'error' : ''}
          />
          <span
            className="char-count"
            style={{ color: form.descripcion.length < 20 ? 'var(--text-dim)' : 'var(--accent-cyan)' }}
          >
            {form.descripcion.length} caracteres{form.descripcion.length < 20 ? ' (mínimo 20)' : ''}
          </span>
          {errors.descripcion && <span className="error-msg">{errors.descripcion}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="prioridad">Nivel de prioridad *</label>
          <select
            id="prioridad"
            name="prioridad"
            value={form.prioridad}
            onChange={handleChange}
            className={`prioridad-select prioridad-${form.prioridad}`}
          >
            {(Object.entries(PRIORIDAD_LABELS) as [Prioridad, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <p className="form-section-title">Capturas de pantalla (opcional)</p>

        <div className="form-group">
          <div
            className="upload-area"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
          >
            <span className="upload-icon">📎</span>
            <p><span>Hacé clic o arrastrá</span> imágenes aquí</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.75rem' }}>
              Solo imágenes · Máx. 5 archivos · 5 MB cada uno
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileInput}
          />

          {adjuntos.length > 0 && (
            <div className="attached-files">
              {adjuntos.map((f, i) => (
                <div key={i} className="attached-file">
                  📷 {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                  <button type="button" onClick={() => removeFile(i)} aria-label="Eliminar archivo">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {errorEnvio && <div className="form-error-global">⚠ {errorEnvio}</div>}

        <button type="submit" className="soporte-submit-btn" disabled={enviando}>
          {enviando ? (
            <><span className="spinner-sm" />Enviando ticket…</>
          ) : (
            'Enviar Ticket de Soporte'
          )}
        </button>
      </form>
    </div>
  );
}
