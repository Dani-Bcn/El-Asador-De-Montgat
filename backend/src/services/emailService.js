import { Resend } from "resend";


export const sendReservationEmail = async (reservation) => {

          
const resend = new Resend(process.env.RESEND_API_KEY);
  const {
    nombre,
    email,
    telefono,
    fechaReserva,
    hora,
    personas,
    comentarios,
  } = reservation;

  const response = await resend.emails.send({
    from: "Reservas <onboarding@resend.dev>",
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
  });

  console.log(response);
};