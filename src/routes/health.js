const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.get("/config", (req, res) => {
  const { app } = req.appConfig;
  res.json({
    app_name: app.name,
    environment: app.env,
    log_level: app.logLevel,
    feature_x_enabled: app.featureXEnabled,
    // El puerto se omite en la respuesta para no exponer infraestructura
  });
});

module.exports = router;
