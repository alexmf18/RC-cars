import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="contenido" className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-display text-6xl text-fg">Fuera de pista</h1>
      <p className="mt-4 max-w-md text-fg-muted">La página que buscas no existe o ha cambiado de sitio.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-flame-500 px-6 font-semibold text-ink-950 hover:bg-flame-400"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
