import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../Context/useAuth';
import '../Css/AdminTickets.css';

type Estado = 'pendiente' | 'en_proceso' | 'resuelto';
type Prioridad = 'baja' | 'media' | 'alta' | 'critica';
type SortKey = 'fecha_desc' | 'fecha_asc' | 'prioridad';

interface ActivityItem {
  tipo: 'creacion' | 'cambio_estado' | 'respuesta';
  descripcion: string;
  fecha: string;
  usuario: string;
}

interface Ticket {
  id: string;
  nombre: string;
  email: string;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  estado: Estado;
  adjuntos: string[];
  respuestaAdmin: string | null;
  fechaCreacion: Timestamp;
  fechaActualizacion: Timestamp;
  actividad: ActivityItem[];
}

const ESTADO_LABELS: Record<Estado, string> = {
  pendiente: 'Pendiente',
  en_proceso: 'En proceso',
  resuelto: 'Resuelto',
};

const PRIORIDAD_LABELS: Record<Prioridad, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
  critica: 'Crítica',
};

const PRIORITY_ORDER: Record<Prioridad, number> = { critica: 0, alta: 1, media: 2, baja: 3 };

function formatDate(ts: Timestamp | undefined | null): string {
  if (!ts) return '—';
  const d = ts.toDate();
  return (
    d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' +
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  );
}

function formatActivityDate(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' +
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  );
}

function ticketCode(id: string) {
  return `TKT-${id.slice(0, 8).toUpperCase()}`;
}

