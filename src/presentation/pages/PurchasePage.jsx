import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { saveOrderToStorage } from '../../infrastructure/storage/orderStorage';

function PurchasePage({ products }) {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedProduct = useMemo(
    () => location.state?.product ?? products.find((item) => item.id === productId),
    [location.state, productId, products]
  );

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Espana',
    quantity: 1
  });

  if (!selectedProduct) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-100 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-slate-900">Producto no encontrado</h1>
          <p className="mt-3 text-slate-700">No se pudo cargar el producto seleccionado.</p>
          <Link className="mt-5 inline-block rounded-full bg-brand-600 px-6 py-3 font-bold text-white" to="/">
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  const unitPrice = selectedProduct.price;
  const totalPrice = unitPrice * Number(formData.quantity || 1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const order = {
      id: `RC-${Date.now()}`,
      date: new Date().toLocaleString('es-ES'),
      product: selectedProduct,
      customer: formData,
      totalPrice
    };

    saveOrderToStorage(order);
    navigate('/pedido', { state: { order } });
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.4fr]">
        <aside className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft">
          <img className="h-60 w-full rounded-xl object-cover" src={selectedProduct.image} alt={selectedProduct.name} />
          <h2 className="mt-4 text-2xl font-black text-slate-900">{selectedProduct.name}</h2>
          <p className="mt-2 text-slate-700">{selectedProduct.shortDescription}</p>
          <p className="mt-4 text-lg font-black text-brand-600">{unitPrice} EUR / unidad</p>
        </aside>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft md:p-8">
          <h1 className="text-3xl font-black text-slate-900">Formulario de compra</h1>
          <p className="mt-2 text-slate-700">Introduce tus datos para completar el pedido.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Nombre completo
              <input required name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Email
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Telefono
              <input required name="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Cantidad
              <input required min="1" type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>

            <label className="text-sm font-semibold text-slate-700 md:col-span-2">
              Direccion
              <input required name="address" value={formData.address} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Ciudad
              <input required name="city" value={formData.city} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Codigo postal
              <input required name="postalCode" value={formData.postalCode} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>

            <label className="text-sm font-semibold text-slate-700 md:col-span-2">
              Pais
              <input required name="country" value={formData.country} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-300 focus:ring-2" />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
            <p className="text-lg font-black text-slate-900">Total: {totalPrice} EUR</p>
            <button type="submit" className="rounded-full bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700">
              Realizar compra
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PurchasePage;
