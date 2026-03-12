import RCLogo from '../components/RCLogo';

function AboutSection() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-stretch gap-4 md:grid-cols-[1.6fr_1fr]">
        <article className="h-full rounded-3xl border border-brand-100 bg-[#FDF7F1] p-7 shadow-soft md:p-10">
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">About us</p>
          <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Ingenieria RC con mirada editorial y alma de circuito.
          </h2>

          <div className="mt-6 h-px w-24 bg-accent-500" />

          <p className="mt-6 text-[1.03rem] leading-8 text-slate-700">
            En RC Cars diseniamos y fabricamos coches teledirigidos para quienes buscan algo mas que velocidad:
            buscamos sensaciones, control y una identidad de marca reconocible en cada linea. Nacimos para unir el
            rendimiento de competicion con la diversion de ocio en una misma plataforma.
          </p>

          <p className="mt-5 text-[1.03rem] leading-8 text-slate-700">
            Nuestro proceso combina diseno mecanico, calibracion electronica y test en pista. Cada modelo se ajusta
            para responder con precision en curvas, mantener traccion en terrenos mixtos y soportar sesiones largas
            sin perder estabilidad. Desarrollamos productos pensados para pilotos principiantes y avanzados.
          </p>

          <p className="mt-5 text-[1.03rem] leading-8 text-slate-700">
            Creemos en una marca cercana, transparente y en evolucion continua. Escuchamos a la comunidad para mejorar
            cada nueva serie y entregar una experiencia de uso premium: mejor respuesta, mejor mantenimiento y mejor
            sensacion al volante.
          </p>
        </article>

        <aside className="flex h-full items-center justify-center rounded-3xl border border-brand-100 bg-[#F6EDE3] p-6 shadow-soft md:p-8">
          <div className="w-full max-w-sm">
            <RCLogo />
          </div>
        </aside>
      </div>
    </section>
  );
}

export default AboutSection;
