import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

test.describe('Accesibilidad (axe, WCAG 2.2 AA)', () => {
  for (const path of ['/', '/privacidad']) {
    test(`${path} no tiene infracciones`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('la ficha abierta no tiene infracciones', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Ver ficha de Flash R1' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const results = await new AxeBuilder({ page }).include('dialog').analyze();
    expect(results.violations).toEqual([]);
  });
});

test('la ficha se usa con teclado: Esc cierra y el foco vuelve al botón', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Ver ficha de Storm XR' }).first();
  await trigger.click();

  const dialog = page.getByRole('dialog', { name: 'Storm XR' });
  await expect(dialog).toBeVisible();
  await expect(page.locator(':focus')).toHaveCount(1);
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('"Pedir información" lleva al contacto con el modelo elegido', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ver ficha de Titan Pro' }).first().click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: /pedir información/i })
    .click();

  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.getByLabel(/modelo de interés/i)).toHaveValue('titan-pro');
  await expect(page.getByLabel(/^nombre/i)).toBeFocused();
});

async function fillAndSend(page: Page) {
  await page.goto('/#contacto');
  const form = page.locator('#contacto form');
  await form.getByLabel(/^nombre/i).fill('Laura');
  await form.getByLabel(/^email/i).fill('laura@correo.com');
  await form.getByLabel(/^mensaje/i).fill('Quiero información del Flash R1.');
  await form.getByRole('checkbox').check();
  await form.getByRole('button', { name: /enviar mensaje/i }).click();
  return form;
}

// Formspree siempre se intercepta: los tests nunca envían emails reales.
test('el formulario envía a Formspree y muestra la confirmación', async ({ page }) => {
  let request: { url: string; body: Record<string, unknown> } | undefined;
  await page.route('https://formspree.io/**', async (route) => {
    request = { url: route.request().url(), body: route.request().postDataJSON() };
    await route.fulfill({ status: 200, json: { ok: true } });
  });

  await fillAndSend(page);

  await expect(page.getByRole('status')).toContainText('Mensaje enviado');
  expect(request?.url).toBe('https://formspree.io/f/xrpbnjpq');
  expect(request?.body).toMatchObject({ name: 'Laura', email: 'laura@correo.com', _gotcha: '' });
});

test('si Formspree falla se avisa y se conservan los datos', async ({ page }) => {
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 500, json: { errors: [{ message: 'Error del servidor.' }] } }),
  );

  const form = await fillAndSend(page);

  await expect(form.getByRole('alert')).toContainText('Error del servidor.');
  await expect(form.getByLabel(/^nombre/i)).toHaveValue('Laura');
});

test('el formulario inválido muestra el resumen de errores', async ({ page }) => {
  await page.goto('/#contacto');
  await page
    .locator('#contacto form')
    .getByRole('button', { name: /enviar mensaje/i })
    .click();
  await expect(page.getByText(/revisa \d campos/i)).toBeVisible();
  await expect(page.getByLabel(/^nombre/i)).toHaveAttribute('aria-invalid', 'true');
});

test('en móvil hay menú de navegación', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Solo móvil');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /menú/i });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page
    .getByRole('navigation', { name: 'Principal (móvil)' })
    .getByRole('link', { name: 'FAQ' })
    .click();
  await expect(page).toHaveURL(/#faq$/);
  await expect(page.getByRole('navigation', { name: 'Principal (móvil)' })).toBeHidden();
});

test('SEO: metadatos, OG, sitemap y robots', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/RC Cars/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Barcelona/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/);
  expect((await request.get('/opengraph-image')).headers()['content-type']).toContain('image/png');
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/privacidad');
  expect((await request.get('/robots.txt')).ok()).toBe(true);
});

test('no hay scroll horizontal (la tabla del comparador se desplaza dentro de su caja)', async ({ page }) => {
  await page.goto('/');
  const [scrollWidth, clientWidth] = await page.evaluate(() => [
    document.documentElement.scrollWidth,
    document.documentElement.clientWidth,
  ]);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});
