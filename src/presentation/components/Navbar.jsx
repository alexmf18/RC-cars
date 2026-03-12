import RCLogo from './RCLogo';

const navItems = [
  { label: 'Nosotros', href: '#about' },
  { label: 'Modelos', href: '#modelos' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' }
];

function Navbar({ showMenu = true }) {
  return (
    <nav className="sticky top-0 z-30 border-b border-brand-100 bg-[#FFFDF9]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between pr-6 py-2">
        <a href="/" className="block w-[140px]">
          <RCLogo mode="wordmark" />
        </a>
        {showMenu && (
          <ul className="hidden gap-6 text-sm font-semibold text-slate-700 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a className="transition hover:text-brand-600" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
