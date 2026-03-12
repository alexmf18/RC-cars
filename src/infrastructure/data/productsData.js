import { Product } from '../../domain/entities/product';

export const productsData = [
  new Product({
    id: 'storm-xr',
    name: 'Storm XR',
    shortDescription: 'Modelo de ocio robusto para terrenos mixtos.',
    longDescription:
      'Storm XR es ideal para quienes quieren velocidad, estabilidad y resistencia en rutas urbanas y caminos de tierra. Su chasis reforzado absorbe impactos y mantiene traccion constante.',
    price: 229,
    image: '/images/STORM-XR.png',
    specs: {
      Escala: '1:10',
      Velocidad: '65 km/h',
      Bateria: 'LiPo 2S 5200mAh',
      Traccion: '4x4'
    }
  }),
  new Product({
    id: 'flash-r1',
    name: 'Flash R1',
    shortDescription: 'Pensado para competicion con aceleracion explosiva.',
    longDescription:
      'Flash R1 combina bajo peso y motor brushless de alto rendimiento para salidas rapidas y curvas agresivas. Es el favorito en circuitos tecnicos por su precision.',
    price: 399,
    image: '/images/FLASH-R1.png',
    specs: {
      Escala: '1:8',
      Velocidad: '95 km/h',
      Bateria: 'LiPo 4S 6000mAh',
      Traccion: 'AWD con diferencial ajustable'
    }
  }),
  new Product({
    id: 'titan-pro',
    name: 'Titan Pro',
    shortDescription: 'Bestia todo terreno para pilotos avanzados.',
    longDescription:
      'Titan Pro esta creado para dominar saltos, barro y pendientes extremas con una suspension de largo recorrido. Su sistema de refrigeracion mantiene el rendimiento en tandas largas.',
    price: 529,
    image: '/images/TITAN-PRO.png',
    specs: {
      Escala: '1:7',
      Velocidad: '88 km/h',
      Bateria: 'LiPo 6S 5000mAh',
      Traccion: '4x4 bloqueable'
    }
  })
];