export default function AdminTickets() {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [filterEstado, setFilterEstado] = useState<Estado | 'todos'>('todos');
  const [filterPrioridad, setFilterPrioridad] = useState<Prioridad | 'todos'>('todos');
  const [sortBy, setSortBy] = useState<SortKey>('fecha_desc');
  const [respuesta, setRespuesta] = useState('');
  const [guardando, setGuardando] = useState(false);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) ?? null;

  // Pre-fill reply textarea when a different ticket is opened
  useEffect(() => {
    if (selectedTicketId) {
      const t = tickets.find(tk => tk.id === selectedTicketId);
      setRespuesta(t?.respuestaAdmin ?? '');
    }
  }, [selectedTicketId]); // intentionally not depending on tickets to avoid overwriting in-progress typing

  useEffect(() => {
    const q = query(collection(db, 'tickets'), orderBy('fechaCreacion', 'desc'));
    const unsub = onSnapshot(q, snapshot => {
      setTickets(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Ticket)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const filteredTickets = tickets
    .filter(t => filterEstado === 'todos' || t.estado === filterEstado)
    .filter(t => filterPrioridad === 'todos' || t.prioridad === filterPrioridad)
    .sort((a, b) => {
      if (sortBy === 'fecha_asc') return (a.fechaCreacion?.seconds ?? 0) - (b.fechaCreacion?.seconds ?? 0);
      if (sortBy === 'prioridad') return PRIORITY_ORDER[a.prioridad] - PRIORITY_ORDER[b.prioridad];
      return (b.fechaCreacion?.seconds ?? 0) - (a.fechaCreacion?.seconds ?? 0);
    });

  const stats = {
    total: tickets.length,
    pendiente: tickets.filter(t => t.estado === 'pendiente').length,
    en_proceso: tickets.filter(t => t.estado === 'en_proceso').length,
    resuelto: tickets.filter(t => t.estado === 'resuelto').length,
  };

  const filtersActive =
    filterEstado !== 'todos' || filterPrioridad !== 'todos' || sortBy !== 'fecha_desc';

  const clearFilters = () => {
    setFilterEstado('todos');
    setFilterPrioridad('todos');
    setSortBy('fecha_desc');
  };

  const cambiarEstado = async (ticket: Ticket, nuevoEstado: Estado) => {
    if (ticket.estado === nuevoEstado || guardando) return;
    setGuardando(true);
    try {
      const item: ActivityItem = {
        tipo: 'cambio_estado',
        descripcion: `Estado cambiado de "${ESTADO_LABELS[ticket.estado]}" a "${ESTADO_LABELS[nuevoEstado]}"`,
        fecha: new Date().toISOString(),
        usuario: currentUser?.email ?? 'Admin',
      };
      await updateDoc(doc(db, 'tickets', ticket.id), {
        estado: nuevoEstado,
        fechaActualizacion: serverTimestamp(),
        actividad: arrayUnion(item),
      });
    } finally {
      setGuardando(false);
    }
  };

  const enviarRespuesta = async () => {
    if (!selectedTicket || !respuesta.trim() || guardando) return;
    setGuardando(true);
    try {
      const preview = respuesta.trim().slice(0, 120);
      const item: ActivityItem = {
        tipo: 'respuesta',
        descripcion: `Respuesta del equipo: "${preview}${respuesta.length > 120 ? '…' : ''}"`,
        fecha: new Date().toISOString(),
        usuario: currentUser?.email ?? 'Admin',
      };
      await updateDoc(doc(db, 'tickets', selectedTicket.id), {
        respuestaAdmin: respuesta.trim(),
        estado: selectedTicket.estado === 'pendiente' ? 'en_proceso' : selectedTicket.estado,
        fechaActualizacion: serverTimestamp(),
        actividad: arrayUnion(item),
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Panel de Soporte</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', margin: '0.2rem 0 0' }}>
            Administración de tickets técnicos · {currentUser?.email}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#facc15' }}>{stats.pendiente}</div>
          <div className="stat-label">Pendientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#60a5fa' }}>{stats.en_proceso}</div>
          <div className="stat-label">En proceso</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#4ade80' }}>{stats.resuelto}</div>
          <div className="stat-label">Resueltos</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <div className="filter-group">
          <label>Estado</label>
          <select value={filterEstado} onChange={e => setFilterEstado(e.target.value as Estado | 'todos')}>
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En proceso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Prioridad</label>
          <select value={filterPrioridad} onChange={e => setFilterPrioridad(e.target.value as Prioridad | 'todos')}>
            <option value="todos">Todas</option>
            <option value="critica">Crítica</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Ordenar</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}>
            <option value="fecha_desc">Más recientes</option>
            <option value="fecha_asc">Más antiguos</option>
            <option value="prioridad">Por prioridad</option>
          </select>
        </div>
        {filtersActive && (
          <button className="filter-clear" onClick={clearFilters}>
            Limpiar filtros
          </button>
        )}
        <span className="filter-count">
          {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Ticket list */}
      {loading ? (
        <div className="loading-state">
          <div className="admin-spinner" />
          Cargando tickets…
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🎫</span>
          <p>
            {tickets.length === 0
              ? 'No hay tickets aún. Cuando los usuarios reporten problemas aparecerán aquí.'
              : 'Ningún ticket coincide con los filtros seleccionados.'}
          </p>
        </div>
      ) : (
        <div className="ticket-list">
          {filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              className={`ticket-card ${selectedTicketId === ticket.id ? 'selected' : ''}`}
              onClick={() => setSelectedTicketId(ticket.id)}
            >
              <div className={`ticket-priority-dot ${ticket.prioridad}`} />
              <div className="ticket-card-main">
                <div className="ticket-id-tag">{ticketCode(ticket.id)}</div>
                <div className="ticket-card-title">{ticket.titulo}</div>
                <div className="ticket-card-meta">
                  {ticket.nombre} · {ticket.email}
                </div>
              </div>
              <span className={`ticket-status-badge status-${ticket.estado}`}>
                {ESTADO_LABELS[ticket.estado]}
              </span>
              <span className="ticket-date-col">{formatDate(ticket.fechaCreacion)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedTicket && (
        <div
          className="ticket-detail-overlay"
          onClick={e => { if (e.target === e.currentTarget) setSelectedTicketId(null); }}
        >
          <div className="ticket-detail-modal">
            <div className="modal-header">
              <div>
                <div className="modal-ticket-code">{ticketCode(selectedTicket.id)}</div>
                <h2>{selectedTicket.titulo}</h2>
              </div>
              <button className="modal-close" onClick={() => setSelectedTicketId(null)} aria-label="Cerrar">
                ✕
              </button>
            </div>

            {/* Info grid */}
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">Usuario</div>
                <div className="detail-value">{selectedTicket.nombre}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Email</div>
                <div className="detail-value">{selectedTicket.email}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Prioridad</div>
                <div className="detail-value">
                  <span className={`prioridad-badge ${selectedTicket.prioridad}`}>
                    {PRIORIDAD_LABELS[selectedTicket.prioridad]}
                  </span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Creado</div>
                <div className="detail-value">{formatDate(selectedTicket.fechaCreacion)}</div>
              </div>
            </div>

            {/* Description */}
            <div className="detail-description">
              <div className="detail-label">Descripción del problema</div>
              <p>{selectedTicket.descripcion}</p>
            </div>

            {/* Attachments */}
            {selectedTicket.adjuntos.length > 0 && (
              <div className="detail-attachments">
                <div className="detail-label">
                  Adjuntos ({selectedTicket.adjuntos.length})
                </div>
                <div className="attachments-grid">
                  {selectedTicket.adjuntos.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                      <img src={url} alt={`Adjunto ${i + 1}`} className="attachment-thumb" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Current admin response */}
            {selectedTicket.respuestaAdmin && (
              <div className="current-response">
                <div className="detail-label">Respuesta actual del equipo</div>
                <p>{selectedTicket.respuestaAdmin}</p>
              </div>
            )}

            {/* Admin actions */}
            <div className="admin-actions">
              <p className="actions-subtitle">Cambiar estado</p>
              <div className="status-buttons">
                {(['pendiente', 'en_proceso', 'resuelto'] as Estado[]).map(estado => (
                  <button
                    key={estado}
                    className={`status-btn ${estado}${selectedTicket.estado === estado ? ' active' : ''}`}
                    onClick={() => cambiarEstado(selectedTicket, estado)}
                    disabled={guardando || selectedTicket.estado === estado}
                  >
                    {selectedTicket.estado === estado ? '✓ ' : ''}{ESTADO_LABELS[estado]}
                  </button>
                ))}
              </div>

              <p className="actions-subtitle">Responder al usuario</p>
              <div className="reply-area">
                <textarea
                  value={respuesta}
                  onChange={e => setRespuesta(e.target.value)}
                  placeholder="Escribí la respuesta que recibirá el usuario…"
                />
                <button
                  className="reply-btn"
                  onClick={enviarRespuesta}
                  disabled={guardando || !respuesta.trim()}
                >
                  {guardando ? 'Guardando…' : 'Guardar respuesta'}
                </button>
              </div>
            </div>

            {/* Activity history */}
            {selectedTicket.actividad?.length > 0 && (
              <div className="activity-section">
                <p className="actions-subtitle">Historial de actividad</p>
                <div className="activity-list">
                  {[...selectedTicket.actividad].reverse().map((item, i) => (
                    <div key={i} className={`activity-item tipo-${item.tipo}`}>
                      <div className="activity-dot" />
                      <div>
                        <div className="activity-desc">{item.descripcion}</div>
                        <div className="activity-date">
                          {formatActivityDate(item.fecha)}
                          {item.usuario ? ` · ${item.usuario}` : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
