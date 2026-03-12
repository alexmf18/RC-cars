import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders key sections for the landing page', () => {
    render(<App />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/About us/i)).toBeInTheDocument();
    expect(screen.getByText(/Modelos destacados/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Testimonios/i).length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });
});
