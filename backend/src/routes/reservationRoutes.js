import express from "express";

import {
  createReservation,
  getReservations,
  getReservationAvailability,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";

import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();



/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

router.post("/", createReservation);

router.get("/", getReservations);

router.get("/availability", getReservationAvailability);

router.get("/:id", validateObjectId, getReservationById);

router.put("/:id", validateObjectId, updateReservation);

router.delete("/:id", validateObjectId, deleteReservation);

export default router;