import Image from 'next/image';
import heroImage from '@/assets/images/hero.webp';
import { ArrowRight, Gauge, Ruler, Shield, Truck } from './icons';

const stats = [
  { icon: Gauge, label: 'Velocidad máxima', value: '95 km/h' },
  { icon: Ruler, label: 'Escalas disponibles', value: '1:7 – 1:10' },
  { icon: Shield, label: 'Garantía', value: '2 años' },
  { icon: Truck, label: 'Envío peninsular', value: '48 h' },
];

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[62%] [mask-image:linear-gradient(to_bottom,transparent,black_40%)] sm:h-[70%]">
        <Image
          src={heroImage}
          alt=""
          priority
          placeholder="blur"
          sizes="100vw"
          className="size-full object-cover object-[50%_70%] motion-safe:animate-fade"
        />
        {/* La máscara funde el borde superior; este velo oscurece la foto para que el texto se lea. */}
        <div className="absolute inset-0 bg-ink-950/25" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/70 to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[34rem] max-w-6xl content-start gap-8 px-4 pt-14 pb-[clamp(14rem,36vw,22rem)] sm:px-6 md:grid-cols-2 md:gap-12 md:pt-20">
        <div className="motion-safe:animate-rise">
          <p className="eyebrow">Temporada 2026 · Competición y ocio</p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(3.25rem,8vw,5.5rem)] leading-[0.92] text-fg"
          >
            Domina cada <span className="block text-flame-500">curva.</span>
          </h1>
        </div>

        <div className="max-w-md self-end motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
          <p className="text-lg leading-relaxed text-fg-muted">
            Coches teledirigidos diseñados, calibrados y probados en pista en Barcelona. Del primer derrape a
            la final del campeonato.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#modelos"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-flame-500 px-6 font-semibold text-ink-950 transition-colors hover:bg-flame-400"
            >
              Ver modelos <ArrowRight width={18} height={18} />
            </a>
            <a
              href="#comparar"
              className="inline-flex min-h-12 items-center rounded-lg border border-fg/25 bg-ink-950/50 px-6 font-semibold text-fg backdrop-blur-sm transition-colors hover:border-fg/60"
            >
              Compararlos
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-y border-ink-700 bg-ink-900/95">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: StatIcon, label, value }, index) => (
            // Un <dl> solo admite <div> con <dt>/<dd> dentro: el icono va en el <dt>, posicionado a la izquierda.
            <div
              key={label}
              className={`relative py-5 pr-4 pl-14 sm:pl-16 ${index % 2 === 1 ? 'border-l' : ''} ${
                index >= 2 ? 'border-t lg:border-t-0 lg:border-l' : ''
              } border-ink-700`}
            >
              <dt className="text-xs text-fg-muted sm:text-sm">
                <StatIcon className="absolute top-1/2 left-4 size-6 -translate-y-1/2 text-flame-500 sm:left-6" />
                {label}
              </dt>
              <dd className="font-display text-2xl text-fg normal-case sm:text-3xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
