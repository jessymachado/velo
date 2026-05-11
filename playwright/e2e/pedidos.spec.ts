import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  //Test Data
  const order = 'VLO-G9MK3C'

  // Arrange (preparar)
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();  
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act (Agir)
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();


  // Assert (Verificar)
  const infoPedido = page.locator('//div[@data-testid="order-result-VLO-G9MK3C"]//p[text()="Pedido"]/following-sibling::p[1]');
  await expect(infoPedido).toBeVisible({ timeout: 10_000 });
  await expect(infoPedido).toContainText(order);

  
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

test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
  const order = 'VLO-ABC123'

  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act (Agir)
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  /*Playwright Snapshot*/
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
  `);

  /* Root:: Raiz (todo HML) */
  // await expect(page.locator('#root')).toContainText('Pedido não encontrado');
  // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');

  //const title = page.getByRole('heading', {name: 'Pedido não encontrado'});
  //const title = page.getByRole('heading', {name: 'Pedido não encontrado', level:3});
  //await expect(title).toBeVisible();

  /*Busca pelo texto*/
  // message = page.getByText('Verifique o número do pedido e tente novamente')
  // await expect(message).toBeVisible();

  /*Locator*/
  // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]');
  // await expect(message).toBeVisible();

  /*Playwright*/
  // const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'});
  // await expect(message).toBeVisible();


});