import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const gestionUrl = process.env.GESTION_API_URL;
  const { firebaseUid } = req.query;

  if (!gestionUrl || !firebaseUid) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const resp = await fetch(
      `${gestionUrl}/api/lookup/sucursales?firebaseUid=${encodeURIComponent(firebaseUid as string)}`,
    );
    const data = await resp.json();
    return res.status(resp.status).json(data);
  } catch {
    return res.status(500).json({ error: 'Error connecting to Gestionclientes' });
  }
}
