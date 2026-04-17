require("dotenv").config();

const REQUIRED_CONFIG = ["APP_NAME", "PORT", "NODE_ENV", "LOG_LEVEL"];
const REQUIRED_SECRETS = ["DB_PASSWORD", "API_KEY", "JWT_SECRET"];
const VALID_ENVS = ["development", "staging", "production", "test"];
const VALID_LOG_LEVELS = ["debug", "info", "warn", "error"];

function validateConfig() {
  const errors = [];

  // Validar variables obligatorias presentes
  for (const key of [...REQUIRED_CONFIG, ...REQUIRED_SECRETS]) {
    if (!process.env[key]) {
      errors.push(`Variable requerida faltante: ${key}`);
    }
  }

  if (errors.length > 0) {
    console.error("ERROR DE CONFIGURACION:");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  // Validar PORT numérico
  const port = Number(process.env.PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error(`ERROR: PORT debe ser un número entre 1 y 65535 (valor: "${process.env.PORT}")`);
    process.exit(1);
  }

  // Validar NODE_ENV
  if (!VALID_ENVS.includes(process.env.NODE_ENV)) {
    console.error(`ERROR: NODE_ENV debe ser uno de: ${VALID_ENVS.join(", ")} (valor: "${process.env.NODE_ENV}")`);
    process.exit(1);
  }

  // Validar LOG_LEVEL
  if (!VALID_LOG_LEVELS.includes(process.env.LOG_LEVEL)) {
    console.error(`ERROR: LOG_LEVEL debe ser uno de: ${VALID_LOG_LEVELS.join(", ")} (valor: "${process.env.LOG_LEVEL}")`);
    process.exit(1);
  }

  // Validar FEATURE_X_ENABLED como booleano
  const featureVal = process.env.FEATURE_X_ENABLED;
  if (featureVal !== undefined && !["true", "false"].includes(featureVal)) {
    console.error(`ERROR: FEATURE_X_ENABLED debe ser "true" o "false" (valor: "${featureVal}")`);
    process.exit(1);
  }

  // Validar JWT_SECRET mínimo 32 caracteres
  if (process.env.JWT_SECRET.length < 32) {
    console.error("ERROR: JWT_SECRET debe tener al menos 32 caracteres");
    process.exit(1);
  }

  return buildConfig();
}

function buildConfig() {
  return {
    app: {
      name: process.env.APP_NAME,
      port: Number(process.env.PORT),
      env: process.env.NODE_ENV,
      logLevel: process.env.LOG_LEVEL,
      featureXEnabled: process.env.FEATURE_X_ENABLED === "true",
    },
    // Los secretos NO se devuelven completos; solo se confirma su presencia
    secrets: {
      dbPasswordSet: Boolean(process.env.DB_PASSWORD),
      apiKeySet: Boolean(process.env.API_KEY),
      jwtSecretSet: Boolean(process.env.JWT_SECRET),
    },
  };
}

// Permite ejecutar validación directa: node src/config.js
if (require.main === module) {
  const config = validateConfig();
  console.log("Configuracion valida:");
  console.log(JSON.stringify(config, null, 2));
}

module.exports = { validateConfig };
