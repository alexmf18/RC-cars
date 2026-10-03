import Link from 'next/link';
import { products } from '@/lib/products';
import { site } from '@/lib/site';
import { Instagram, Youtube } from './icons';
import { Logo } from './Logo';

const helpLinks = [
  { label: 'Preguntas frecuentes', href: '/#faq' },
  { label: 'Comparar modelos', href: '/#comparar' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-700 bg-ink-950 px-4 pt-16 pb-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-block rounded-sm">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Coches teledirigidos de competición y ocio, diseñados y probados en Barcelona.
            </p>
            <ul className="mt-5 flex gap-2" aria-label="Redes sociales">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
              ].map(({ icon: SocialIcon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (se abre en una pestaña nueva)`}
                    className="flex size-11 items-center justify-center rounded-lg border border-ink-700 text-fg-muted transition-colors hover:border-fg/50 hover:text-fg"
                  >
                    <SocialIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-modelos">
            <h2 id="footer-modelos" className="text-xs font-bold tracking-widest text-fg uppercase">
              Modelos
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-fg-muted">
              {products.map((product) => (
                <li key={product.id}>
                  <Link href="/#modelos" className="hover:text-fg">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-ayuda">
            <h2 id="footer-ayuda" className="text-xs font-bold tracking-widest text-fg uppercase">
              Ayuda
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-fg-muted">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold tracking-widest text-fg uppercase">Contacto</h2>
            <address className="mt-4 space-y-3 text-sm text-fg-muted not-italic">
              <p>{site.contact.address}</p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="hover:text-fg">
                  {site.contact.email}
                </a>
              </p>
              <p>
                <a href={site.contact.phoneHref} className="hover:text-fg">
                  {site.contact.phone}
                </a>
              </p>
              <p>{site.contact.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Proyecto de portfolio: los productos y precios son ficticios.
          </p>
          <Link href="/privacidad" className="hover:text-fg">
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
