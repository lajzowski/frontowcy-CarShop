import { useCreatorListStore } from '../../hooks/useCreatorListStore.ts';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Equipment } from '../../types/equipment.interface.ts';

interface Props {
  savedList?: string[];
}

export const TotalPrice = ({ savedList }: Props) => {
  const { list } = useCreatorListStore();
  const { data } = useGetQuery<Equipment[]>(`equipments`);

  if (!data) return <div>Loading...</div>;

  return (
    <div className={'total-price'}>
      Suma:{' '}
      {data
        .filter(
          (eq) =>
            !!(savedList ? savedList : list).find((e) => e === eq.partUnique)
        )
        .reduce((prev, curr) => prev + Number(curr.price), 0)}{' '}
      PLN
    </div>
  );
};
