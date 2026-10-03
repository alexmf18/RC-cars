import { Plus } from './icons';

export const faqs = [
  {
    question: '¿Qué modelo me recomendáis si nunca he tenido un RC?',
    answer:
      'El Storm XR. Es el más tolerante a golpes, su velocidad es manejable y funciona en ciudad y en tierra. Cuando domines el control, el Flash R1 o el Titan Pro serán el siguiente paso.',
  },
  {
    question: '¿Cuánto dura la batería?',
    answer:
      'Entre 20 y 35 minutos por carga según el modelo y el terreno. Las baterías LiPo se cargan en unos 60 minutos con el cargador incluido.',
  },
  {
    question: '¿Qué cubre la garantía de 2 años?',
    answer:
      'Defectos de fabricación en motor, electrónica y chasis. No cubre desgaste normal (neumáticos, piñones) ni daños por golpes, que reparamos en nuestro taller con recambio original.',
  },
  {
    question: '¿Los dejáis listos para rodar?',
    answer:
      'Sí. Todos los modelos salen montados y calibrados, con emisora y batería incluidas. Solo hay que cargar la batería.',
  },
  {
    question: '¿Vendéis recambios y hacéis reparaciones?',
    answer:
      'Sí, tenemos recambios de todos los modelos y taller propio en Barcelona. Elige «Recambios y taller» en el formulario y te damos presupuesto.',
  },
  {
    question: '¿Hacéis envíos a toda España?',
    answer:
      'Enviamos a la península en 48 h laborables sin coste a partir de 150 €. Para Baleares, Canarias, Ceuta y Melilla consúltanos plazos.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="mt-3 font-display text-4xl leading-none text-fg sm:text-5xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-fg-muted">
            ¿No encuentras tu respuesta?{' '}
            <a
              href="#contacto"
              className="font-semibold text-flame-400 underline underline-offset-4 hover:text-flame-300"
            >
              Escríbenos
            </a>{' '}
            y te contestamos en menos de 24 h.
          </p>
        </div>

        <div className="divide-y divide-ink-700 border-y border-ink-700">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group" open={index === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold text-fg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-ink-600 text-fg-muted transition-transform duration-300 group-open:rotate-45 group-open:text-flame-400">
                  <Plus width={16} height={16} />
                </span>
              </summary>
              <p className="pr-14 pb-5 leading-relaxed text-fg-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
