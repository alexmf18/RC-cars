'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, type BaseSyntheticEvent, type ReactNode } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  contactSchema,
  fieldLabels,
  MESSAGE_MAX,
  reasons,
  summaryMessages,
  type ContactFormValues,
} from '@/lib/contact-schema';
import { sendContactForm } from '@/lib/formspree';
import { SELECT_MODEL_EVENT } from '@/lib/model-selection';
import { products } from '@/lib/products';
import { AlertCircle, ArrowRight, CheckCircle, ChevronDown, Spinner } from './icons';

type Status = { state: 'idle' } | { state: 'success' } | { state: 'error'; message: string };

const fieldIds: Record<keyof ContactFormValues, string> = {
  name: 'contact-name',
  email: 'contact-email',
  reason: 'contact-reason',
  model: 'contact-model',
  message: 'contact-message',
  privacy: 'contact-privacy',
};

const defaultValues: ContactFormValues = {
  name: '',
  email: '',
  reason: 'modelo',
  model: '',
  message: '',
  privacy: false,
};

const inputBase =
  'mt-2 block w-full rounded-lg border bg-ink-850 px-4 py-3 text-base text-fg placeholder:text-fg-subtle transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0';
const inputOk = 'border-ink-600 hover:border-ink-600/80 focus-visible:outline-flame-400';
const inputError = 'border-danger-400 focus-visible:outline-danger-400';

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [showSummary, setShowSummary] = useState(false);
  // Se incrementa en cada envío fallido para mover el foco al resumen de errores.
  const [invalidAttempts, setInvalidAttempts] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const summaryTitleId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: 'onTouched',
  });

  // "Pedir información" desde una ficha preselecciona el modelo.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const modelId = (event as CustomEvent<string>).detail;
      setValue('model', modelId, { shouldDirty: true });
      setValue('reason', 'modelo');
      setStatus({ state: 'idle' });
    };
    window.addEventListener(SELECT_MODEL_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_MODEL_EVENT, onSelect);
  }, [setValue]);

  useEffect(() => {
    if (status.state === 'success') successRef.current?.focus();
  }, [status.state]);

  useEffect(() => {
    if (invalidAttempts > 0) summaryRef.current?.focus();
  }, [invalidAttempts]);

  const errorEntries = (Object.keys(fieldIds) as (keyof ContactFormValues)[])
    .map((field) => [field, errors[field]?.message] as const)
    .filter((entry): entry is readonly [keyof ContactFormValues, string] => Boolean(entry[1]));

  const onValid = async (values: ContactFormValues, event?: BaseSyntheticEvent) => {
    const form = event?.target as HTMLFormElement | undefined;
    const honeypot = (form?.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value ?? '';
    setShowSummary(false);
    setStatus({ state: 'idle' });
    const result = await sendContactForm(values, honeypot);
    if (result.ok) {
      reset(defaultValues);
      setStatus({ state: 'success' });
    } else {
      setStatus({ state: 'error', message: result.error });
    }
  };

  const onInvalid = () => {
    setShowSummary(true);
    setInvalidAttempts((count) => count + 1);
  };

  const messageLength = useWatch({ control, name: 'message' })?.length ?? 0;

  if (status.state === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-success-400/40 bg-ink-900 p-8 focus:outline-none"
      >
        <CheckCircle className="size-10 text-success-400" />
        <h3 className="mt-4 font-display text-3xl text-fg">Mensaje enviado</h3>
        <p className="mt-2 text-fg-muted">
          Gracias por escribirnos. Te responderemos por email en menos de 24 h laborables.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: 'idle' })}
          className="mt-6 min-h-11 rounded-lg border border-ink-600 px-5 font-semibold text-fg transition-colors hover:border-fg/60"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const describedBy = (field: keyof ContactFormValues, extra?: string) =>
    [errors[field] ? `${fieldIds[field]}-error` : null, extra].filter(Boolean).join(' ') || undefined;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid, onInvalid)}
      aria-labelledby="contacto-title"
      className="relative rounded-2xl border border-ink-700 bg-ink-900 p-6 sm:p-8"
    >
      {showSummary && errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          aria-labelledby={summaryTitleId}
          className="mb-6 rounded-xl border border-danger-400/60 bg-danger-950 p-5 focus:outline-none focus-visible:outline-2 focus-visible:outline-danger-400"
        >
          <p id={summaryTitleId} className="flex items-center gap-2 font-semibold text-fg" aria-live="polite">
            <AlertCircle className="size-5 shrink-0 text-danger-400" />
            Revisa {errorEntries.length} {errorEntries.length === 1 ? 'campo' : 'campos'} para poder enviar el
            mensaje:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-9 text-sm text-danger-300">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a
                  href={`#${fieldIds[field]}`}
                  className="underline underline-offset-2 hover:text-fg"
                  onClick={(event) => {
                    event.preventDefault();
                    setFocus(field);
                  }}
                >
                  {fieldLabels[field]}: {summaryMessages[field] ?? message.replace(/\.$/, '').toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status.state === 'error' && (
        <div
          role="alert"
          className="mb-6 flex gap-3 rounded-xl border border-danger-400/60 bg-danger-950 p-4 text-sm text-fg"
        >
          <AlertCircle className="size-5 shrink-0 text-danger-400" />
          <p>
            {status.message} <span className="text-fg-muted">Tus datos siguen en el formulario.</span>
          </p>
        </div>
      )}

      {/* Honeypot antispam: invisible para personas, los bots suelen rellenarlo. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-gotcha">No rellenes este campo</label>
        <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fieldIds.name} label="Nombre" required error={errors.name?.message}>
          <input
            id={fieldIds.name}
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            className={`${inputBase} ${errors.name ? inputError : inputOk}`}
            {...register('name')}
          />
        </Field>

        <Field id={fieldIds.email} label="Email" required error={errors.email?.message}>
          <input
            id={fieldIds.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@email.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
            className={`${inputBase} ${errors.email ? inputError : inputOk}`}
            {...register('email')}
          />
        </Field>

        <Field id={fieldIds.reason} label="Motivo" required error={errors.reason?.message}>
          <SelectWrapper>
            <select
              id={fieldIds.reason}
              aria-invalid={errors.reason ? true : undefined}
              aria-describedby={describedBy('reason')}
              className={`${inputBase} appearance-none pr-10 ${errors.reason ? inputError : inputOk}`}
              {...register('reason')}
            >
              {reasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </SelectWrapper>
        </Field>

        <Field id={fieldIds.model} label="Modelo de interés" optional>
          <SelectWrapper>
            <select
              id={fieldIds.model}
              className={`${inputBase} appearance-none pr-10 ${inputOk}`}
              {...register('model')}
            >
              <option value="">Aún no lo sé</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </SelectWrapper>
        </Field>

        <div className="sm:col-span-2">
          <Field id={fieldIds.message} label="Mensaje" required error={errors.message?.message}>
            <textarea
              id={fieldIds.message}
              rows={5}
              maxLength={MESSAGE_MAX}
              placeholder="Cuéntanos qué necesitas"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy('message', 'contact-message-count')}
              className={`${inputBase} resize-y ${errors.message ? inputError : inputOk}`}
              {...register('message')}
            />
          </Field>
          <p id="contact-message-count" className="-mt-1 text-right text-xs text-fg-subtle">
            {messageLength}/{MESSAGE_MAX}
            <span className="sr-only"> caracteres</span>
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex gap-3">
          <input
            id={fieldIds.privacy}
            type="checkbox"
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={describedBy('privacy')}
            className={`mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-flame-500 ${errors.privacy ? 'outline-2 outline-danger-400' : ''}`}
            {...register('privacy')}
          />
          <label htmlFor={fieldIds.privacy} className="text-sm text-fg-muted">
            He leído y acepto la{' '}
            <Link
              href="/privacidad"
              className="font-semibold text-flame-400 underline underline-offset-2 hover:text-flame-300"
            >
              política de privacidad
            </Link>
            . Solo usaremos tus datos para responderte. <RequiredMark />
          </label>
        </div>
        {errors.privacy?.message && (
          <FieldError id={`${fieldIds.privacy}-error`} message={errors.privacy.message} />
        )}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink-700 pt-6">
        <p className="text-sm text-fg-subtle">
          <RequiredMark /> Campos obligatorios
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-flame-500 px-6 font-semibold text-ink-950 transition-colors hover:bg-flame-400 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Spinner className="size-5 motion-safe:animate-spin" /> Enviando…
            </>
          ) : (
            <>
              Enviar mensaje <ArrowRight width={18} height={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function RequiredMark() {
  return (
    <span className="text-flame-500" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger-300">
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-fg">
        {label} {required && <RequiredMark />}
        {required && <span className="sr-only">(obligatorio)</span>}
        {optional && <span className="font-normal text-fg-subtle">(opcional)</span>}
      </label>
      {children}
      {error && <FieldError id={`${id}-error`} message={error} />}
    </div>
  );
}

function SelectWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 mt-1 size-5 -translate-y-1/2 text-fg-muted" />
    </div>
  );
}
