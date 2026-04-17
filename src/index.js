const { validateConfig } = require("./config");

// La validación ocurre antes de arrancar el servidor
const config = validateConfig();

const express = require("express");
const app = express();

app.use(express.json());

// Inyectar config en cada request para que los routes puedan leerla
app.use((req, _res, next) => {
  req.appConfig = config;
  next();
});

app.use("/api", require("./routes/health"));

app.listen(config.app.port, () => {
  console.log(`[${config.app.name}] Servidor corriendo en puerto ${config.app.port}`);
  console.log(`Entorno: ${config.app.env} | Log level: ${config.app.logLevel}`);
  console.log(`Feature X habilitada: ${config.app.featureXEnabled}`);
});
