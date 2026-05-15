/**
 * Entrada serverless en Vercel cuando el proyecto raíz es el que se despliega
 * (Vite + API en el mismo dominio). vercel.json reenvía /api/* aquí.
 */
import app from "../backend/src/api/index.js";

export default app;
