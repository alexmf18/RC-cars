export const site = {
  name: 'RC Cars',
  // Sin barra final: se concatena con rutas como `${site.url}/privacidad`.
  url: 'https://rc-cars-dkai.vercel.app',
  description:
    'Coches teledirigidos de competición y ocio diseñados, calibrados y probados en pista en Barcelona. Compara modelos y pide información sin compromiso.',
  contact: {
    address: 'Carrer de Pujades 77, 08005 Barcelona',
    email: 'info@rccars.com',
    phone: '+34 931 555 123',
    phoneHref: 'tel:+34931555123',
    hours: 'Lunes a viernes, 9:00 – 18:00',
  },
} as const;
