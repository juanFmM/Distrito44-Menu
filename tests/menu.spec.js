/**
 * Tests E2E — Distrito 44 Menu
 * Adaptado de webapp-testing skill (awesome-claude-skills/webapp-testing)
 *
 * Ejecutar: npx playwright test
 */
import { test, expect } from '@playwright/test'

test.describe('Menú público', () => {
  test('muestra el título Distrito 44', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Distrito 44')).toBeVisible()
  })

  test('muestra las categorías del menú', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Al menos una categoría debe aparecer en la nav
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    const pills = nav.locator('button')
    await expect(pills).toHaveCountGreaterThan(0)
  })

  test('muestra platos con precio', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Al menos un precio debe aparecer
    const prices = page.locator('text=/\\$\\d+/')
    await expect(prices.first()).toBeVisible()
  })

  test('el botón Admin es visible', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const adminBtn = page.locator('button', { hasText: /Admin/i })
    await expect(adminBtn).toBeVisible()
  })

  test('el botón Admin redirige al login si no hay sesión', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const adminBtn = page.locator('button', { hasText: /Admin/i })
    await adminBtn.click()
    // Debe aparecer el formulario de login
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })
})

test.describe('Login de administrador', () => {
  test('muestra el formulario de login al hacer clic en Admin', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.locator('button', { hasText: /Admin/i }).click()
    await expect(page.locator('h2', { hasText: 'Iniciar sesión' })).toBeVisible()
  })

  test('muestra error con credenciales inválidas', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.locator('button', { hasText: /Admin/i }).click()
    await page.fill('input[type="email"]', 'wrong@test.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.locator('button[type="submit"]').click()
    // Debe aparecer algún mensaje de error
    await expect(page.locator('text=/[Cc]redencial|[Cc]ontraseña|[Ii]ncorrect/')).toBeVisible({ timeout: 8000 })
  })

  test('puede volver al menú desde el login', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.locator('button', { hasText: /Admin/i }).click()
    await page.locator('text=Volver al menú').click()
    await expect(page.getByText('Distrito 44').first()).toBeVisible()
  })
})
