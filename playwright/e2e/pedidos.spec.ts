import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';
import { OrderDetails, OrderLockupPage } from '../support/pages/OrderLockupPage';

/// AAA - Arrange, Act, Assert
test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange (preparar)
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  });

  test('deve consultar um pedido aprovado', async ({ page }) => {
    //Test Data    
    const order: OrderDetails = {
      number: 'VLO-G9MK3C',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Jessica Machado',
        email: 'ccr.jeh@velo.dev',
      },
      payment: 'À Vista'
    }

    // Act (Agir)
    const orderLockupPage = new OrderLockupPage(page);
    await orderLockupPage.searchOrder(order.number);

    // Assert (Verificar) 
    await orderLockupPage.validateOrderDetails(order);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status);
  });

  test('deve consultar um pedido reprovado', async ({ page }) => {
    //Test Data    
    const order: OrderDetails = {
      number: 'VLO-CGVR9X',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Tamara Weis',
        email: 'tamara@velo.dev',
      },
      payment: 'À Vista'
    }

    // Act (Agir)
    const orderLockupPage = new OrderLockupPage(page);
    await orderLockupPage.searchOrder(order.number);

    // Assert (Verificar)     
    await orderLockupPage.validateOrderDetails(order);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status);
  });

  test('deve consultar um pedido em análise', async ({ page }) => {
    //Test Data    
    const order: OrderDetails = {
      number: 'VLO-OM1N55',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Tatiane Machado',
        email: 'tati@velo.dev',
      },
      payment: 'À Vista'
    }

    // Act (Agir)
    const orderLockupPage = new OrderLockupPage(page);
    await orderLockupPage.searchOrder(order.number);

    // Assert (Verificar)     
    await orderLockupPage.validateOrderDetails(order);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status);
  });

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    //Test Data
    const order = generateOrderCode();

    // Act (Agir)
    const orderLockupPage = new OrderLockupPage(page);
    await orderLockupPage.searchOrder(order);

    // Assert (Verificar)   
    await orderLockupPage.validateOrderNotFound();
  });

  test('deve exibir mensagem quando o pedido está fora do padrão', async ({ page }) => {    
    //Test Data
    const orderCode = "ABC123-INVALIDO"
    
    // Act (Agir)
    const orderLockupPage = new OrderLockupPage(page);
    await orderLockupPage.searchOrder(orderCode);

    // Assert (Verificar)   
    await orderLockupPage.validateOrderNotFound();
  });
});
