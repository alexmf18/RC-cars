import { levelLabels, type Level } from '@/lib/products';

/** Cuatro segmentos inclinados; los activos en naranja. */
export function LevelMeter({ level, className = '' }: { level: Level; className?: string }) {
  const label = levelLabels[level];
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="flex gap-1" role="img" aria-label={`Nivel ${level} de 4: ${label}`}>
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`h-1.5 w-5 -skew-x-[20deg] rounded-[1px] ${step <= level ? 'bg-flame-500' : 'bg-ink-600'}`}
          />
        ))}
      </span>
      <span className="text-sm text-fg-muted" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
