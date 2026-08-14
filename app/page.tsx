"use client";

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
  "Ortodoncia",
  "Alineacion dental",
  "Mordida profunda",
  "Apiñamiento severo",
  "Clase III con microtornillos",
  "Valoracion estetica",
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span>Dr. Humberto Salleg</span>
          <small>Ortodoncista</small>
        </a>
        <nav className="desktop-nav" aria-label="Navegacion principal">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contacto">
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
        <a className="drawer-cta" href="#contacto" onClick={closeMenu}>
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
            <a className="primary-button" href="#contacto">
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
        <div className="hero-visual reveal">
          <div className="doctor-frame">
            <div className="portrait-placeholder">
              <span>HS</span>
              <small>Fotografia editorial del doctor pendiente</small>
            </div>
          </div>
          <Image
            src="/dental-studio.png"
            alt="Consultorio odontologico moderno y luminoso"
            width={1600}
            height={960}
            priority
          />
        </div>
      </section>

      <section className="philosophy section" id="sobre-mi">
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
            <article key={item}>
              <span />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="specialties section" id="especialidades">
        <div className="section-heading">
          <p className="section-kicker">Especialidades</p>
          <h2>Bloques de atencion pensados desde el diagnostico.</h2>
        </div>
        <div className="specialty-layout">
          {specialties.map((item, index) => (
            <article className={`specialty-card card-${index + 1}`} key={item.title}>
              <p>0{index + 1}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
              <a href="#contacto">Conocer mas</a>
            </article>
          ))}
        </div>
      </section>

      <section className="treatments section" id="tratamientos">
        <div className="treatment-image">
          <Image
            src="/dental-studio.png"
            alt="Espacio odontologico con tecnologia clinica"
            width={1600}
            height={960}
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

      <section className="process section">
        <div className="section-heading">
          <p className="section-kicker">Experiencia</p>
          <h2>Un proceso de atencion claro desde la primera consulta.</h2>
        </div>
        <div className="timeline">
          {process.map(([number, title, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cases section" id="casos">
        <div className="case-copy">
          <p className="section-kicker">Casos y resultados</p>
          <h2>Casos clinicos preparados para publicar solo con evidencia real.</h2>
          <p>
            Esta seccion queda lista para antes y despues, fotografias intraorales, diagnostico y
            autorizaciones. No se muestran resultados ficticios ni pacientes inventados.
          </p>
        </div>
        <div className="before-after" aria-label="Marcador de posicion para casos clinicos reales">
          <div>
            <span>Antes</span>
            <p>Imagen clinica pendiente</p>
          </div>
          <div>
            <span>Despues</span>
            <p>Imagen clinica pendiente</p>
          </div>
        </div>
      </section>

      <section className="doctor section">
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
            <article key={item}>{item}</article>
          ))}
        </div>
      </section>

      <section className="testimonials section" id="testimonios">
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

      <section className="consultorio section">
        <Image
          src="/dental-studio.png"
          alt="Referencia visual de consultorio boutique"
          width={1600}
          height={960}
        />
        <div>
          <p className="section-kicker">Consultorio</p>
          <h2>Un entorno pensado para privacidad, limpieza y calma.</h2>
          <p>
            Sustituye esta imagen por fotografias reales del consultorio para reforzar tecnologia,
            cercania y experiencia del paciente.
          </p>
        </div>
      </section>

      <section className="final-cta section">
        <p>Tu sonrisa merece una atencion diferente.</p>
        <h2>Agenda una valoracion profesional y recibe una orientacion clara.</h2>
        <div className="hero-actions">
          <a className="primary-button" href="#contacto">
            Agendar consulta
          </a>
          <a className="secondary-button" href="mailto:hsalleg14@gmail.com">
            Escribir por email
          </a>
        </div>
      </section>

      <section className="contact section" id="contacto">
        <div>
          <p className="section-kicker">Contacto</p>
          <h2>Solicita una consulta con el Dr. Humberto Salleg.</h2>
          <p>
            Informacion real disponible: Barranquilla, Colombia y correo profesional. WhatsApp,
            telefono, direccion exacta, Instagram y horarios quedan preparados para conectar.
          </p>
        </div>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
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
            <select name="reason" defaultValue="Ortodoncia">
              <option>Ortodoncia</option>
              <option>Valoracion estetica</option>
              <option>Seguimiento</option>
            </select>
          </label>
          <label>
            Mensaje
            <textarea name="message" rows={4} />
          </label>
          <button type="submit">Solicitar orientacion</button>
          <a href="mailto:hsalleg14@gmail.com">hsalleg14@gmail.com</a>
        </form>
      </section>

      <a className="whatsapp-float" href="#contacto" aria-label="Solicitar WhatsApp">
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
                <a href={reply === "Hablar con alguien" ? "mailto:hsalleg14@gmail.com" : "#contacto"} key={reply}>
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
