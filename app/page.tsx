import { AboutSection } from '@/components/AboutSection';
import { Catalog } from '@/components/Catalog';
import { ContactSection } from '@/components/ContactSection';
import { FaqSection, faqs } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Testimonials } from '@/components/Testimonials';
import { products } from '@/lib/products';
import { site } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Store',
      name: site.name,
      url: site.url,
      email: site.contact.email,
      telephone: site.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Carrer de Pujades 77',
        postalCode: '08005',
        addressLocality: 'Barcelona',
        addressCountry: 'ES',
      },
    },
    ...products.map((product) => ({
      '@type': 'Product',
      name: product.name,
      description: product.longDescription,
      image: new URL(product.image.src, site.url).toString(),
      offers: { '@type': 'Offer', price: product.price, priceCurrency: 'EUR' },
    })),
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Catalog />
        <AboutSection />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        // Datos estructurados generados en build a partir de datos propios (sin entrada de usuario).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
