'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { formatPrice, type Product } from '@/lib/products';
import { CategoryTag } from './CategoryTag';
import { ArrowRight, Close } from './icons';
import { LevelMeter } from './LevelMeter';

interface Props {
  product: Product | null;
  onClose: () => void;
  onRequestInfo: (product: Product) => void;
}

/**
 * Ficha de modelo sobre <dialog> nativo: showModal() deja el resto de la página inerte,
 * mantiene el foco dentro, cierra con Esc y devuelve el foco al botón que la abrió.
 */
export function ModelDialog({ product, onClose, onRequestInfo }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  const handleClose = () => {
    document.documentElement.style.overflow = '';
    onClose();
  };

  return (
    // Clic en el fondo oscuro cierra la ficha; con teclado se cierra con Esc o el botón Cerrar.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-labelledby="ficha-titulo"
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 p-0 text-fg open:motion-safe:animate-dialog-in"
    >
      {product && (
        // En móvil: foto baja arriba, contenido con scroll propio y precio + botón siempre visibles abajo.
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col md:grid md:grid-cols-[1fr_1.05fr]">
          <div className="relative h-40 shrink-0 sm:h-56 md:h-auto">
            <Image
              src={product.image}
              alt={`${product.name} en acción`}
              placeholder="blur"
              sizes="(min-width: 768px) 520px, 100vw"
              className="size-full object-cover"
            />
            <CategoryTag category={product.category} className="absolute top-4 left-4" />
          </div>

          <div className="flex min-h-0 flex-col">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow">{[product.category, ...product.usage].join(' · ')}</p>
                <form method="dialog">
                  <button
                    type="submit"
                    aria-label="Cerrar ficha"
                    className="-mt-2 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-fg transition-colors hover:border-fg/50"
                  >
                    <Close />
                  </button>
                </form>
              </div>
              <h2 id="ficha-titulo" className="mt-1 font-display text-5xl leading-none text-fg">
                {product.name}
              </h2>
              <p className="mt-4 leading-relaxed text-fg-muted">{product.longDescription}</p>

              <p className="mt-6 text-xs font-medium tracking-wider text-fg-subtle uppercase">
                Nivel recomendado
              </p>
              <LevelMeter level={product.level} className="mt-2" />

              <h3 className="mt-8 text-sm font-bold tracking-wider text-fg uppercase">Especificaciones</h3>
              <table className="mt-3 w-full overflow-hidden rounded-lg text-sm">
                <tbody>
                  {[
                    ['Escala', product.specs.scale],
                    ['Velocidad máx.', `${product.specs.topSpeedKmh} km/h`],
                    ['Batería', product.specs.battery],
                    ['Tracción', product.specs.drivetrain],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-ink-700 last:border-0">
                      <th
                        scope="row"
                        className="w-2/5 bg-ink-850 px-4 py-3 text-left font-normal text-fg-muted"
                      >
                        {label}
                      </th>
                      <td className="bg-ink-850/40 px-4 py-3 font-semibold">{value}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="bg-ink-850 px-4 py-3 text-left font-normal text-fg-muted">
                      Uso
                    </th>
                    <td className="bg-ink-850/40 px-4 py-3 text-fg-muted">
                      <strong className="font-semibold text-fg">{product.category}</strong>
                      {product.usage.map((use) => ` · ${use}`)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-700 bg-ink-900 px-6 py-5 sm:flex-nowrap md:px-8">
              <div>
                <p className="text-xs tracking-wider text-fg-subtle uppercase">Precio</p>
                <p className="font-display text-3xl text-fg">{formatPrice(product.price)}</p>
                <p className="mt-1 text-xs text-fg-subtle">
                  Precio con IVA · Te respondemos en menos de 24 h
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRequestInfo(product)}
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-flame-500 px-6 font-semibold text-ink-950 transition-colors hover:bg-flame-400"
              >
                Pedir información <ArrowRight width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
