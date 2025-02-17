import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { CategoryWithEquipments } from '../../types/category-with-equipments.interface.ts';
import { useCreatorListStore } from '../../hooks/useCreatorListStore.ts';
import { TotalPrice } from './TotalPrice.tsx';

export const CreatorSummaryTable = () => {
  const { data: dataCategory, isLoading } = useGetQuery<
    CategoryWithEquipments[]
  >(`categories`, 'equipments');
  const { list: checkedList } = useCreatorListStore();

  if (!dataCategory) return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {dataCategory.map((category) => (
        <div key={category.id}>
          <div className={'summary--category-name'}>{category.name}</div>
          <div className={'summary--category-equipments'}>
            {category.equipments
              ?.filter((eq) => checkedList?.includes(eq.partUnique))
              .map((eq) => (
                <div className={'summary--category-equipments-one'} key={eq.id}>
                  <span>{eq.name}</span> <span>{eq.price} PLN</span>
                </div>
              ))}
          </div>
        </div>
      ))}
      <TotalPrice />
    </>
  );
};
