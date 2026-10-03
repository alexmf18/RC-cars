import type { Category } from '@/lib/products';

const styles: Record<Category, string> = {
  Ocio: 'bg-sky-300 text-ink-950',
  Competición: 'bg-flame-500 text-ink-950',
  'Todo terreno': 'bg-lime-400 text-ink-950',
};

/** Etiqueta en forma de paralelogramo, como un dorsal de carrera. */
export function CategoryTag({ category, className = '' }: { category: Category; className?: string }) {
  return (
    <span
      className={`inline-block -skew-x-12 rounded-[3px] px-2.5 py-1 text-[0.7rem] font-extrabold tracking-wider uppercase ${styles[category]} ${className}`}
    >
      <span className="inline-block skew-x-12">{category}</span>
    </span>
  );
}
