import { Content } from '../layout/Content/Content.tsx';
import { OrdersTable } from './OrdersTable.tsx';

export const Orders = () => {
  return (
    <Content title={'Zamówienia'} subtitle={'Lista zamówień'}>
      <OrdersTable />
    </Content>
  );
};
