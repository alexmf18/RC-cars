const testimonials = [
  {
    id: 1,
    name: 'Laura M.',
    text: 'El Flash R1 es brutal en circuito. No esperaba tanta estabilidad en curvas rapidas.'
  },
  {
    id: 2,
    name: 'Carlos P.',
    text: 'Compre el Storm XR para ocio y ha sido un acierto. Resistente y facil de manejar.'
  },
  {
    id: 3,
    name: 'Sergio A.',
    text: 'Atencion excelente y calidad premium. Titan Pro sube cualquier terreno sin esfuerzo.'
  }
];

function TestimonialsSection() {
  return (
    <section id="testimonios" className="bg-gradient-to-br from-electric-100 to-brand-100 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-electric-600">Testimonios</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Lo que dice nuestra comunidad</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-soft">
              <p className="text-slate-700">"{item.text}"</p>
              <p className="mt-4 text-sm font-black uppercase tracking-wide text-brand-700">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
