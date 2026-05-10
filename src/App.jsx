// App.jsx
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import Navbar from "./Navbar";

// ==================== CONFIGURACIÓN ====================
const WHATSAPP_NUMBER = "651110553";
const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY_AQUI";
const EMAILJS_SERVICE_ID = "TU_SERVICE_ID_AQUI";
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID_AQUI";

if (EMAILJS_PUBLIC_KEY !== "TU_PUBLIC_KEY_AQUI") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ==================== DATOS ====================
const menuData = {
  entrantes: [
    {
      title: "Pan con tomate y jamón ibérico",
      desc: "Pan de masa madre, tomate ramallet, aceite arbequina y jamón de bellota D.O. Guijuelo",
      price: "14,50€",
      tags: ["Gluten", "Ibérico"],
    },
    {
      title: "Calçots asados con salsa romesco",
      desc: "Calçots de Valls asados al fuego, romesco casero y pan de payés",
      price: "12,00€",
      tags: ["Temporada"],
    },
    {
      title: "Ensalada de tomate con burrata",
      desc: "Tomates corazón de buey, burrata de Apulia, albahaca y Pedro Ximénez",
      price: "15,00€",
      tags: ["Veggie"],
    },
    {
      title: "Croquetas de rabo de toro",
      desc: "Rabo de toro estofado 12h, bechamel cremosa, empanado crujiente",
      price: "13,00€",
      tags: ["Gluten", "Lácteos"],
    },
    {
      title: "Gambas de Palamós a la plancha",
      desc: "Gambas frescas de lonja, aceite de ajo y perejil, sal de Maldon",
      price: "22,00€",
      tags: ["Crustáceos"],
    },
    {
      title: "Escalivada con anchoas",
      desc: "Pimiento, berenjena y cebolla asados, anchoas del Cantábrico premium",
      price: "16,50€",
      tags: ["Pescado"],
    },
  ],
  carnes: [
    {
      title: "Chuletón de Galicia madurado",
      desc: "1kg de rubia gallega, maduración 45 días, sal de Maldon",
      price: "68,00€",
      tags: ["Estrella"],
      isStar: true,
    },
    {
      title: "Costillar de cordero lechal",
      desc: "Cordero de Castilla y León, asado a la brasa de encina",
      price: "32,00€",
      tags: [],
    },
    {
      title: "Entrecot de buey 60 días",
      desc: "500g, maduración en seco, chimichurri casero y patatas",
      price: "45,00€",
      tags: ["Estrella"],
      isStar: true,
    },
    {
      title: "Secret ibérico a la brasa",
      desc: "Ibérico de bellota, punto de brasa, pimientos de Padrón",
      price: "24,00€",
      tags: [],
    },
    {
      title: "Rabo de toro estofado",
      desc: "Rabo de lidia, estofado 14h en Ribera del Duero, puré trufado",
      price: "26,00€",
      tags: [],
    },
    {
      title: "Cochinillo asado",
      desc: "Cochinillo de Segovia, horno de leña (mínimo 2 personas)",
      price: "38,00€",
      tags: ["Min. 2 personas"],
    },
  ],
  pescados: [
    {
      title: "Bacalao a la llauna",
      desc: "Bacalao confitado, pimientos asados, aceitunas y salsa vizcaína",
      price: "28,00€",
      tags: ["Estrella"],
      isStar: true,
    },
    {
      title: "Dorada a la sal",
      desc: "Dorada salvaje del Mediterráneo, costra de sal marina, verduras",
      price: "26,00€",
      tags: [],
    },
    {
      title: "Rape a la brasa con alioli",
      desc: "Cola de rape salvaje, brasa de encina, alioli y patatas",
      price: "30,00€",
      tags: [],
    },
    {
      title: "Mariscada del Mediterráneo",
      desc: "Gambas, cigalas, mejillones, almejas y carabineros (2 personas)",
      price: "72,00€",
      tags: ["Min. 2 personas"],
    },
  ],
  postres: [
    {
      title: "Crema catalana",
      desc: "Receta tradicional, caramelizada al momento, canela y cítricos",
      price: "9,00€",
      tags: [],
    },
    {
      title: "Tarta de queso con confitura",
      desc: "Queso Idiazábal, base crujiente, frutos rojos del Maresme",
      price: "10,50€",
      tags: [],
    },
    {
      title: "Mel i mató",
      desc: "Mató artesanal, miel de romero de Montserrat, nueces tostadas",
      price: "8,50€",
      tags: [],
    },
    {
      title: "Profiteroles de chocolate",
      desc: "Pasta choux, crema pastelera, salsa Valrhona 70%",
      price: "11,00€",
      tags: [],
    },
  ],
};

