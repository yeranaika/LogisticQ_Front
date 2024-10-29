import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import cors from 'cors'; // Importar cors

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // Habilitar CORS
  server.use(cors());

  //configuracioenes de CORS
  const corsOptions = {
    origin: 'http://localhost:4200', // Solo permite solicitudes de este origen (tu frontend Angular)
    optionsSuccessStatus: 200,
  };
  
  server.use(cors(corsOptions));
  


  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Ejemplo de endpoints REST de Express
  server.get('/api/**', (req, res) => { });
  
  // Servir archivos estáticos desde /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // Todas las rutas regulares usan el motor Angular
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Iniciar el servidor de Node
  const server = app();
  server.listen(port, () => {
    console.log(`Servidor Node Express escuchando en http://localhost:${port}`);
  });
}

run();
