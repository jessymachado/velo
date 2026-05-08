import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange (preparar)
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();  
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act (Agir)
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-G9MK3C');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();


   // Assert (Verificar)
  const infoPedido = page.locator('//div[@data-testid="order-result-VLO-G9MK3C"]//p[text()="Pedido"]/following-sibling::p[1]');
  await expect(infoPedido).toBeVisible({timeout: 10_000});
  await expect(infoPedido).toContainText('VLO-G9MK3C');

  await expect(page.getByText('APROVADO')).toBeVisible();
  
});