import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const ADMIN_EMAILS = ['valentinmuzzio1@gmail.com', 'valentinmuzzio585@gmail.com'];

const PRIORIDAD: Record<string, string> = {
  baja: '🟢 Baja',
  media: '🟡 Media',
  alta: '🟠 Alta',
  critica: '🔴 Crítica',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { nombre, email, titulo, descripcion, prioridad, ticketId } = req.body ?? {};

  if (!nombre || !email || !titulo || !ticketId) {
    return res.status(400).json({ error: 'Faltan datos del ticket' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error('[Soporte] GMAIL_USER o GMAIL_APP_PASSWORD no configurados');
    return res.status(500).json({ error: 'Servicio de email no configurado' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  });

  const prioridadLabel = PRIORIDAD[prioridad] ?? prioridad;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #00f2fe, #9d50bb); padding: 28px 32px;">
        <h1 style="color: white; margin: 0; font-size: 22px;">🎫 Nuevo Ticket de Soporte</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">DEF Software — Sistema de Soporte Técnico</p>
      </div>
      <div style="padding: 28px 32px; background: white;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px; width: 130px;">ID del ticket</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #00b4d8; font-family: monospace; font-size: 15px;">${ticketId}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Usuario</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #0077b6;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Prioridad</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${prioridadLabel}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Título</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${titulo}</td>
          </tr>
        </table>
        <div style="background: #f4f4f8; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #666; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Descripción</p>
          <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${descripcion}</p>
        </div>
        <div style="text-align: center;">
          <a href="https://www.defsoftware.com.ar/admin/tickets" style="background: linear-gradient(135deg, #00f2fe, #9d50bb); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
            Ver en el Panel Admin →
          </a>
        </div>
      </div>
      <div style="padding: 16px 32px; background: #f0f0f0; text-align: center;">
        <p style="margin: 0; color: #999; font-size: 12px;">DEF Software · Sistema de Soporte Técnico · ${new Date().toLocaleString('es-AR')}</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"DEF Software Soporte" <${gmailUser}>`,
      to: ADMIN_EMAILS.join(', '),
      subject: `[${ticketId}] ${titulo} — Prioridad ${prioridadLabel}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[Soporte] Error al enviar email:', err);
    return res.status(500).json({ error: 'Error al enviar la notificación' });
  }
}
