const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const librosRouter = require('./app/routers/tareas.router.js'); // Única ruta que queda
const db = require('./app/config/db.config.js');

// Configuración de CORS para permitir solicitudes desde localhost y el dominio en producción
const allowedOrigins = [
  'https://crud-5pnb.onrender.com',
  'https://my-frontend-1ucr.onrender.com'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/', librosRouter); // Ruta para libros

// Ruta raíz de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Configuración del servidor
const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App escuchando en http://%s:%s", host, port);
});
