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

  
  /****************************/
  /* IMPLEMENTAÇÕES DO PAPITO */
  /****************************/
  //1) Xpath puro na resolução
  /*
  const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-G9MK3C"]')
  await expect(orderCode).toBeVisible({timeout: 10_000});
  */

   
  //2) Utilizar getByRole para utilizar o parágrafo e inserir filtro pela subfunção 'filter"
  /*
  const containerPedido = page.getByRole('paragraph')
  .filter({hasText: 'Pedido'})
  .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)
  await expect(containerPedido).toBeVisible({timeout: 10_000});
  */

  await expect(page.getByText('APROVADO')).toBeVisible();  
});