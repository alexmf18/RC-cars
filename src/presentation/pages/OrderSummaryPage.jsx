import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getOrderFromStorage } from '../../infrastructure/storage/orderStorage';

function OrderSummaryPage() {
  const location = useLocation();

  const order = useMemo(() => {
    return location.state?.order ?? getOrderFromStorage();
  }, [location.state]);

  if (!order) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-100 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-black text-slate-900">No hay pedido para mostrar</h1>
          <p className="mt-3 text-slate-700">Completa el formulario de compra para generar el resumen.</p>
          <Link className="mt-5 inline-block rounded-full bg-brand-600 px-6 py-3 font-bold text-white" to="/">
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-2xl border border-brand-100 bg-white p-7 shadow-soft md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Pedido confirmado</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Resumen del pedido</h1>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl bg-[#FAF3EC] p-5">
            <h2 className="text-lg font-black text-slate-900">Datos del pedido</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li><span className="font-bold">ID:</span> {order.id}</li>
              <li><span className="font-bold">Fecha:</span> {order.date}</li>
              <li><span className="font-bold">Producto:</span> {order.product.name}</li>
              <li><span className="font-bold">Cantidad:</span> {order.customer.quantity}</li>
              <li><span className="font-bold">Total:</span> {order.totalPrice} EUR</li>
            </ul>
          </article>

          <article className="rounded-xl bg-[#FAF3EC] p-5">
            <h2 className="text-lg font-black text-slate-900">Datos del cliente</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li><span className="font-bold">Nombre:</span> {order.customer.fullName}</li>
              <li><span className="font-bold">Email:</span> {order.customer.email}</li>
              <li><span className="font-bold">Telefono:</span> {order.customer.phone}</li>
              <li><span className="font-bold">Direccion:</span> {order.customer.address}</li>
              <li><span className="font-bold">Ciudad:</span> {order.customer.city}</li>
              <li><span className="font-bold">CP:</span> {order.customer.postalCode}</li>
              <li><span className="font-bold">Pais:</span> {order.customer.country}</li>
            </ul>
          </article>
        </div>

        <Link to="/" className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default OrderSummaryPage;
