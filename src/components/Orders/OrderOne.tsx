import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { CategoryWithEquipments } from '../../types/category-with-equipments.interface.ts';
import { TotalPrice } from '../Creator/TotalPrice.tsx';
import { useParams } from 'react-router';
import { Order } from '../../types/order.interface.ts';
import { Content } from '../layout/Content/Content.tsx';
import './OrderOne.scss';

export const OrderOne = () => {
  const { data: dataCategory, isLoading } = useGetQuery<
    CategoryWithEquipments[]
  >(`categories`, 'equipments');

  const params = useParams<{ id: string }>();
  const { data } = useGetQuery<Order>(`orders/${params.id}`);

  if (!dataCategory) return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Content title={'Zamówienie'} subtitle={'Numer zamówienia: ' + params.id}>
      <div className={'summary--order-info'}>
        Imię i Nazwisko: {data?.firstName} {data?.lastName} <br />
        Email: {data?.email} <br />
      </div>

      {dataCategory.map((category) => (
        <div key={category.id}>
          <div className={'summary--category-name'}>{category.name}</div>
          <div className={'summary--category-equipments'}>
            {category.equipments
              ?.filter((eq) =>
                data?.details.split('|')?.includes(eq.partUnique)
              )
              .map((eq) => (
                <div className={'summary--category-equipments-one'} key={eq.id}>
                  <span>{eq.name}</span> <span>{eq.price} PLN</span>
                </div>
              ))}
          </div>
        </div>
      ))}
      <TotalPrice savedList={data?.details.split('|')} />
    </Content>
  );
};
