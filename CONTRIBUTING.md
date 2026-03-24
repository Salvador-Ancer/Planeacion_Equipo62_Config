# Contributing — Configuración de Entornos

## Proceso para proponer cambios

1. Crea una rama a partir de `main` usando el formato:
```
   config/<descripcion-corta>
```
   Ejemplos: `config/habilitar-notificaciones`, `config/ajuste-puerto-staging`

2. Realiza los cambios necesarios en el o los archivos de configuración correspondientes.

3. Abre un **Pull Request** con:
   - Título claro que indique qué cambia y en qué entorno
   - Descripción del motivo del cambio
   - Mención de los entornos afectados

---

## Proceso de revisión

- Todo PR debe tener **al menos un revisor distinto al autor**.
- El revisor debe validar:
  - Que el cambio es intencional y está justificado
  - Que no introduce valores incorrectos o inseguros (ej. `DEBUG: true` en producción)
  - Que los `FEATURE_FLAGS` nuevos o modificados tienen sentido en el contexto del entorno

---

## Validaciones mínimas antes de aprobar

- [ ] El archivo es **JSON válido** (sin errores de sintaxis)
- [ ] Las claves siguen las convenciones de nomenclatura (`UPPER_SNAKE_CASE` / `snake_case`)
- [ ] La estructura es consistente con los demás archivos de entorno
- [ ] No hay parámetros faltantes respecto al esquema definido en el README

---

## Criterios de aceptación

- El cambio es **claro y tiene un propósito definido**
- Los valores son **coherentes entre entornos** (ej. si se agrega un feature flag, debe existir en todos los archivos aunque esté desactivado)
- Si se agrega un parámetro nuevo, está **documentado en el README** con su tipo y descripción
- No se introducen credenciales, tokens ni datos sensibles directamente en los archivos