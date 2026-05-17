// Servicio de notificaciones para tickets de soporte.
// Los emails se envían via la función serverless /api/notificar-ticket (Vercel).

export interface TicketNotification {
  id: string;
  nombre: string;
  email: string;
  titulo: string;
  descripcion: string;
  prioridad: string;
  firebaseUid?: string;
}

export async function notificarNuevoTicket(ticket: TicketNotification): Promise<void> {
  const ticketId = `TKT-${ticket.id.slice(0, 8).toUpperCase()}`;

  try {
    await fetch('/api/notificar-ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticketId,
        nombre:      ticket.nombre,
        email:       ticket.email,
        titulo:      ticket.titulo,
        descripcion: ticket.descripcion,
        prioridad:   ticket.prioridad,
        firebaseUid: ticket.firebaseUid,
      }),
    });
  } catch (err) {
    // La notificación falla silenciosamente para no interrumpir la creación del ticket
    console.error('[Soporte] Error al notificar:', err);
  }
}
