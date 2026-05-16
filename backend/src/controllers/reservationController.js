import Reservation from "../models/Reservation.js";
import { validateReservation } from "../utils/reservationValidation.js";

import { sendReservationEmail } from "../services/emailService.js";

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createReservation = async (req, res) => {
  try {
    const validationError = validateReservation(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const reservation = await Reservation.create(req.body);
    let emailStatus = {
      sent: false,
      reason: "without_email",
    };

    if (reservation.email) {
      try {
        emailStatus = await sendReservationEmail(reservation);
      } catch (emailErr) {
        console.error("Error enviando email de reserva:", emailErr);
        emailStatus = {
          sent: false,
          reason: "send_error",
        };
      }
    }

    return res.status(201).json({
      success: true,
      data: reservation,
      email: emailStatus,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error creando reserva",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({
      fechaReserva: 1,
    });

    res.json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo reservas",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ONE
|--------------------------------------------------------------------------
*/

export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada",
      });
    }

    res.json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo reserva",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada",
      });
    }

    res.json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error actualizando reserva",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Reserva eliminada",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error eliminando reserva",
    });
  }
};
