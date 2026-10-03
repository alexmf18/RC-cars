import { SectionHeading } from './SectionHeading';
import { Star } from './icons';

const testimonials = [
  {
    name: 'Laura M.',
    role: 'Piloto de circuito',
    model: 'Flash R1',
    text: 'El Flash R1 es brutal en circuito. No esperaba tanta estabilidad en curvas rápidas.',
  },
  {
    name: 'Carlos P.',
    role: 'Ocio en familia',
    model: 'Storm XR',
    text: 'Compré el Storm XR para ocio y ha sido un acierto. Resistente y fácil de manejar.',
  },
  {
    name: 'Sergio A.',
    role: 'Todo terreno',
    model: 'Titan Pro',
    text: 'Atención excelente y calidad premium. El Titan Pro sube cualquier terreno sin esfuerzo.',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

export function Testimonials() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="border-y border-ink-800 bg-ink-900/60 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="testimonios-title" eyebrow="Testimonios" title="Lo que dice la parrilla" />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink-700 bg-ink-900 p-6">
                <div className="flex gap-0.5 text-flame-500" role="img" aria-label="Valoración: 5 de 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} width={16} height={16} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-fg">“{item.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-10 items-center justify-center rounded-full bg-ink-700 text-sm font-bold text-fg"
                  >
                    {initials(item.name)}
                  </span>
                  <span className="flex-1 text-sm">
                    <span className="block font-semibold text-fg">{item.name}</span>
                    <span className="text-fg-subtle">{item.role}</span>
                  </span>
                  <span className="rounded-md border border-ink-600 px-2 py-1 text-xs text-fg-muted">
                    {item.model}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
