/**
 * Comunica la ficha de un modelo con el formulario de contacto sin estado global:
 * la ficha emite el evento y el formulario lo escucha.
 */
export const SELECT_MODEL_EVENT = 'rc:select-model';

export function requestInfoAbout(modelId: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_MODEL_EVENT, { detail: modelId }));

  // Se espera a que la ficha termine de cerrarse: al cerrar, el navegador devuelve el foco
  // (y el scroll) al botón que la abrió, y eso pisaría el desplazamiento hasta el formulario.
  window.setTimeout(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('contact-name')?.focus({ preventScroll: true });
    document
      .getElementById('contacto')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#contacto');
  }, 50);
}
