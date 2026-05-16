import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
      
    
    hora: {
      type: String,
      required: true,
      trim: true,
    },

    fecha: {
      type: String,
      trim: true,
    },

    telefono: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      default: "",
    },

    fechaReserva: {
      type: Date,
      required: true,
    },

    personas: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    comentarios: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pendiente", "confirmada", "cancelada"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  },
);

const Reservation = mongoose.model(
  "Reservation",
  reservationSchema,
);

export default Reservation;