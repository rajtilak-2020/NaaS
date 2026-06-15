import { reasons, CATEGORIES } from '../data/reasons';
import type { Category } from '../data/reasons';

export interface ApiResponse {
  id?: number;
  reason?: string;
  category?: Category | string;
  severity?: string;
  timestamp?: string;
  error?: string;
}

export function handleApiRequest(urlPath: string, queryParams: Record<string, string>): { status: number; body: any } {
  // Normalize path by stripping query string, double slashes, and trailing slashes
  const path = urlPath.split('?')[0].replace(/\/+/g, '/').replace(/\/$/, '');

  // 1. GET /api/categories
  if (path === '/api/categories') {
    return {
      status: 200,
      body: CATEGORIES
    };
  }

  // 2. GET /api/no/all
  if (path === '/api/no/all') {
    return {
      status: 200,
      body: reasons.map(r => ({
        ...r,
        timestamp: new Date().toISOString()
      }))
    };
  }

  // 3. GET /api/no
  if (path === '/api/no') {
    const idParam = queryParams.id;
    const catParam = queryParams.category;

    if (idParam !== undefined) {
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        return {
          status: 400,
          body: { error: 'Invalid ID parameter. Must be an integer.' }
        };
      }
      const item = reasons.find(r => r.id === id);
      if (!item) {
        return {
          status: 404,
          body: { error: `Reason with ID ${id} not found.` }
        };
      }
      return {
        status: 200,
        body: {
          ...item,
          timestamp: new Date().toISOString()
        }
      };
    }

    if (catParam !== undefined) {
      const category = catParam.toLowerCase() as Category;
      if (!CATEGORIES.includes(category)) {
        return {
          status: 400,
          body: { error: `Invalid category. Must be one of: ${CATEGORIES.join(', ')}` }
        };
      }
      const filtered = reasons.filter(r => r.category === category);
      if (filtered.length === 0) {
        return {
          status: 404,
          body: { error: `No reasons found for category ${category}.` }
        };
      }
      const item = filtered[Math.floor(Math.random() * filtered.length)];
      return {
        status: 200,
        body: {
          ...item,
          timestamp: new Date().toISOString()
        }
      };
    }

    // Default: random reason from the entire pool
    const item = reasons[Math.floor(Math.random() * reasons.length)];
    return {
      status: 200,
      body: {
        ...item,
        timestamp: new Date().toISOString()
      }
    };
  }

  // 4. Default 404
  return {
    status: 404,
    body: {
      error: 'Endpoint not found.',
      usage: {
        random: '/api/no',
        by_category: '/api/no?category=existential',
        by_id: '/api/no?id=42',
        all_reasons: '/api/no/all',
        all_categories: '/api/categories'
      }
    }
  };
}
