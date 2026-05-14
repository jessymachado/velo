import { test } from '../support/fixtures';
import { generateOrderCode } from '../support/helpers';
import type { OrderDetails } from '../support/actions/orderLockupActions';

/// AAA - Arrange, Act, Assert
test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open();
  });

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-G9MK3C',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Jessica Machado',
        email: 'ccr.jeh@velo.dev',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
    await app.orderLockup.validateStatusBadge(order.status);
  });

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-CGVR9X',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Tamara Weis',
        email: 'tamara@velo.dev',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
    await app.orderLockup.validateStatusBadge(order.status);
  });

  test('deve consultar um pedido em análise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-OM1N55',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Tatiane Machado',
        email: 'tati@velo.dev',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
    await app.orderLockup.validateStatusBadge(order.status);
  });

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode();

    await app.orderLockup.searchOrder(order);
    await app.orderLockup.validateOrderNotFound();
  });

  test('deve exibir mensagem quando o pedido está fora do padrão', async ({ app }) => {
    const orderCode = 'ABC123-INVALIDO';

    await app.orderLockup.searchOrder(orderCode);
    await app.orderLockup.validateOrderNotFound();
  });
});
