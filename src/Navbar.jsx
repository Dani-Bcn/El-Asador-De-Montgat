import React from "react";
import { useEffect,useState } from "react";


export default function Navbar() {

   const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[rgba(10,10,10,0.8)] backdrop-blur-xl ${scrolled ? "border-b border-white/5" : "border-b-0"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center text-white font-serif font-bold text-lg group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-serif font-bold text-lg leading-none">
                El Asador
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                de Montgat
              </span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[
              "inicio",
              "nosotros",
              "menu",
              "galeria",
              "reservas",
              "contacto",
            ].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="nav-link text-sm text-neutral-400 hover:text-white transition-colors capitalize"
              >
                {s}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#reservas"
              className="hidden sm:inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <span
                className="iconify"
                data-icon="lucide:calendar"
                data-width="16"
              ></span>
              Reservar
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-neutral-400 hover:text-white p-2"
            >
              <span
                className="iconify"
                data-icon={isOpen ? "lucide:x" : "lucide:menu"}
                data-width="24"
              ></span>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-white/5 px-6 py-6 space-y-4">
          {[
            "inicio",
            "nosotros",
            "menu",
            "galeria",
            "reservas",
            "contacto",
          ].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setIsOpen(false)}
              className="block text-neutral-400 hover:text-white text-sm capitalize"
            >
              {s}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
