function ModelsSection({ products, onOpenModal }) {
  return (
    <section id="modelos" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Modelos destacados</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Tres maquinas, tres estilos</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft">
              <img className="h-52 w-full object-cover" src={product.image} alt={product.name} />
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900">{product.name}</h3>
                <p className="mt-3 text-sm text-slate-700">{product.shortDescription}</p>
                <p className="mt-4 text-lg font-black text-electric-600">{product.price} EUR</p>
                <button
                  type="button"
                  className="mt-4 text-sm font-bold text-brand-700 underline decoration-2 underline-offset-4 hover:text-brand-600"
                  onClick={() => onOpenModal(product)}
                >
                  Ver detalles
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModelsSection;
