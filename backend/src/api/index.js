import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "../config/db.js";

import reservationRoutes from "../routes/reservationRoutes.js";

const app = express();

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(cors(corsOptions));

app.use(express.json());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

const withDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Error conectando MongoDB:", error);
    res.status(500).json({
      success: false,
      message: "Error conectando con la base de datos",
    });
  }
};

// Vercel conserva /api en los rewrites; el segundo mount permite probar local sin prefijo.
app.use("/api/reservations", withDB);
app.use("/api/reservations", reservationRoutes);
app.use("/reservations", withDB);
app.use("/reservations", reservationRoutes);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get(["/", "/api", "/api/health", "/health"], (req, res) => {
  res.json({
    success: true,
    message: "API funcionando",
    env: {
      db: Boolean(process.env.DB || process.env.MONGODB_URI),
      resend: Boolean(process.env.RESEND_API_KEY),
      vercel: process.env.VERCEL === "1",
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint no encontrado",
    path: req.originalUrl,
  });
});

app.use((error, req, res, _next) => {
  console.error("Error no controlado:", error);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
});

if (process.env.VERCEL !== "1") {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
  });
}

export default app;
