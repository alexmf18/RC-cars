'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Close, Menu } from './icons';
import { Logo } from './Logo';

export const navItems = [
  { label: 'Modelos', href: '#modelos' },
  { label: 'Comparar', href: '#comparar' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Esc cierra el menú móvil y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/70 bg-ink-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#inicio" className="shrink-0 rounded-sm" onClick={() => setOpen(false)}>
          <Logo className="h-7 w-auto" />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-7 text-sm font-medium text-fg-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="rounded-sm transition-colors hover:text-fg" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#modelos"
            className="hidden items-center gap-2 rounded-lg bg-flame-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-flame-400 sm:inline-flex"
          >
            Ver modelos <ArrowRight width={16} height={16} />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-ink-700 text-fg md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        aria-label="Principal (móvil)"
        hidden={!open}
        className="border-t border-ink-700/70 bg-ink-950 md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                className="flex min-h-12 items-center border-b border-ink-800 font-display text-2xl text-fg last:border-0"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
