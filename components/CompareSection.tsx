import Image from 'next/image';
import { formatPrice, type Product } from '@/lib/products';
import { LevelMeter } from './LevelMeter';
import { SectionHeading } from './SectionHeading';

interface Props {
  products: Product[];
  onOpen: (product: Product) => void;
  onRequestInfo: (product: Product) => void;
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 inline-block rounded-[3px] bg-lime-400 px-1.5 py-0.5 align-middle text-[0.65rem] font-extrabold tracking-wider text-ink-950 uppercase">
      {children}
    </span>
  );
}

export function CompareSection({ products, onOpen, onRequestInfo }: Props) {
  const cheapest = Math.min(...products.map((product) => product.price));
  const fastest = Math.max(...products.map((product) => product.specs.topSpeedKmh));

  const rows: { label: string; render: (product: Product) => React.ReactNode }[] = [
    {
      label: 'Precio',
      render: (p) => (
        <>
          <span className="font-display text-xl">{formatPrice(p.price)}</span>
          {p.price === cheapest && <Highlight>Mejor precio</Highlight>}
        </>
      ),
    },
    {
      label: 'Uso',
      render: (p) => (
        <>
          <span className="font-semibold text-fg">{p.category}</span>
          <span className="block text-xs text-fg-subtle">{p.usage.join(' · ')}</span>
        </>
      ),
    },
    { label: 'Nivel', render: (p) => <LevelMeter level={p.level} /> },
    {
      label: 'Velocidad máx.',
      render: (p) => (
        <>
          {p.specs.topSpeedKmh} km/h
          {p.specs.topSpeedKmh === fastest && <Highlight>Más rápido</Highlight>}
        </>
      ),
    },
    { label: 'Escala', render: (p) => p.specs.scale },
    { label: 'Batería', render: (p) => p.specs.battery },
    { label: 'Tracción', render: (p) => p.specs.drivetrain },
  ];

  return (
    <section
      id="comparar"
      aria-labelledby="comparar-title"
      className="border-y border-ink-800 bg-ink-900/60 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="comparar-title" eyebrow="Comparador" title="¿Cuál es tu RC?">
          Los tres modelos, frente a frente. Desliza la tabla en el móvil para verlos todos.
        </SectionHeading>

        {/* Región desplazable: necesita foco para poder moverla con el teclado. */}
        <div
          className="relative mt-12 overflow-x-auto rounded-2xl border border-ink-700 bg-ink-900"
          role="region"
          aria-labelledby="comparar-title"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Comparativa de precio, uso, nivel y especificaciones</caption>
            <thead>
              <tr className="border-b border-ink-700">
                <td className="w-40 p-5" />
                {products.map((product) => (
                  <th key={product.id} scope="col" className="p-5 align-bottom font-normal">
                    <Image
                      src={product.image}
                      alt=""
                      placeholder="blur"
                      sizes="200px"
                      className="aspect-[4/3] w-full max-w-48 rounded-lg object-cover"
                    />
                    <span className="mt-3 block font-display text-2xl text-fg">{product.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-ink-800">
                  <th scope="row" className="px-5 py-4 font-normal text-fg-muted">
                    {row.label}
                  </th>
                  {products.map((product) => (
                    <td key={product.id} className="px-5 py-4 text-fg">
                      {row.render(product)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-5" />
                {products.map((product) => (
                  <td key={product.id} className="p-5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onOpen(product)}
                        className="min-h-10 rounded-lg border border-ink-600 px-3 text-xs font-semibold text-fg transition-colors hover:border-fg/60"
                      >
                        Ver ficha<span className="sr-only"> de {product.name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRequestInfo(product)}
                        className="min-h-10 rounded-lg bg-flame-500 px-3 text-xs font-semibold text-ink-950 transition-colors hover:bg-flame-400"
                      >
                        Pedir info<span className="sr-only"> sobre {product.name}</span>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
