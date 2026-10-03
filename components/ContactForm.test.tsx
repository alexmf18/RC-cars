import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SELECT_MODEL_EVENT } from '@/lib/model-selection';
import { ContactForm } from './ContactForm';

const sendContactForm = vi.fn();
vi.mock('@/lib/formspree', () => ({
  sendContactForm: (...args: unknown[]) => sendContactForm(...args),
}));

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^nombre/i), 'Laura');
  await user.type(screen.getByLabelText(/^email/i), 'laura@correo.com');
  await user.type(screen.getByLabelText(/^mensaje/i), 'Quiero información del Flash R1.');
  await user.click(screen.getByRole('checkbox'));
}

describe('ContactForm', () => {
  beforeEach(() => sendContactForm.mockReset());

  it('muestra el resumen de errores, marca los campos y mueve el foco al resumen', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^nombre/i), 'L');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    const summary = await screen.findByText(/revisa 4 campos/i);
    expect(summary.closest('[tabindex="-1"]')).toHaveFocus();
    expect(screen.getByLabelText(/^nombre/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/^nombre/i)).toHaveAccessibleDescription('Introduce al menos 2 caracteres.');
    expect(sendContactForm).not.toHaveBeenCalled();
  });

  it('el enlace del resumen lleva el foco al campo', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    await user.click(await screen.findByRole('link', { name: /^email:/i }));
    expect(screen.getByLabelText(/^email/i)).toHaveFocus();
  });

  it('envía los datos y muestra la confirmación', async () => {
    sendContactForm.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/mensaje enviado/i);
    expect(sendContactForm).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Laura', email: 'laura@correo.com', privacy: true }),
      '',
    );
  });

  it('si falla el envío avisa y conserva lo escrito', async () => {
    sendContactForm.mockResolvedValue({ ok: false, error: 'Sin conexión.' });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Sin conexión.');
    expect(screen.getByLabelText(/^nombre/i)).toHaveValue('Laura');
  });

  it('preselecciona el modelo cuando se pide información desde una ficha', async () => {
    render(<ContactForm />);
    act(() => {
      window.dispatchEvent(new CustomEvent(SELECT_MODEL_EVENT, { detail: 'titan-pro' }));
    });
    await waitFor(() => expect(screen.getByLabelText(/modelo de interés/i)).toHaveValue('titan-pro'));
  });
});
