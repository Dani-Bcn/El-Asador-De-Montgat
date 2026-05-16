export const sendReservationEmail = async (reservation) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY no configurada. Se omite el email de reserva.");
    return {
      sent: false,
      reason: "missing_api_key",
    };
  }

  const from = process.env.RESEND_FROM || "Reservas <onboarding@resend.dev>";

  const {
    nombre,
    email,
    telefono,
    fechaReserva,
    hora,
    personas,
    comentarios,
  } = reservation;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: "Reserva recibida - El Asador de Montgat",

      html: `
      <div style="font-family:sans-serif;">
        <h2>Reserva recibida ✅</h2>

        <p>Hola ${nombre},</p>

        <p>Hemos recibido tu reserva correctamente.</p>

        <ul>
          <li><strong>Fecha:</strong> ${new Date(fechaReserva).toLocaleDateString()}</li>
          <li><strong>Hora:</strong> ${hora}</li>
          <li><strong>Comensales:</strong> ${personas}</li>
          <li><strong>Teléfono:</strong> ${telefono}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>

        ${
          comentarios
            ? `<p><strong>Comentarios:</strong> ${comentarios}</p>`
            : ""
        }

        <p>Te confirmaremos pronto.</p>

        <br />

        <p>El Asador de Montgat</p>
      </div>
    `,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return {
      sent: false,
      reason: "resend_error",
      status: response.status,
      detail: errorBody,
    };
  }

  const data = await response.json();
  console.log("Email de reserva enviado:", data);

  return {
    sent: true,
    id: data.id,
  };
};