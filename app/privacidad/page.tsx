import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo trata RC Cars los datos que envías desde el formulario de contacto.',
  alternates: { canonical: '/privacidad' },
};

const sections = [
  {
    title: 'Responsable',
    body: `${site.name}, ${site.contact.address}. Contacto: ${site.contact.email}.`,
  },
  {
    title: 'Qué datos recogemos',
    body: 'Solo los que escribes en el formulario de contacto: nombre, email, motivo, modelo de interés y mensaje.',
  },
  {
    title: 'Para qué los usamos',
    body: 'Únicamente para responder a tu consulta. No los usamos para publicidad ni los cedemos a terceros con fines comerciales.',
  },
  {
    title: 'Quién los procesa',
    body: 'El formulario se envía a través de Formspree, que actúa como encargado del tratamiento y nos reenvía el mensaje por email.',
  },
  {
    title: 'Cuánto tiempo los guardamos',
    body: 'El tiempo necesario para atender tu consulta y, como máximo, 12 meses después de la última comunicación.',
  },
  {
    title: 'Tus derechos',
    body: `Puedes pedir acceso, rectificación o supresión de tus datos escribiendo a ${site.contact.email}. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-ink-700/70">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="rounded-sm">
            <Logo className="h-7 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-fg-muted hover:text-fg">
            ← Volver al inicio
          </Link>
        </div>
      </header>
      <main id="contenido" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-5xl leading-none text-fg">Política de privacidad</h1>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-fg">{section.title}</h2>
              <p className="mt-2 leading-relaxed text-fg-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
