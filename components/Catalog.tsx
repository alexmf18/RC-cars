'use client';

import { useState } from 'react';
import { products, type Product } from '@/lib/products';
import { requestInfoAbout } from '@/lib/model-selection';
import { CompareSection } from './CompareSection';
import { ModelDialog } from './ModelDialog';
import { ModelsSection } from './ModelsSection';

/** Agrupa las secciones que abren la ficha de un modelo y comparten su estado. */
export function Catalog() {
  const [selected, setSelected] = useState<Product | null>(null);

  const handleRequestInfo = (product: Product) => {
    setSelected(null);
    requestInfoAbout(product.id);
  };

  return (
    <>
      <ModelsSection products={products} onOpen={setSelected} onRequestInfo={handleRequestInfo} />
      <CompareSection products={products} onOpen={setSelected} onRequestInfo={handleRequestInfo} />
      <ModelDialog product={selected} onClose={() => setSelected(null)} onRequestInfo={handleRequestInfo} />
    </>
  );
}
