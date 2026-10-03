import type { StaticImageData } from 'next/image';
import flashR1 from '@/assets/images/flash-r1.webp';
import stormXr from '@/assets/images/storm-xr.webp';
import titanPro from '@/assets/images/titan-pro.webp';

export type Category = 'Ocio' | 'Competición' | 'Todo terreno';

/** Nivel recomendado del piloto, de 1 (principiante) a 4 (experto). */
export type Level = 1 | 2 | 3 | 4;

export const levelLabels: Record<Level, string> = {
  1: 'Principiante',
  2: 'Intermedio',
  3: 'Avanzado',
  4: 'Experto',
};

export interface Product {
  id: string;
  name: string;
  category: Category;
  /** Terrenos y usos secundarios; la categoría se muestra antes, destacada. */
  usage: string[];
  level: Level;
  shortDescription: string;
  longDescription: string;
  /** Precio en euros, IVA incluido. */
  price: number;
  image: StaticImageData;
  badge?: string;
  specs: {
    scale: string;
    topSpeedKmh: number;
    battery: string;
    drivetrain: string;
  };
}

export const products: Product[] = [
  {
    id: 'storm-xr',
    name: 'Storm XR',
    category: 'Ocio',
    usage: ['Terreno mixto', 'Ciudad'],
    level: 1,
    shortDescription: 'Modelo de ocio robusto para terrenos mixtos.',
    longDescription:
      'Storm XR es ideal para quienes quieren velocidad, estabilidad y resistencia en rutas urbanas y caminos de tierra. Su chasis reforzado absorbe impactos y mantiene la tracción constante.',
    price: 229,
    image: stormXr,
    badge: 'Ideal para empezar',
    specs: { scale: '1:10', topSpeedKmh: 65, battery: 'LiPo 2S 5200 mAh', drivetrain: '4x4' },
  },
  {
    id: 'flash-r1',
    name: 'Flash R1',
    category: 'Competición',
    usage: ['Asfalto', 'Circuito técnico'],
    level: 3,
    shortDescription: 'Pensado para competición, con aceleración explosiva.',
    longDescription:
      'Flash R1 combina bajo peso y motor brushless de alto rendimiento para salidas rápidas y curvas agresivas. Es el favorito en circuitos técnicos por su precisión.',
    price: 399,
    image: flashR1,
    badge: 'El más rápido',
    specs: {
      scale: '1:8',
      topSpeedKmh: 95,
      battery: 'LiPo 4S 6000 mAh',
      drivetrain: 'AWD con diferencial ajustable',
    },
  },
  {
    id: 'titan-pro',
    name: 'Titan Pro',
    category: 'Todo terreno',
    usage: ['Saltos', 'Barro'],
    level: 4,
    shortDescription: 'Bestia todo terreno para pilotos avanzados.',
    longDescription:
      'Titan Pro está creado para dominar saltos, barro y pendientes extremas con una suspensión de largo recorrido. Su sistema de refrigeración mantiene el rendimiento en tandas largas.',
    price: 529,
    image: titanPro,
    specs: { scale: '1:7', topSpeedKmh: 88, battery: 'LiPo 6S 5000 mAh', drivetrain: '4x4 bloqueable' },
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

const priceFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}
