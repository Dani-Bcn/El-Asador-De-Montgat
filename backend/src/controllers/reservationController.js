import Reservation from "../models/Reservation.js";
import { validateReservation } from "../utils/reservationValidation.js";

import { sendReservationEmail } from "../services/emailService.js";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const padDatePart = (value) => String(value).padStart(2, "0");

const getDateKey = (date) =>
  [
    date.getFullYear(),
    padDatePart(date.getMonth() + 1),
    padDatePart(date.getDate()),
  ].join("-");

const getTimeKey = (date) =>
  [
    padDatePart(date.getHours()),
    padDatePart(date.getMinutes()),
  ].join(":");

const getStartOfDay = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

const getEndOfDay = (date) =>
  new Date(getStartOfDay(date).getTime() + DAY_IN_MS);

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

    const requestedDate = new Date(req.body.fechaReserva);
    const reservationsForDay = await Reservation.find({
      fechaReserva: {
        $gte: getStartOfDay(requestedDate),
        $lt: getEndOfDay(requestedDate),
      },
      status: {
        $ne: "cancelada",
      },
    }).select("fechaReserva");

    const isReservedTime = reservationsForDay.some(
      (reservation) =>
        getTimeKey(reservation.fechaReserva) === getTimeKey(requestedDate),
    );

    if (isReservedTime) {
      return res.status(409).json({
        success: false,
        message: "Esta hora ya está reservada. Elige otra hora.",
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
          detail: emailErr.message,
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
| PUBLIC AVAILABILITY
|--------------------------------------------------------------------------
*/

export const getReservationAvailability = async (req, res) => {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 14, 1), 60);
    const startDate = getStartOfDay(new Date());
    const endDate = new Date(startDate.getTime() + days * DAY_IN_MS);

    const reservations = await Reservation.find({
      fechaReserva: {
        $gte: startDate,
        $lt: endDate,
      },
      status: {
        $ne: "cancelada",
      },
    }).select("fechaReserva");

    const reservedHoursByDate = reservations.reduce((dates, reservation) => {
      const dateKey = getDateKey(reservation.fechaReserva);
      const reservedHours = dates.get(dateKey) || new Set();
      reservedHours.add(getTimeKey(reservation.fechaReserva));
      dates.set(dateKey, reservedHours);
      return dates;
    }, new Map());

    const availability = Array.from({ length: days }, (_, index) => {
      const date = new Date(startDate.getTime() + index * DAY_IN_MS);
      const dateKey = getDateKey(date);
      const reservedHours = [...(reservedHoursByDate.get(dateKey) || [])].sort();

      return {
        fecha: dateKey,
        horasReservadas: reservedHours,
        reservas: reservedHours.length,
      };
    });

    res.json({
      success: true,
      count: availability.length,
      data: availability,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error obteniendo disponibilidad",
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
