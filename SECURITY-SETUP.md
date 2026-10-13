# Activación de seguridad

Estos cambios necesitan configuración antes del despliegue. Sin los bindings o secretos, el registro devuelve 503; nunca omite la verificación.

1. Crear un widget Turnstile con todos los dominios publicados autorizados. Definir TURNSTILE_SITE_KEY como variable pública y TURNSTILE_SECRET_KEY como secreto del Worker.
2. Conservar FRY_BROS_SECRET como secreto y GOOGLE_SHEETS_WEBHOOK_URL apuntando al despliegue HTTPS /macros/s/.../exec de script.google.com. No incluir valores en GitHub.
3. Desplegar con Wrangler usando wrangler.jsonc, incluido QUOTE_RATE_LIMITER. Reservar el namespace 11001 o elegir uno propio no usado por otro proyecto.
4. Verificar que Apps Script autentique el secreto ANTES de cualquier operación; use Script Properties; rechace objetos inválidos; neutralice fórmulas; no registre cuerpos, secretos o direcciones; y no publique datos mediante doGet. Auditar los despliegues anteriores. No reemplazar su código sin leer el proyecto real.
5. Probar un envío autorizado en entorno de pruebas, errores de Turnstile y límites. Las pruebas locales usan servicios simulados y no validan el despliegue real.

El limitador de Cloudflare es por ubicación y no garantiza un contador global exacto. Turnstile ayuda contra automatización; no reemplaza la validación.

Los costos de ingredientes y fórmula siguen visibles por compatibilidad con la calculadora local. Mover todo el cálculo al servidor requiere cambiar ese flujo. El enlace a WhatsApp sigue incluyendo los datos necesarios para la solicitud: es una transferencia prevista a WhatsApp.

Rollback: revertir el commit en GitHub y desplegar la versión anterior; esto reintroduce sus riesgos. No desactivar protecciones silenciosamente.
