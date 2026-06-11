const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const fs = require("fs");
const PORT = 3000;

const app = express();
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // permite recibir JSON desde el frontend
 
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "ingresar a ingenia tech.html"));
});
 
// ── CONEXIÓN A MYSQL  ──────────────────────────────────────────
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Rubi#Data_01",
    database: "ingenia_tech"
});

// CORREGIDO: eliminado pool.connect() - el pool se conecta automáticamente

const servidor = http.createServer(async (req, res) => {

    // PAGINA LOGIN
    if (req.url === '/' || req.url === '/login') {

        const filePath = path.join(
            __dirname,
            'logins.html',
            'ingresar a ingenia tech login.html'
        );

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        return fs.createReadStream(filePath).pipe(res);
    }

    // CARGAR CSS DEL LOGIN
    if (req.url === '/login.css') {

        const filePath = path.join(
            __dirname,
            'logins.html',
            'login.css'
        );

        res.writeHead(200, {
            'Content-Type': 'text/css'
        });

        return fs.createReadStream(filePath).pipe(res);
    }

    // CARGAR JS DEL LOGIN
    if (req.url === '/script.js') {

        const filePath = path.join(
            __dirname,
            'logins.html',
            'script.js'
        );

        res.writeHead(200, {
            'Content-Type': 'application/javascript'
        });

        return fs.createReadStream(filePath).pipe(res);
    }

    // REGISTRAR USUARIO
    if (req.url === '/registrar' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {

            try {

                const datos = JSON.parse(body);

                await pool.query(
                    'INSERT INTO usuarios(nombre,email) VALUES (?,?)',
                    [datos.nombre, datos.email]
                );

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    mensaje: 'Usuario registrado correctamente'
                }));

            } catch (error) {

                console.error(error);

                res.writeHead(500, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    mensaje: 'Error al registrar usuario'
                }));
            }
        });

        return;
    }

    // LISTAR USUARIOS
    if (req.url === '/usuarios' && req.method === 'GET') {

        try {

            const [usuarios] = await pool.query(
                'SELECT * FROM usuarios'
            );

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify(usuarios));

        } catch (error) {

            console.error(error);

            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify({
                error: 'Error al obtener usuarios'
            }));
        }
    }

    // 404
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });

    res.end('Ruta no encontrada');

});

servidor.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});