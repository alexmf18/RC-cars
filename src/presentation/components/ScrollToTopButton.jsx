import { useEffect, useState } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 220);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Volver al inicio"
      className="fixed bottom-6 right-6 z-40 rounded-full bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand-700"
    >
      Subir
    </button>
  );
}

export default ScrollToTopButton;
