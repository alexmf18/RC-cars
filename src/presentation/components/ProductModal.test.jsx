import { fireEvent, render, screen } from '@testing-library/react';
import ProductModal from './ProductModal';

const product = {
  id: 'storm-xr',
  name: 'Storm XR',
  longDescription: 'Descripcion extensa del modelo.',
  price: 229,
  image: 'https://example.com/car.jpg',
  specs: {
    Escala: '1:10',
    Velocidad: '65 km/h'
  }
};

describe('ProductModal', () => {
  it('does not render when product is null', () => {
    const { container } = render(
      <ProductModal product={null} onClose={jest.fn()} onBuyNow={jest.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders details and handles close and buy actions', () => {
    const onClose = jest.fn();
    const onBuyNow = jest.fn();

    render(<ProductModal product={product} onClose={onClose} onBuyNow={onBuyNow} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Storm XR')).toBeInTheDocument();
    expect(screen.getByText(/Comprar ahora - 229 EUR/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /comprar ahora/i }));
    expect(onBuyNow).toHaveBeenCalledWith(product);
  });
});
