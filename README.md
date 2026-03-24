# Planeacion_Equipo62_Config
# Configuración de Entornos

## Formato
Los archivos de configuración están escritos en **JSON** y se ubican dentro de la carpeta `config/`.

Existe un archivo por entorno:
- `development.json` — entorno local de desarrollo
- `staging.json` — entorno de pruebas previo a producción
- `production.json` — entorno productivo

---

## Descripción de parámetros

| Parámetro       | Tipo    | Descripción                                              |
|----------------|---------|----------------------------------------------------------|
| `APP_NAME`     | string  | Nombre de la aplicación                                  |
| `PORT`         | number  | Puerto en que corre el servidor                          |
| `ENVIRONMENT`  | string  | Nombre del entorno activo                                |
| `DB_HOST`      | string  | Host de la base de datos                                 |
| `DB_PORT`      | number  | Puerto de conexión a la base de datos                    |
| `DEBUG`        | boolean | Activa logs detallados; debe ser `false` en producción   |
| `FEATURE_FLAGS`| object  | Mapa de funcionalidades habilitadas/deshabilitadas       |

---

## Convenciones de nomenclatura

- Las claves usan `UPPER_SNAKE_CASE` para parámetros principales.
- Las claves dentro de `FEATURE_FLAGS` usan `snake_case` en minúsculas.
- Los nombres de archivo siguen el patrón `<entorno>.json`.

---

## Ejemplo de uso
```json
{
  "APP_NAME": "mi-app",
  "PORT": 3000,
  "ENVIRONMENT": "development",
  "DB_HOST": "localhost",
  "DB_PORT": 5432,
  "DEBUG": true,
  "FEATURE_FLAGS": {
    "nueva_ui": true,
    "pagos_beta": false
  }
}
```

Para cargar la configuración según el entorno activo, se puede leer la variable de entorno `NODE_ENV` (o equivalente) y seleccionar el archivo correspondiente.
