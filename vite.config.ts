import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { handleApiRequest } from './src/api/handler'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            try {
              // Parse URL and query params
              const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
              const queryParams: Record<string, string> = {};
              urlObj.searchParams.forEach((val, key) => {
                queryParams[key] = val;
              });

              // Call shared handler
              const { status, body } = handleApiRequest(urlObj.pathname, queryParams);

              // Send response
              res.statusCode = status;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
              res.end(JSON.stringify(body));
            } catch (error) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error in API middleware' }));
            }
          } else {
            next()
          }
        })
      }
    }
  ]
})
