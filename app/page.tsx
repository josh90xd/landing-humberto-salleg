"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

const navItems = [
  ["Inicio", "inicio"],
  ["Sobre mi", "sobre-mi"],
  ["Especialidades", "especialidades"],
  ["Tratamientos", "tratamientos"],
  ["Casos", "casos"],
  ["Testimonios", "testimonios"],
  ["Contacto", "contacto"],
];

const credentials = [
  "Ortodoncia, Centro de Estudios Superiores de Ortodoncia AC, Ciudad de Mexico",
  "Odontologia, Universidad del Norte",
  "Docencia Universitaria, Universidad Metropolitana",
  "Miembro AMO, AAO, WFO y SCO",
];

const specialties = [
  {
    title: "Ortodoncia especializada",
    text: "Diagnostico, planificacion y tratamiento ortodontico con una mirada academica y clinica.",
  },
  {
    title: "Maloclusiones complejas",
    text: "Experiencia academica en clase II, clase III, mordida profunda y apoyo con microtornillos.",
  },
  {
    title: "Odontologia estetica",
    text: "Alineacion, armonia dental y decisiones esteticas guiadas por evaluacion profesional.",
  },
];

const treatments = [
  "Ortodoncia invisible",
  "Diseño de sonrisa",
  "Ortodoncia",
  "Alineacion dental",
  "Mordida profunda",
  "Apiñamiento severo",
  "Clase III con microtornillos",
];

const process = [
  ["01", "Conocerte", "Escuchar tu historia, expectativas y antecedentes."],
  ["02", "Evaluarte", "Realizar una valoracion clinica y diagnostica responsable."],
  ["03", "Planificar", "Definir una ruta de tratamiento explicada con claridad."],
  ["04", "Transformar", "Acompañar cada etapa con precision y seguimiento."],
  ["05", "Cuidar", "Mantener resultados con controles y orientacion profesional."],
];

const academic = [
  "Mencion honorifica en tesis sobre Shelf Mandibular con Cone Beam.",
  "Ponente en el Encuentro Virtual de Estudiantes de Posgrado de Ortodoncia de la AMO.",
  "Asistencia a congresos AMO y Annual Session en Chicago, New Orleans y Orlando.",
  "Investigacion sobre inteligencia artificial en educacion, diagnostico y terapeutica ortodontica.",
];

const quickReplies = [
  "Agendar consulta",
  "Tratamientos",
  "Conocer al doctor",
  "Ubicacion",
  "Hablar con alguien",
];

const whatsappMessage =
  "Hola Dr. Humberto Salleg, quiero agendar una consulta odontologica. Me gustaria recibir informacion sobre disponibilidad.";
const whatsappUrl = `https://wa.me/573003996801?text=${encodeURIComponent(whatsappMessage)}`;

const consultationMessages: Record<string, string> = {
  "Ortodoncia invisible":
    "Hola Dr. Humberto Salleg, quiero agendar una valoracion para ortodoncia invisible. Me gustaria saber si soy candidato y conocer las opciones de tratamiento.",
  "Diseño de sonrisa":
    "Hola Dr. Humberto Salleg, quiero agendar una valoracion para diseño de sonrisa. Me interesa mejorar la estetica de mi sonrisa con una orientacion profesional.",
  Ortodoncia:
    "Hola Dr. Humberto Salleg, quiero agendar una consulta de ortodoncia para evaluar mi caso y recibir una recomendacion profesional.",
  "Valoracion estetica":
    "Hola Dr. Humberto Salleg, quiero agendar una valoracion estetica dental y conocer que alternativas se ajustan a mi sonrisa.",
  Seguimiento:
    "Hola Dr. Humberto Salleg, quiero solicitar una cita de seguimiento y confirmar disponibilidad.",
};

