import type { ReactNode } from 'react';

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-4xl leading-none text-fg sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-fg-muted">{children}</p>}
    </div>
  );
}
