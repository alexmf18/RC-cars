import { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getFeaturedProducts } from './application/useCases/getFeaturedProducts';
import { InMemoryProductRepository } from './infrastructure/repositories/InMemoryProductRepository';
import Navbar from './presentation/components/Navbar';
import ProductModal from './presentation/components/ProductModal';
import ScrollToTopButton from './presentation/components/ScrollToTopButton';
import PurchasePage from './presentation/pages/PurchasePage';
import OrderSummaryPage from './presentation/pages/OrderSummaryPage';
import AboutSection from './presentation/sections/AboutSection';
import ContactSection from './presentation/sections/ContactSection';
import Footer from './presentation/sections/Footer';
import HeroSection from './presentation/sections/HeroSection';
import ModelsSection from './presentation/sections/ModelsSection';
import TestimonialsSection from './presentation/sections/TestimonialsSection';

function HomePage({ products }) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBuyNow = (product) => {
    setSelectedProduct(null);
    navigate(`/comprar/${product.id}`, { state: { product } });
  };

  return (
    <>
      <main>
        <HeroSection products={products} />
        <AboutSection />
        <ModelsSection products={products} onOpenModal={setSelectedProduct} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <ScrollToTopButton />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
      />
    </>
  );
}

function AppContent({ products }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showMenu={isHome} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/comprar/:productId" element={<PurchasePage products={products} />} />
          <Route path="/pedido" element={<OrderSummaryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const repository = useMemo(() => new InMemoryProductRepository(), []);
  const products = useMemo(() => getFeaturedProducts(repository), [repository]);

  return (
    <BrowserRouter>
      <AppContent products={products} />
    </BrowserRouter>
  );
}

export default App;
