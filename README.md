# Presencia Digital IA CRM

App local de CRM comercial para prospectos, pipeline, seguimientos, generadores de mensajes, ideas de contenido y Generador Visual ON.

## Archivos principales

- `index.html`: interfaz completa del CRM, estilos y logica del navegador.
- `api/generate-image.js`: endpoint seguro para generar imagenes con OpenAI o Gemini sin exponer API keys en el frontend.

## Correr localmente

Puedes abrir `index.html` directamente en el navegador para usar el CRM, guardar prospectos, exportar/importar datos y trabajar con localStorage.

Para generar imagenes, la app necesita un servidor que exponga `/api/generate-image`. En `file://` el navegador no puede llamar a ese endpoint, asi que usa Vercel o un entorno local compatible con funciones serverless.

## Configurar en Vercel

1. Sube el proyecto a Vercel.
2. En Settings > Environment Variables agrega:
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
3. Opcionalmente puedes definir:
   - `OPENAI_IMAGE_MODEL` con default `gpt-image-2`
   - `GEMINI_IMAGE_MODEL` con default `gemini-2.5-flash-image`
4. Haz redeploy.
5. Abre la app desplegada y entra a `Configuracion > IA / Generacion visual` para revisar el estado de conexion.

## Probar OpenAI y Gemini

1. Entra a `Generador Visual ON`.
2. Selecciona un prospecto.
3. Elige proveedor: OpenAI / GPT Image o Gemini / Nano Banana.
4. Completa el objetivo visual.
5. Revisa el prompt generado.
6. Presiona `Generar imagen`.
7. Descarga la imagen o guardala en el prospecto.

Las imagenes guardadas se incluyen en el respaldo JSON como base64, por lo que el archivo puede crecer. Exporta respaldos con frecuencia.

## Crear APK con Capacitor

La app ya incluye configuracion de Capacitor:

- `package.json`
- `capacitor.config.json`
- `scripts/prepare-capacitor-web.js`

Pasos:

1. Instala dependencias:

```bash
npm install
```

2. Genera la carpeta Android:

```bash
npm run cap:add:android
```

3. Sincroniza cambios del CRM con Android:

```bash
npm run cap:sync
```

4. Abre Android Studio:

```bash
npm run cap:open
```

5. Desde Android Studio genera el APK:

```txt
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

Tambien puedes intentar generar APK debug por terminal:

```bash
npm run android:debug
```

El APK debug queda normalmente en:

```txt
android/app/build/outputs/apk/debug/app-debug.apk
```

## Generador Visual ON dentro del APK

El CRM funciona como app instalada, pero la generacion de imagenes necesita un backend externo porque las API keys no deben vivir dentro del APK.

1. Publica el proyecto en Vercel.
2. Configura `OPENAI_API_KEY` y `GEMINI_API_KEY`.
3. Copia la URL de Vercel, por ejemplo:

```txt
https://tu-app.vercel.app
```

4. En la app entra a:

```txt
Configuracion > IA / Generacion visual > URL del backend visual
```

5. Pega la URL de Vercel y guarda.

Asi el APK llamara a:

```txt
https://tu-app.vercel.app/api/generate-image
```

sin guardar claves en el telefono.
