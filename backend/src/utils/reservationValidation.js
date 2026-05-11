export const validateReservation = (data) => {
  const {
    nombre,
    telefono,
    email,
    hora,
    fechaReserva,
    personas,
    comentarios
  } = data;

  if (!nombre?.trim()) {
    return "El nombre es obligatorio";
  }

  if (!telefono?.trim()) {
    return "El teléfono es obligatorio";
  }

  if (!fechaReserva) {
    return "La fecha es obligatoria";
  }

  if (!personas) {
    return "Número de personas obligatorio";
  }

  return null;
};