import { ImageResponse } from 'next/og';
import { products } from '@/lib/products';

export const alt = 'RC Cars · Coches teledirigidos de competición y ocio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Imagen para redes sociales generada en build: solo formas y texto, sin fotos.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: 'linear-gradient(135deg, #090b0e 0%, #13171d 60%, #2a1408 100%)',
        color: '#f4f5f7',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            background: '#ff5b1f',
            color: '#090b0e',
            padding: '6px 22px',
            fontSize: 40,
            fontWeight: 800,
            transform: 'skewX(-14deg)',
          }}
        >
          RC
        </div>
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, borderBottom: '6px solid #c8f54a' }}>
          CARS
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 6, color: '#ff7a3d' }}>
          TEMPORADA 2026 · COMPETICIÓN Y OCIO
        </div>
        <div style={{ display: 'flex', fontSize: 112, fontWeight: 800, lineHeight: 1, marginTop: 20 }}>
          DOMINA CADA
        </div>
        <div style={{ display: 'flex', fontSize: 112, fontWeight: 800, lineHeight: 1, color: '#ff5b1f' }}>
          CURVA.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              border: '2px solid #343a45',
              borderRadius: 12,
              padding: '10px 20px',
              fontSize: 26,
              color: '#a3a9b4',
            }}
          >
            {product.name}
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            marginLeft: 'auto',
            alignItems: 'center',
            fontSize: 26,
            color: '#a3a9b4',
          }}
        >
          Hecho en Barcelona
        </div>
      </div>
    </div>,
    size,
  );
}
