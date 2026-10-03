import { contactSchema, type ContactFormValues } from './contact-schema';

const valid: ContactFormValues = {
  name: 'Laura',
  email: 'laura@correo.com',
  reason: 'modelo',
  model: 'flash-r1',
  message: 'Quiero saber más del Flash R1.',
  privacy: true,
};

function errorsOf(values: ContactFormValues) {
  const result = contactSchema.safeParse(values);
  return result.success ? {} : Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message]));
}

describe('contactSchema', () => {
  it('acepta un formulario válido', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('acepta no elegir modelo', () => {
    expect(contactSchema.safeParse({ ...valid, model: '' }).success).toBe(true);
  });

  it('devuelve los mensajes en español de cada campo', () => {
    expect(errorsOf({ ...valid, name: 'L', email: 'laura@correo', message: 'Hola', privacy: false })).toEqual(
      {
        name: 'Introduce al menos 2 caracteres.',
        email: 'Introduce un email válido, p. ej. nombre@dominio.com.',
        message: 'Escribe al menos 10 caracteres.',
        privacy: 'Necesitamos tu consentimiento para responderte.',
      },
    );
  });

  it('no cuenta los espacios al validar la longitud', () => {
    expect(errorsOf({ ...valid, name: '  a  ' })).toHaveProperty('name');
  });

  it('rechaza modelos y motivos que no existen', () => {
    expect(errorsOf({ ...valid, model: 'tanque', reason: 'spam' })).toMatchObject({
      model: expect.any(String),
      reason: 'Elige un motivo.',
    });
  });
});
