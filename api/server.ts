import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleApiRequest } from '../src/api/handler';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const urlPath = req.url || '/api/no';
    
    // Convert Vercel query shape to flat Record<string, string>
    const queryParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.query)) {
      if (typeof value === 'string') {
        queryParams[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        queryParams[key] = value[0];
      }
    }

    const { status, body } = handleApiRequest(urlPath, queryParams);

    res.status(status).json(body);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
