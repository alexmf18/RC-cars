import { site } from '@/lib/site';
import { ContactForm } from './ContactForm';
import { Clock, Mail, MapPin, Phone } from './icons';

const details = [
  { icon: MapPin, label: 'Taller y showroom', value: site.contact.address },
  { icon: Mail, label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: Phone, label: 'Teléfono', value: site.contact.phone, href: site.contact.phoneHref },
  { icon: Clock, label: 'Horario', value: site.contact.hours },
];

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="border-t border-ink-800 bg-ink-900/60 px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2 id="contacto-title" className="mt-3 font-display text-4xl leading-none text-fg sm:text-5xl">
            Hablemos de tu próximo RC
          </h2>
          <p className="mt-4 text-fg-muted">
            ¿Dudas entre dos modelos, buscas recambios o quieres hacer un pedido? Escríbenos y te respondemos
            en menos de 24 h laborables.
          </p>

          <ul className="mt-8 space-y-5">
            {details.map(({ icon: DetailIcon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-flame-500">
                  <DetailIcon />
                </span>
                <span>
                  <span className="block text-xs text-fg-subtle">{label}</span>
                  {href ? (
                    <a href={href} className="font-semibold text-fg hover:text-flame-400">
                      {value}
                    </a>
                  ) : (
                    <span className="font-semibold text-fg">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
