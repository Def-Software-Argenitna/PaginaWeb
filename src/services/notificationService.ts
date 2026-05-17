// Notification service for support tickets.
// Configure VITE_DISCORD_WEBHOOK_URL in your .env to enable Discord notifications.
// Email notifications (EmailJS / backend) to be wired up when credentials are ready.

export interface TicketNotification {
  id: string;
  nombre: string;
  email: string;
  titulo: string;
  descripcion: string;
  prioridad: string;
}

const PRIORITY_COLORS: Record<string, number> = {
  baja: 0x4ade80,
  media: 0xfacc15,
  alta: 0xf97316,
  critica: 0xf43f5e,
};

const PRIORITY_LABELS: Record<string, string> = {
  baja: '🟢 Baja',
  media: '🟡 Media',
  alta: '🟠 Alta',
  critica: '🔴 Crítica',
};

export async function notificarNuevoTicket(ticket: TicketNotification): Promise<void> {
  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL as string | undefined;

  if (!webhookUrl) {
    console.info('[Soporte] Ticket creado:', `TKT-${ticket.id.slice(0, 8).toUpperCase()}`, '— Discord webhook no configurado.');
    return;
  }

  try {
    const desc = ticket.descripcion.length > 300
      ? ticket.descripcion.slice(0, 300) + '…'
      : ticket.descripcion;

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: `🎫 Nuevo Ticket: TKT-${ticket.id.slice(0, 8).toUpperCase()}`,
          color: PRIORITY_COLORS[ticket.prioridad] ?? 0xaaaaaa,
          fields: [
            { name: 'Título', value: ticket.titulo, inline: false },
            { name: 'Usuario', value: ticket.nombre, inline: true },
            { name: 'Email', value: ticket.email, inline: true },
            { name: 'Prioridad', value: PRIORITY_LABELS[ticket.prioridad] ?? ticket.prioridad, inline: true },
            { name: 'Descripción', value: desc, inline: false },
          ],
          footer: { text: 'DEF Software — Sistema de Soporte Técnico' },
          timestamp: new Date().toISOString(),
        }],
      }),
    });
  } catch (err) {
    // Notification failure should never block ticket creation
    console.error('[Soporte] Error al enviar notificación Discord:', err);
  }
}
