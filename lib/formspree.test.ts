import type { ContactFormValues } from './contact-schema';
import { FORMSPREE_ENDPOINT, sendContactForm } from './formspree';

const values: ContactFormValues = {
  name: ' Laura ',
  email: 'laura@correo.com',
  reason: 'modelo',
  model: 'titan-pro',
  message: 'Quiero información del Titan Pro.',
  privacy: true,
};

describe('sendContactForm', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('envía JSON a Formspree con el modelo, el asunto y el honeypot', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(sendContactForm(values, '')).resolves.toEqual({ ok: true });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(FORMSPREE_ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.headers).toMatchObject({ Accept: 'application/json' });
    expect(JSON.parse(init.body as string)).toEqual({
      name: 'Laura',
      email: 'laura@correo.com',
      motivo: 'Dudas sobre un modelo',
      modelo: 'Titan Pro',
      message: 'Quiero información del Titan Pro.',
      _subject: 'RC Cars · Dudas sobre un modelo · Titan Pro',
      _gotcha: '',
    });
  });

  it('muestra el error que devuelve Formspree', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ errors: [{ message: 'Formulario desactivado.' }] }), { status: 403 }),
        ),
    );
    await expect(sendContactForm(values, '')).resolves.toEqual({
      ok: false,
      error: 'Formulario desactivado.',
    });
  });

  it('da un mensaje genérico si Formspree no explica el error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 500 })));
    const result = await sendContactForm(values, '');
    expect(result).toEqual({ ok: false, error: expect.stringMatching(/no hemos podido enviar/i) });
  });

  it('avisa si no hay conexión', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    const result = await sendContactForm(values, '');
    expect(result).toEqual({ ok: false, error: expect.stringMatching(/sin conexión/i) });
  });
});
