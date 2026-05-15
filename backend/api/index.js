/**
 * Punto de entrada serverless en Vercel (vercel.json reenvía /api/* aquí).
 * La app Express está en src/api/index.js.
 */
import app from "../src/api/index.js";

export default app;