// ==================== COMPONENTES ====================

const Toast = ({ title, msg, show, hideToast }) => (
  <div
    className={`toast fixed bottom-6 right-6 z-100 bg-[#141414] border border-orange-600/30 rounded-xl p-5 max-w-sm shadow-2xl backdrop-blur-xl ${show ? "show" : ""}`}
    role="alert"
  >
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center shrink-0">
        <span
          className="iconify text-orange-500"
          data-icon="lucide:check"
          data-width="16"
        ></span>
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-neutral-400 mt-0.5">{msg}</div>
      </div>
      <button
        onClick={hideToast}
        className="text-neutral-600 hover:text-white transition-colors ml-2"
      >
        <span className="iconify" data-icon="lucide:x" data-width="14"></span>
      </button>
    </div>
  </div>
);

const Hero = () => (
  <section
    id="inicio"
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0">
      <img
        src="https://picsum.photos/seed/asador-fire-grill/1920/1080.jpg"
        alt="Asador"
        className="w-full h-full object-cover opacity-50"
      />
      <div className="hero-gradient absolute inset-0"></div>
    </div>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 fade-in-up">
        <span
          className="iconify text-orange-500"
          data-icon="lucide:flame"
          data-width="14"
        ></span>
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          Desde 1987 · Fuego y Tradición
        </span>
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none tracking-tight fade-in-up fade-in-up-delay-1">
        <span className="text-gradient">El Asador</span>
        <br />
        <span className="fire-gradient">de Montgat</span>
      </h1>
      <p className="mt-6 md:mt-8 text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto fade-in-up fade-in-up-delay-2">
        Cocina al fuego lento con la mejor materia prima del Mediterráneo.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up fade-in-up-delay-3">
        <a
          href="#menu"
          className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-8 py-3.5 rounded-lg hover:bg-neutral-200 transition-colors"
        >
          <span
            className="iconify"
            data-icon="lucide:book-open"
            data-width="16"
          ></span>
          Ver la Carta
        </a>
        <a
          href="#reservas"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-colors"
        >
          <span
            className="iconify"
            data-icon="lucide:calendar"
            data-width="16"
          ></span>
          Reservar Mesa
        </a>
      </div>
    </div>
  </section>
);

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState("entrantes");
  const tabs = ["entrantes", "carnes", "pescados", "postres"];
  const icons = {
    entrantes: "lucide:salad",
    carnes: "lucide:beef",
    pescados: "lucide:fish",
    postres: "lucide:cake-slice",
  };

  return (
    <section id="menu" className="relative py-24 md:py-32">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
            Fuego, humo <span className="text-orange-500">y pasión</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? "bg-orange-600 text-white" : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"}`}
            >
              <span
                className="iconify inline-block mr-1"
                data-icon={icons[tab]}
                data-width="14"
              ></span>{" "}
              {tab}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {menuData[activeTab].map((item, idx) => (
            <article
              key={idx}
              className="menu-card group p-6 rounded-xl border border-white/5 bg-white/2 hover:border-orange-600/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="menu-title text-lg font-semibold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">{item.desc}</p>
                </div>
                <span className="text-orange-500 font-serif font-bold text-lg whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${item.isStar && tag === "Estrella" ? "text-orange-600 bg-orange-600/10" : "text-neutral-600 bg-white/5"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reservations = ({ triggerToast }) => {
  const [method, setMethod] = useState("whatsapp");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    fecha: "",
    hora: "",
    personas: "",
    comentarios: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const getToday = () => new Date().toISOString().split("T")[0];

  const buildWhatsAppUrl = (isContact = false) => {
    const baseMsg = isContact
      ? `✅ *MENSAJE WEB - El Asador de Montgat*\n\n 🙋 *Nombre:* ${form.nombre}\n 📧 *Email:* ${form.email}\n 📄 *Mensaje:* ${form.comentarios}\n\n_Enviado desde la web_`
      : `✅ *NUEVA RESERVA - El Asador de Montgat*\n\n🙋 *Nombre:* ${form.nombre}\n🌭 *Teléfono:* ${form.telefono}\n 📅 *Fecha:* ${form.fecha}\n 🕒 *Hora:* ${form.hora}\n 👪 *Comensales:* ${form.personas}\n${form.comentarios ? `💬 *Comentarios:* ${form.comentarios}\n` : ""}\n_Enviado desde la web_`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMsg)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (method === "whatsapp") {
      window.open(buildWhatsAppUrl(), "_blank");
      triggerToast(
        "¡Redirigiendo a WhatsApp!",
        "Completa el envío del mensaje en la app.",
      );
      setForm({
        nombre: "",
        telefono: "",
        email: "",
        fecha: "",
        hora: "",
        personas: "",
        comentarios: "",
      });
    } else {
      if (EMAILJS_PUBLIC_KEY === "TU_PUBLIC_KEY_AQUI") {
        window.open(buildWhatsAppUrl(), "_blank");
        triggerToast(
          "Email no configurado",
          "Se redirigió a WhatsApp. Configura EmailJS en el código.",
        );
        return;
      }
      setLoading(true);
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: form.nombre,
          from_email: form.email,
          telefono: form.telefono,
          fecha: form.fecha,
          hora: form.hora,
          personas: form.personas,
          comentarios: form.comentarios || "Sin comentarios",
        });
        triggerToast(
          "¡Reserva enviada por email!",
          "Te confirmaremos en las próximas horas.",
        );
        setForm({
          nombre: "",
          telefono: "",
          email: "",
          fecha: "",
          hora: "",
          personas: "",
          comentarios: "",
        });
      } catch (error) {
        console.error(error);
        triggerToast("Error al enviar", "Inténtalo de nuevo o usa WhatsApp.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section id="reservas" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                Reservas
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6">
              Tu mesa te <span className="text-orange-500">espera</span>
            </h2>
            <p className="text-neutral-400 font-light leading-relaxed mb-8">
              Reserva con antelación para garantizar tu lugar junto al fuego.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/2">
                <div className="w-10 h-10 rounded-lg bg-orange-600/10 flex items-center justify-center shrink-0">
                  <span
                    className="iconify text-orange-500"
                    data-icon="lucide:clock"
                    data-width="18"
                  ></span>
                </div>
                <div>
                  <div className="text-sm font-medium">Horario</div>
                  <div className="text-sm text-neutral-500 mt-0.5">
                    Mar–Vie: 13:00–16:00 / 20:30–23:00
                  </div>
                  <div className="text-sm text-neutral-500">
                    Sáb–Dom: 13:00–16:30 / 20:30–23:30
                  </div>
                  <div className="text-sm text-neutral-600 mt-0.5">
                    Lunes cerrado
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/2">
                <div className="w-10 h-10 rounded-lg bg-orange-600/10 flex items-center justify-center shrink-0">
                  <span
                    className="iconify text-orange-500"
                    data-icon="lucide:phone"
                    data-width="18"
                  ></span>
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Reservas por teléfono
                  </div>
                  <a
                    href="tel:651110553"
                    className="text-sm text-orange-500 hover:text-orange-400 mt-0.5 inline-block"
                  >
                    651110553
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-[#111111]">
            <h3 className="text-xl font-semibold mb-2">Reservar online</h3>
            <p className="text-sm text-neutral-500 mb-6">
              Elige cómo quieres recibir tu reserva:
            </p>

            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setMethod("whatsapp")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium border-2 transition-all ${method === "whatsapp" ? "border-[#25D366] bg-[#25D366]/10 text-[#25D366]" : "border-white/10 text-neutral-500 hover:border-white/20"}`}
              >
                <span
                  className="iconify"
                  data-icon="mdi:whatsapp"
                  data-width="20"
                ></span>
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium border-2 transition-all ${method === "email" ? "border-orange-600 bg-orange-600/10 text-orange-500" : "border-white/10 text-neutral-500 hover:border-white/20"}`}
              >
                <span
                  className="iconify"
                  data-icon="lucide:mail"
                  data-width="18"
                ></span>
                Email
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-600/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    required
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+34 ..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-600/50 transition-colors"
                  />
                </div>
              </div>
              {method === "email" && (
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-600/50 transition-colors"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    id="fecha"
                    required
                    value={form.fecha}
                    onChange={handleChange}
                    min={getToday()}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-600/50 transition-colors scheme:dark"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                    Hora *
                  </label>
                  <select
                    id="hora"
                    required
                    value={form.hora}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm  focus:outline-none focus:border-orange-600/50 transition-colors scheme:dark"
                  >
                    <option className="text-slate-800" value="">
                      Seleccionar
                    </option>
                    <option className="text-slate-800" value="13:00">
                      13:00
                    </option>
                    <option className="text-slate-800" value="13:00">
                      13:00
                    </option>
                    <option className="text-slate-800" value="13:30">
                      13:30
                    </option>
                    <option className="text-slate-800" value="14:00">
                      14:00
                    </option>
                    <option className="text-slate-800" value="14:30">
                      14:30
                    </option>
                    <option className="text-slate-800" value="15:00">
                      15:00
                    </option>
                    <option className="text-slate-800" value="20:30">
                      20:30
                    </option>
                    <option className="text-slate-800" value="21:00">
                      21:00
                    </option>
                    <option className="text-slate-800" value="21:30">
                      21:30
                    </option>
                    <option className="text-slate-800" value="22:00">
                      22:00
                    </option>
                    <option className="text-slate-800" value="22:30">
                      22:30
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                  Comensales *
                </label>
                <select
                  id="personas"
                  required
                  value={form.personas}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-600/50 transition-colors scheme:dark"
                >
                  <option className="text-slate-800" value="">
                    Seleccionar
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option className="text-slate-800" key={n} value={n}>
                      {n} persona{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                  Comentarios{" "}
                  <span className="text-neutral-700">(opcional)</span>
                </label>
                <textarea
                  id="comentarios"
                  rows="3"
                  value={form.comentarios}
                  onChange={handleChange}
                  placeholder="Alergias, ocasión especial..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-600/50 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full font-medium py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${method === "whatsapp" ? "bg-[#25D366] hover:bg-[#128C7E] text-white" : "bg-orange-600 hover:bg-orange-500 text-white"} disabled:opacity-50`}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div> Enviando...
                  </>
                ) : method === "whatsapp" ? (
                  <>
                    <span
                      className="iconify"
                      data-icon="mdi:whatsapp"
                      data-width="22"
                    ></span>
                    Enviar por WhatsApp
                  </>
                ) : (
                  <>
                    <span
                      className="iconify"
                      data-icon="lucide:mail"
                      data-width="18"
                    ></span>
                    Enviar por Email
                  </>
                )}
              </button>
              <p className="text-[11px] text-neutral-600 text-center">
                {method === "whatsapp"
                  ? "Se abrirá WhatsApp con los datos listos para enviar."
                  : "Recibirás confirmación por email en las próximas horas."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== APP PRINCIPAL ====================
export default function App() {
  const [toast, setToast] = useState({ show: false, title: "", msg: "" });

  const triggerToast = (title, msg) => {
    setToast({ show: true, title, msg });
    setTimeout(() => setToast({ show: false, title: "", msg: "" }), 5000);
  };

  const hideToast = () => setToast({ show: false, title: "", msg: "" });

  return (
    <div className="bg-[#0a0a0a] text-white font-sans antialiased">
      <Navbar />
      <Hero />

      <section className="border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 font-serif">
                37
              </div>
              <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
                Años de tradición
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 font-serif">
                100%
              </div>
              <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
                Producto local
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 font-serif">
                12h
              </div>
              <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
                Cocción lenta
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 font-serif">
                4.8
              </div>
              <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
                <span
                  className="iconify text-orange-500"
                  data-icon="lucide:star"
                  data-width="12"
                ></span>
                Google
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Nosotros - Resumido por brevedad, mantiene el mismo HTML con className */}
        <section
          id="nosotros"
          className="relative py-24 md:py-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                Nuestra Historia
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-white/5">
                <img
                  src="https://picsum.photos/seed/grill-meat-wood/800/600.jpg"
                  alt="Asador"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-6">
                  Tradición que se{" "}
                  <span className="text-orange-500">siente en cada bocado</span>
                </h2>
                <p className="text-neutral-400 font-light leading-relaxed mb-6">
                  En 1987, la familia Soler encendió por primera vez los fogones
                  de lo que hoy es El Asador de Montgat. Tres generaciones
                  después, seguimos fieles a la misma filosofía.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center shrink-0">
                      <span
                        className="iconify text-orange-500"
                        data-icon="lucide:beef"
                        data-width="16"
                      ></span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Carne propia</div>
                      <div className="text-xs text-neutral-500">
                        Madurada 30+ días
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center shrink-0">
                      <span
                        className="iconify text-orange-500"
                        data-icon="lucide:waves"
                        data-width="16"
                      ></span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        Pescado del litoral
                      </div>
                      <div className="text-xs text-neutral-500">
                        Subasta diaria
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center shrink-0">
                      <span
                        className="iconify text-orange-500"
                        data-icon="lucide:leaf"
                        data-width="16"
                      ></span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Km 0</div>
                      <div className="text-xs text-neutral-500">
                        Huerta del Maresme
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center shrink-0">
                      <span
                        className="iconify text-orange-500"
                        data-icon="lucide:wine"
                        data-width="16"
                      ></span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Bodega</div>
                      <div className="text-xs text-neutral-500">
                        200+ referencias
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MenuSection />

        <section id="galeria" className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
                Momentos al <span className="text-orange-500">fuego</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="gallery-item aspect-square rounded-xl overflow-hidden border border-white/5 col-span-2 row-span-2">
                <img
                  src="https://picsum.photos/seed/steak-grill-brasa/800/800.jpg"
                  alt="Brasa"
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-500 hover:scale-108 cursor-pointer"
                />
              </div>
              <div className="gallery-item aspect-square rounded-xl overflow-hidden border border-white/5">
                <img
                  src="https://picsum.photos/seed/wine-catalan/400/400.jpg"
                  alt="Vino"
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-500 hover:scale-108 cursor-pointer"
                />
              </div>
              <div className="gallery-item aspect-square rounded-xl overflow-hidden border border-white/5">
                <img
                  src="https://picsum.photos/seed/grill-embers-fire/400/400.jpg"
                  alt="Brasas"
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-500 hover:scale-108 cursor-pointer"
                />
              </div>
              <div className="gallery-item aspect-square rounded-xl overflow-hidden border border-white/5 col-span-2">
                <img
                  src="https://picsum.photos/seed/mediterranean-coast/800/400.jpg"
                  alt="Costa"
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-500 hover:scale-108 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <Reservations triggerToast={triggerToast} />
      </main>

      <footer className="border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center text-neutral-500 text-sm">
          © 2026 El Asador de Montgat. Todos los derechos reservados.
        </div>
      </footer>

      {/* WhatsApp Flotante */}
      <div className="fixed bottom-6 left-6 z-50 group">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20hacer%20una%20reserva`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span
            className="iconify text-white"
            data-icon="mdi:whatsapp"
            data-width="36"
          ></span>
        </a>
      </div>

      <Toast
        show={toast.show}
        title={toast.title}
        msg={toast.msg}
        hideToast={hideToast}
      />
    </div>
  );
}
