function ContactSection() {
  return (
    <section id="contacto" className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-soft md:grid-cols-2 md:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Contacto</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">Hablemos de tu proximo RC</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li>
              <span className="font-bold">Localizacion:</span> Calle Motor 45, Madrid, Espana
            </li>
            <li>
              <span className="font-bold">Email:</span> info@rccars.com
            </li>
            <li>
              <span className="font-bold">Telefono:</span> +34 910 555 123
            </li>
            <li>
              <span className="font-bold">Horario:</span> Lunes a Viernes, 9:00 - 18:00
            </li>
          </ul>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="name">
              Nombre
            </label>
            <input id="name" type="text" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-400 focus:ring-2" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-400 focus:ring-2" placeholder="tu@email.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="message">
              Mensaje
            </label>
            <textarea id="message" rows="4" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-brand-400 focus:ring-2" placeholder="Cuentanos que necesitas" />
          </div>
          <button type="submit" className="rounded-full bg-electric-500 px-6 py-3 font-bold text-white transition hover:bg-electric-600">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
