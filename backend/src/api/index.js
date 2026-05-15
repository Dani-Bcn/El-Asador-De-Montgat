import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "../config/db.js";

import reservationRoutes from "../routes/reservationRoutes.js";

await connectDB();

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/reservations", reservationRoutes);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

if (process.env.VERCEL !== "1") {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
  });
}

export default app;
