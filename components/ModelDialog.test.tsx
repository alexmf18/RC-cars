import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { products } from '@/lib/products';
import { ModelDialog } from './ModelDialog';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const flash = products.find((product) => product.id === 'flash-r1')!;

describe('ModelDialog', () => {
  it('no muestra nada sin modelo seleccionado', () => {
    render(<ModelDialog product={null} onClose={vi.fn()} onRequestInfo={vi.fn()} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('muestra la ficha con precio, nivel y especificaciones', () => {
    render(<ModelDialog product={flash} onClose={vi.fn()} onRequestInfo={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Flash R1' })).toBeInTheDocument();
    expect(screen.getByText('399 €')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Nivel 3 de 4: Avanzado' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /tracción awd con diferencial ajustable/i })).toBeInTheDocument();
  });

  it('"Pedir información" avisa con el modelo elegido', async () => {
    const onRequestInfo = vi.fn();
    render(<ModelDialog product={flash} onClose={vi.fn()} onRequestInfo={onRequestInfo} />);
    await userEvent.click(screen.getByRole('button', { name: /pedir información/i }));
    expect(onRequestInfo).toHaveBeenCalledWith(flash);
  });
});
