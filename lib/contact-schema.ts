import { z } from 'zod';
import { products } from './products';

export const reasons = [
  { value: 'modelo', label: 'Dudas sobre un modelo' },
  { value: 'pedido', label: 'Hacer un pedido' },
  { value: 'recambios', label: 'Recambios y taller' },
  { value: 'otro', label: 'Otro motivo' },
] as const;

export const MESSAGE_MAX = 500;

const reasonValues = reasons.map((reason) => reason.value);
const modelValues = ['', ...products.map((product) => product.id)];

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Introduce al menos 2 caracteres.').max(80, 'Máximo 80 caracteres.'),
  email: z.string().trim().pipe(z.email('Introduce un email válido, p. ej. nombre@dominio.com.')),
  reason: z.string().refine((value) => reasonValues.includes(value as never), 'Elige un motivo.'),
  model: z.string().refine((value) => modelValues.includes(value)),
  message: z
    .string()
    .trim()
    .min(10, 'Escribe al menos 10 caracteres.')
    .max(MESSAGE_MAX, `Máximo ${MESSAGE_MAX} caracteres.`),
  privacy: z.boolean().refine((value) => value, 'Necesitamos tu consentimiento para responderte.'),
});

export type ContactFormValues = z.input<typeof contactSchema>;

/** Nombre corto de cada campo para el resumen de errores. */
export const fieldLabels: Record<keyof ContactFormValues, string> = {
  name: 'Nombre',
  email: 'Email',
  reason: 'Motivo',
  model: 'Modelo de interés',
  message: 'Mensaje',
  privacy: 'Privacidad',
};

/** Mensaje corto para el resumen (distinto del que aparece bajo cada campo). */
export const summaryMessages: Partial<Record<keyof ContactFormValues, string>> = {
  privacy: 'acepta la política para continuar',
  email: 'el formato no es válido',
};
