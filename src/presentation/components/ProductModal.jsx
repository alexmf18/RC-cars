function ProductModal({ product, onClose, onBuyNow }) {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-soft md:p-8">
        <div className="mb-6 flex items-start justify-between">
          <h3 className="text-2xl font-black text-slate-900">{product.name}</h3>
          <button
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            onClick={onClose}
            type="button"
          >
            Cerrar
          </button>
        </div>

        <img className="h-72 w-full rounded-xl object-cover" src={product.image} alt={product.name} />
        <p className="mt-5 text-slate-700">{product.longDescription}</p>

        <table className="mt-6 w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
          <tbody>
            {Object.entries(product.specs).map(([key, value]) => (
              <tr key={key} className="border-b border-slate-200 last:border-b-0">
                <th className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-700">{key}</th>
                <td className="px-4 py-3 text-slate-700">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="mt-6 rounded-full bg-brand-600 px-7 py-3 font-bold text-white transition hover:bg-brand-700"
          type="button"
          onClick={() => onBuyNow(product)}
        >
          Comprar ahora - {product.price} EUR
        </button>
      </div>
    </div>
  );
}

export default ProductModal;
