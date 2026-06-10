const http = require('http');
const fs = require('fs');
const path = require('path');
const pool = require('./conexion');

const PORT = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

const servidor = http.createServer(async (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'pagina principal ingenia tech','parte central.html');
    res.writeHead(200, {'Content-Type':'text/html'});
    return fs.createReadStream(filePath).pipe(res);
  }

  if ((req.url.startsWith('/css/') || req.url.startsWith('/js/') || req.url.startsWith('/imagenes/')) && req.method === 'GET') {
    const filePath = path.join(__dirname, decodeURIComponent(req.url));
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      res.writeHead(200, {'Content-Type': mimeTypes[ext] || 'application/octet-stream'});
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  if (req.url === '/usuarios' && req.method === 'GET') {
    try {
      const [filas] = await pool.query('SELECT * FROM usuarios');
      res.writeHead(200, {'Content-Type':'application/json'});
      return res.end(JSON.stringify(filas));
    } catch (error) {
      res.writeHead(500, {'Content-Type':'application/json'});
      return res.end(JSON.stringify({ error: 'Error al obtener los datos' }));
    }
  }

  res.writeHead(404, {'Content-Type':'application/json'});
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

servidor.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
