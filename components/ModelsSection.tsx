import Image from 'next/image';
import { formatPrice, type Product } from '@/lib/products';
import { CategoryTag } from './CategoryTag';
import { ArrowRight } from './icons';
import { LevelMeter } from './LevelMeter';
import { SectionHeading } from './SectionHeading';

interface Props {
  products: Product[];
  onOpen: (product: Product) => void;
  onRequestInfo: (product: Product) => void;
}

export function ModelsSection({ products, onOpen, onRequestInfo }: Props) {
  return (
    <section id="modelos" aria-labelledby="modelos-title" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="modelos-title" eyebrow="La gama" title="Tres máquinas, tres estilos">
          Elige por terreno y nivel. Todos salen de taller montados, calibrados y listos para rodar.
        </SectionHeading>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <article
                aria-labelledby={`card-${product.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 transition duration-300 hover:border-ink-600 motion-safe:hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                  <Image
                    src={product.image}
                    alt={`${product.name}, coche teledirigido ${product.category.toLowerCase()}`}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
                  />
                  <CategoryTag category={product.category} className="absolute top-4 left-4" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 id={`card-${product.id}`} className="font-display text-3xl text-fg">
                      {product.name}
                    </h3>
                    <p className="font-display text-2xl text-flame-500">{formatPrice(product.price)}</p>
                  </div>
                  <p className="mt-2 text-sm text-fg-muted">{product.shortDescription}</p>

                  <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-ink-700 py-4">
                    <div>
                      <dt className="text-xs text-fg-subtle">Velocidad</dt>
                      <dd className="mt-0.5 font-semibold text-fg">{product.specs.topSpeedKmh} km/h</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-fg-subtle">Escala</dt>
                      <dd className="mt-0.5 font-semibold text-fg">{product.specs.scale}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-fg-subtle">Tracción</dt>
                      <dd className="mt-0.5 truncate font-semibold text-fg" title={product.specs.drivetrain}>
                        {product.specs.drivetrain.split(' ')[0]}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4">
                    <p className="text-xs text-fg-subtle">Nivel recomendado</p>
                    <LevelMeter level={product.level} className="mt-1.5" />
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                    <button
                      type="button"
                      onClick={() => onOpen(product)}
                      className="min-h-11 rounded-lg border border-ink-600 text-sm font-semibold text-fg transition-colors hover:border-fg/60"
                    >
                      Ver ficha<span className="sr-only"> de {product.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRequestInfo(product)}
                      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-flame-500 text-sm font-semibold text-ink-950 transition-colors hover:bg-flame-400"
                    >
                      Pedir info<span className="sr-only"> sobre {product.name}</span>
                      <ArrowRight width={16} height={16} />
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