const consultationReasons = Object.keys(consultationMessages);
type HeroPhoto = "default" | "editorial" | "consultation";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dr. Humberto Daniel Salleg Blanco",
  email: "hsalleg14@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barranquilla",
    addressCountry: "CO",
  },
  medicalSpecialty: "Orthodontics",
  alumniOf: ["Universidad del Norte", "Centro de Estudios Superiores de Ortodoncia AC"],
  memberOf: [
    "Academia Mexicana de Ortodoncia",
    "American Association of Orthodontics",
    "World Federation of Orthodontics",
    "Sociedad Colombiana de Ortodoncia",
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [frontPhoto, setFrontPhoto] = useState<HeroPhoto>("default");
  const [expandedPhoto, setExpandedPhoto] = useState<HeroPhoto | null>(null);
  const [contactReason, setContactReason] = useState("Ortodoncia invisible");
  const [contactMessage, setContactMessage] = useState(
    consultationMessages["Ortodoncia invisible"],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const animatedElements = document.querySelectorAll<HTMLElement>("[data-luxury-reveal]");

    if (!("IntersectionObserver" in window)) {
      animatedElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleHeroPhoto = (photo: HeroPhoto) => {
    if (frontPhoto === photo) {
      setExpandedPhoto((current) => (current === photo ? null : photo));
      return;
    }

    setFrontPhoto(photo);
    setExpandedPhoto(null);
  };
  const handleReasonChange = (reason: string) => {
    setContactReason(reason);
    setContactMessage(consultationMessages[reason] ?? whatsappMessage);
  };
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const personalizedMessage = [
      message || consultationMessages[contactReason],
      name ? `Nombre: ${name}` : "",
      email ? `Email: ${email}` : "",
      `Motivo: ${contactReason}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/573003996801?text=${encodeURIComponent(personalizedMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="top-info-bar" aria-label="Informacion de contacto y atencion">
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <span>Tel</span>
          +57 300 3996801
        </a>
        <a href="mailto:hsalleg14@gmail.com">
          <span>Email</span>
          hsalleg14@gmail.com
        </a>
        <a href="#contacto">
          <span>Ubicacion</span>
          Barranquilla, Colombia
        </a>
        <span>
          <span>Horario</span>
          Atencion con cita previa
        </span>
        <div className="top-socials" aria-label="Redes sociales">
          <a
            href="https://www.instagram.com/dr.salleg/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            IG
          </a>
        </div>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <Image
            src="/hs-logo-white.png"
            alt="Dr. Humberto Salleg Odontologia Estetica"
            width={1374}
            height={787}
            priority
          />
        </a>
        <nav className="desktop-nav" aria-label="Navegacion principal">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Agendar consulta
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="drawer-close" type="button" onClick={closeMenu} aria-label="Cerrar menu">
          Cerrar
        </button>
        {navItems.map(([label, id]) => (
          <a href={`#${id}`} key={id} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a className="drawer-cta" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
          Agendar consulta
        </a>
      </div>

      <section className="hero section" id="inicio">
        <div className="hero-copy reveal">
          <p className="eyebrow">Odontologia personal - Ortodoncia especializada</p>
          <h1>Precision, criterio academico y una sonrisa diseñada para ti.</h1>
          <p className="hero-text">
            Sitio profesional del Dr. Humberto Daniel Salleg Blanco, odontologo y ortodoncista con
            formacion de posgrado en Ciudad de Mexico y practica clinica en Barranquilla.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              Agendar consulta
            </a>
            <a className="secondary-button" href="#casos">
              Conocer mi trabajo
            </a>
          </div>
          <div className="proof-strip" aria-label="Credenciales profesionales">
            <span>CESO 2022-2024</span>
            <span>Universidad del Norte</span>
            <span>AMO - AAO - WFO - SCO</span>
          </div>
        </div>
        <div
          className={`hero-visual reveal ${expandedPhoto ? "has-expanded" : ""}`}
          data-front={frontPhoto}
        >
          <button
            className={`hero-photo default-frame ${frontPhoto === "default" ? "is-front" : "is-back"} ${
              expandedPhoto === "default" ? "is-expanded" : ""
            }`}
            type="button"
            onClick={() => handleHeroPhoto("default")}
            aria-label="Ver retrato principal del doctor"
          >
            <Image
              src="/hero-default-doctor.png"
              alt="Retrato principal del Dr. Humberto Salleg"
              width={1080}
              height={1080}
              priority
              unoptimized
            />
          </button>
          <button
            className={`hero-photo doctor-frame ${frontPhoto === "editorial" ? "is-front" : "is-back"} ${
              expandedPhoto === "editorial" ? "is-expanded" : ""
            }`}
            type="button"
            onClick={() => handleHeroPhoto("editorial")}
            aria-label="Ver fotografia editorial del doctor"
          >
            <Image
              className="doctor-portrait"
              src="/doctor-editorial.png"
              alt="Retrato editorial del Dr. Humberto Salleg Blanco"
              width={714}
              height={760}
              priority
            />
          </button>
          <button
            className={`hero-photo consultation-frame ${
              frontPhoto === "consultation" ? "is-front" : "is-back"
            } ${expandedPhoto === "consultation" ? "is-expanded" : ""}`}
            type="button"
            onClick={() => handleHeroPhoto("consultation")}
            aria-label="Ver fotografia clinica de consulta"
          >
            <Image
              src="/doctor-consultation.png"
              alt="Dr. Humberto Salleg durante una consulta odontologica"
              width={1213}
              height={1306}
              priority
            />
          </button>
        </div>
      </section>

      <section className="philosophy section" id="sobre-mi" data-luxury-reveal>
        <div className="section-kicker">Mi filosofia</div>
        <div className="split">
          <div>
            <h2>Una forma responsable, humana y precisa de entender la ortodoncia.</h2>
          </div>
          <div className="rich-copy">
            <p>
              La atencion empieza por una valoracion cuidadosa. Cada sonrisa necesita diagnostico,
              comunicacion clara y una ruta clinica que respete la biologia, la estetica y la
              tranquilidad del paciente.
            </p>
            <p>
              Su trayectoria combina practica clinica, investigacion y docencia, con participacion
              en espacios academicos internacionales de ortodoncia.
            </p>
          </div>
        </div>
        <div className="credential-grid">
          {credentials.map((item) => (
            <article key={item} data-luxury-reveal>
              <span />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="specialties section" id="especialidades" data-luxury-reveal>
        <div className="section-heading">
          <p className="section-kicker">Especialidades</p>
          <h2>Bloques de atencion pensados desde el diagnostico.</h2>
        </div>
        <div className="specialty-layout">
          {specialties.map((item, index) => (
            <article className={`specialty-card card-${index + 1}`} key={item.title} data-luxury-reveal>
              <p>0{index + 1}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
              <a href="#contacto">Conocer mas</a>
            </article>
          ))}
        </div>
      </section>

      <section className="treatments section" id="tratamientos" data-luxury-reveal>
        <div className="treatment-image">
          <Image
            src="/treatments-doctor.png"
            alt="Dr. Humberto Salleg realizando una atencion odontologica"
            width={1083}
            height={1413}
            unoptimized
          />
        </div>
        <div>
          <p className="section-kicker">Tratamientos</p>
          <h2>Enfoque clinico para movimientos dentales, funcion y estetica.</h2>
          <div className="treatment-list">
            {treatments.map((item) => (
              <a href="#contacto" key={item}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="process section" data-luxury-reveal>
        <div className="section-heading">
          <p className="section-kicker">Experiencia</p>
          <h2>Un proceso de atencion claro desde la primera consulta.</h2>
        </div>
        <div className="timeline">
          {process.map(([number, title, text]) => (
            <article key={number} data-luxury-reveal>
              <strong>{number}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cases section" id="casos" data-luxury-reveal>
        <div className="case-copy">
          <p className="section-kicker">Casos y resultados</p>
          <h2>Casos clinicos preparados para publicar solo con evidencia real.</h2>
          <p>
            Esta seccion queda lista para antes y despues, fotografias intraorales, diagnostico y
            autorizaciones. No se muestran resultados ficticios ni pacientes inventados.
          </p>
        </div>
        <div className="before-after" aria-label="Marcador de posicion para casos clinicos reales">
          <div className="case-panel has-image">
            <span>Antes</span>
            <Image
              src="/case-before.png"
              alt="Imagen clinica inicial antes del tratamiento odontologico"
              width={1774}
              height={889}
            />
          </div>
          <div className="case-panel has-image">
            <span>Despues</span>
            <Image
              src="/case-after.png"
              alt="Imagen clinica final despues del tratamiento odontologico"
              width={1417}
              height={1161}
            />
          </div>
        </div>
      </section>

      <section className="doctor section" data-luxury-reveal>
        <div className="doctor-card">
          <p className="section-kicker">Sobre el doctor</p>
          <h2>Dr. Humberto Daniel Salleg Blanco</h2>
          <p>
            Odontologo egresado de la Universidad del Norte, con posgrado en Ortodoncia en el
            Centro de Estudios Superiores de Ortodoncia AC y trayectoria docente en Universidad
            Metropolitana.
          </p>
        </div>
        <div className="academic-list">
          {academic.map((item) => (
            <article key={item} data-luxury-reveal>
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials section" id="testimonios" data-luxury-reveal>
        <div>
          <p className="section-kicker">Testimonios</p>
          <h2>La confianza debe publicarse con nombres, permisos y palabras reales.</h2>
        </div>
        <div className="testimonial-placeholder">
          <p>
            Espacio preparado para testimonios verificados. Agrega aqui comentarios reales de
            pacientes cuando esten autorizados para uso publico.
          </p>
        </div>
      </section>

      <section className="consultorio section" data-luxury-reveal>
        <video
          className="consultorio-video"
          src="/consultorio-video.mp4"
          controls
          playsInline
          preload="metadata"
          poster="/dental-studio.png"
          aria-label="Video del consultorio y atencion odontologica"
        >
          <track
            kind="captions"
            src="/consultorio-video-captions.vtt"
            srcLang="es"
            label="Español"
            default
          />
        </video>
        <div>
          <p className="section-kicker">Consultorio</p>
          <h2>Un entorno pensado para privacidad, limpieza y calma.</h2>
          <p>
            Un espacio de atencion pensado para reforzar tecnologia, cercania y experiencia del
            paciente.
          </p>
        </div>
      </section>

      <section className="final-cta section" data-luxury-reveal>
        <p>Tu sonrisa merece una atencion diferente.</p>
        <h2>Agenda una valoracion profesional y recibe una orientacion clara.</h2>
        <div className="hero-actions">
          <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Agendar consulta
          </a>
          <a className="secondary-button" href="mailto:hsalleg14@gmail.com">
            Escribir por email
          </a>
        </div>
      </section>

      <section className="contact section" id="contacto" data-luxury-reveal>
        <div>
          <p className="section-kicker">Contacto</p>
          <h2>Solicita una consulta con el Dr. Humberto Salleg.</h2>
          <p>
            Informacion real disponible: Barranquilla, Colombia y correo profesional. WhatsApp,
            telefono, direccion exacta, Instagram y horarios quedan preparados para conectar.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            Nombre
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            Motivo de consulta
            <select
              name="reason"
              value={contactReason}
              onChange={(event) => handleReasonChange(event.target.value)}
            >
              {consultationReasons.map((reason) => (
                <option key={reason}>{reason}</option>
              ))}
            </select>
          </label>
          <label>
            Mensaje
            <textarea
              name="message"
              rows={4}
              value={contactMessage}
              onChange={(event) => setContactMessage(event.target.value)}
            />
          </label>
          <button type="submit">Enviar por WhatsApp</button>
          <a href="mailto:hsalleg14@gmail.com">hsalleg14@gmail.com</a>
        </form>
      </section>

      <a
        className="whatsapp-float"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Solicitar consulta por WhatsApp"
      >
        WhatsApp
      </a>

      <div className={`chatbot ${chatOpen ? "open" : ""}`}>
        {chatOpen && (
          <section className="chat-panel" aria-label="Asistente Virtual">
            <div className="chat-head">
              <div>
                <strong>Asistente Virtual</strong>
                <span>Preparado para conexion futura</span>
              </div>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Cerrar asistente">
                x
              </button>
            </div>
            <p>
              Puedo orientar sobre tratamientos, horarios, ubicacion y proceso de atencion. Para
              dudas clinicas, el odontologo debe evaluarte directamente.
            </p>
            <div className="quick-replies">
              {quickReplies.map((reply) => (
                <a
                  href={
                    reply === "Agendar consulta" || reply === "Hablar con alguien"
                      ? whatsappUrl
                      : "#contacto"
                  }
                  target={reply === "Agendar consulta" || reply === "Hablar con alguien" ? "_blank" : undefined}
                  rel={reply === "Agendar consulta" || reply === "Hablar con alguien" ? "noreferrer" : undefined}
                  key={reply}
                >
                  {reply}
                </a>
              ))}
            </div>
          </section>
        )}
        <button type="button" className="chat-toggle" onClick={() => setChatOpen((value) => !value)}>
          Asistente Virtual
        </button>
      </div>
    </main>
  );
}
