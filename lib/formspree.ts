import { reasons, type ContactFormValues } from './contact-schema';
import { getProduct } from './products';

export type SubmitResult = { ok: true } | { ok: false; error: string };

// El endpoint de Formspree es público por diseño (el navegador lo llama directamente), no es un secreto.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrpbnjpq';

/** Envía el formulario a Formspree desde el navegador (POST JSON). */
export async function sendContactForm(values: ContactFormValues, honeypot: string): Promise<SubmitResult> {
  const modelName = values.model ? getProduct(values.model)?.name : undefined;
  const reasonLabel = reasons.find((reason) => reason.value === values.reason)?.label ?? values.reason;

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        motivo: reasonLabel,
        modelo: modelName ?? 'Sin especificar',
        message: values.message.trim(),
        _subject: `RC Cars · ${reasonLabel}${modelName ? ` · ${modelName}` : ''}`,
        _gotcha: honeypot,
      }),
    });

    if (response.ok) return { ok: true };

    const data = (await response.json().catch(() => null)) as { errors?: { message?: string }[] } | null;
    const detail = data?.errors
      ?.map((error) => error.message)
      .filter(Boolean)
      .join(' ');
    return {
      ok: false,
      error: detail || 'No hemos podido enviar el mensaje. Inténtalo de nuevo en unos minutos.',
    };
  } catch {
    return { ok: false, error: 'Sin conexión. Revisa tu red e inténtalo de nuevo.' };
  }
}
