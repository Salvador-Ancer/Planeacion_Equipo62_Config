# Equipo 62 — API con Gestión de Configuración y Secretos

API REST simple construida con Node.js y Express que demuestra gestión profesional de configuración y secretos mediante variables de entorno.

---

## Propósito

Esta solución implementa las prácticas recomendadas para separar configuración del código fuente:

- La configuración se inyecta como **variables de entorno**, no está fija en el código.
- Los **secretos** nunca se versiona en Git.
- La app **falla al arrancar** si falta alguna variable obligatoria.
- Un **pipeline de CI** verifica la integridad en cada push.

---

## Estructura del proyecto

```
.
├── src/
│   ├── index.js          # Punto de entrada; arranca el servidor
│   ├── config.js         # Carga y valida todas las variables de entorno
│   └── routes/
│       └── health.js     # Endpoints /api/health y /api/config
├── .env.example          # Plantilla de variables requeridas (sin valores reales)
├── .gitignore            # Excluye .env y node_modules
├── package.json
├── README.md
├── CONTRIBUTING.md
└── .github/
    └── workflows/
        └── ci.yml        # Pipeline de integración continua
```

---

## Variables de entorno

### Configuración general (no sensible)

| Variable           | Tipo    | Valores permitidos                       | Descripción                        |
|--------------------|---------|------------------------------------------|------------------------------------|
| `APP_NAME`         | string  | cualquiera                               | Nombre de la aplicación            |
| `PORT`             | number  | 1–65535                                  | Puerto donde corre el servidor     |
| `NODE_ENV`         | string  | `development`, `staging`, `production`, `test` | Entorno activo               |
| `LOG_LEVEL`        | string  | `debug`, `info`, `warn`, `error`         | Nivel de detalle de logs           |
| `FEATURE_X_ENABLED`| boolean | `true` / `false`                         | Activa o desactiva la Feature X    |

### Secretos (sensibles — nunca en Git)

| Variable      | Descripción                                              |
|---------------|----------------------------------------------------------|
| `DB_PASSWORD` | Contraseña de la base de datos                           |
| `API_KEY`     | Llave de acceso a la API externa                         |
| `JWT_SECRET`  | Clave para firmar tokens JWT (mínimo 32 caracteres)      |

---

## Diferencia entre configuración y secretos

| Característica           | Configuración           | Secretos                  |
|--------------------------|-------------------------|---------------------------|
| ¿Se puede versionar?     | Sí (en `.env.example`)  | No                        |
| ¿Cambia por entorno?     | Sí                      | Sí                        |
| ¿Impacto si se expone?   | Bajo                    | Alto                      |
| Ejemplos                 | PORT, NODE_ENV, APP_NAME| DB_PASSWORD, JWT_SECRET   |

---

## Cómo configurar el entorno local

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd Planeacion_Equipo62_Config
   ```

2. Copia la plantilla de variables:
   ```bash
   cp .env.example .env
   ```

3. Edita `.env` con tus valores reales (el archivo nunca se sube a Git):
   ```bash
   # Ejemplo de .env local
   APP_NAME=Equipo62API
   PORT=3000
   NODE_ENV=development
   LOG_LEVEL=debug
   FEATURE_X_ENABLED=false
   DB_PASSWORD=mi_password_seguro
   API_KEY=mi_api_key_real
   JWT_SECRET=mi_secreto_jwt_de_al_menos_32_caracteres_aqui
   ```

4. Instala dependencias:
   ```bash
   npm install
   ```

---

## Cómo ejecutar la aplicación

```bash
npm start
```

Salida esperada al arrancar correctamente:

```
[Equipo62API] Servidor corriendo en puerto 3000
Entorno: development | Log level: debug
Feature X habilitada: false
```

---

## Cómo validar que funciona

```bash
# Verificar que el servidor responde
curl http://localhost:3000/api/health

# Ver la configuración no sensible activa
curl http://localhost:3000/api/config
```

También puedes validar la configuración sin levantar el servidor:

```bash
npm run validate-config
```

---

## Qué NO debe subirse al repositorio

- `.env` — contiene secretos reales
- `node_modules/` — se regenera con `npm install`
- Cualquier archivo con contraseñas, tokens o llaves privadas

El `.gitignore` ya está configurado para excluirlos automáticamente.

---

## Flujo de cambio de configuración

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para el proceso completo de propuesta, revisión y merge de cambios de configuración.

---

## Pipeline de CI

El workflow `.github/workflows/ci.yml` se ejecuta en cada push y pull request. Verifica:

1. Que `.env` **no** esté en el repositorio.
2. Que `.env.example` **sí** esté presente.
3. Sintaxis válida de los archivos JavaScript.
4. Que la app arranca correctamente con variables simuladas.
5. Escaneo de secretos con **gitleaks**.
