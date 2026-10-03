import Image from 'next/image';
import aboutImage from '@/assets/images/flash-r1.webp';
import { Cpu, Flag, Wrench } from './icons';

const pillars = [
  {
    icon: Wrench,
    title: 'Diseño mecánico',
    text: 'Chasis y suspensiones pensados para aguantar golpes y repararse sin herramientas raras.',
  },
  {
    icon: Cpu,
    title: 'Calibración electrónica',
    text: 'Cada variador y servo se ajusta a mano antes de salir de taller.',
  },
  {
    icon: Flag,
    title: 'Test en pista',
    text: 'Ningún modelo sale a la venta sin superar tandas de prueba en circuito y tierra.',
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow">Nosotros</p>
          <h2 id="nosotros-title" className="mt-3 font-display text-4xl leading-none text-fg sm:text-5xl">
            Ingeniería de circuito, hecha en Barcelona
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-fg-muted">
            Diseñamos y fabricamos coches teledirigidos para quienes buscan algo más que velocidad: control,
            sensaciones y una máquina que aguante temporada tras temporada. Unimos el rendimiento de
            competición con la diversión del ocio, y escuchamos a la comunidad para mejorar cada nueva serie.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map(({ icon: PillarIcon, title, text }) => (
              <li key={title} className="border-t-2 border-flame-500 pt-4">
                <PillarIcon className="size-5 text-flame-500" />
                <h3 className="mt-3 text-sm font-bold tracking-wide text-fg uppercase">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative">
          <Image
            src={aboutImage}
            alt="Flash R1 derrapando sobre tierra durante una tanda de pruebas"
            placeholder="blur"
            sizes="(min-width: 1024px) 520px, 100vw"
            className="aspect-[4/3] w-full rounded-2xl border border-ink-700 object-cover"
          />
          <figcaption className="absolute -bottom-4 left-6 -skew-x-12 rounded-[3px] bg-flame-500 px-4 py-2 text-xs font-extrabold tracking-wider text-ink-950 uppercase">
            <span className="inline-block skew-x-12">Probado en pista · Barcelona</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
