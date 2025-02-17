import { Table, TableColumnsType } from 'antd';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Order } from '../../types/order.interface.ts';
import { useNavigate } from 'react-router';

export const OrdersTable = () => {
  const { data } = useGetQuery<Order[]>(`orders`);
  const navigation = useNavigate();

  if (!data) {
    return <div>Loading...</div>;
  }

  const columns: TableColumnsType<Order> = [
    {
      title: 'Imię i Nazwisko Zamawiającego',
      key: 'name',
      render: (_, record) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => navigation(`/orders/${record.id}`)}
        >
          {record.firstName + ' ' + record.lastName}
        </span>
      ),
    },

    {
      title: 'Numer zamówienia',
      dataIndex: 'id',
      key: 'id',
    },
  ];

  return (
    <Table dataSource={data} rowKey={'id'} columns={columns} size={'small'} />
  );
};
