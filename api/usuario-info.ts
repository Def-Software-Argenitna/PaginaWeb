import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firebaseUid } = req.body ?? {};
  if (!firebaseUid) return res.status(400).json({ error: 'firebaseUid requerido' });

  const gestionUrl = process.env.GESTION_API_URL;
  const apiKey     = process.env.LOOKUP_API_KEY;

  if (!gestionUrl) return res.status(200).json({ nombre: null });

  try {
    const url     = `${gestionUrl}/api/lookup/admin-email?firebaseUid=${encodeURIComponent(firebaseUid)}`;
    const headers: Record<string, string> = {};
    if (apiKey) headers['x-api-key'] = apiKey;

    const resp = await fetch(url, { headers });
    if (!resp.ok) return res.status(200).json({ nombre: null });

    const data = await resp.json() as { nombre?: string | null };
    return res.status(200).json({ nombre: data.nombre ?? null });
  } catch {
    return res.status(200).json({ nombre: null });
  }
}
