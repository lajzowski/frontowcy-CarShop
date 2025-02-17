import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { CategoryWithEquipments } from '../../types/category-with-equipments.interface.ts';
import { Checkbox } from 'antd';
import { Content } from '../layout/Content/Content.tsx';
import { CreatorButtonsGroup } from './CreatorButtonsGroup.tsx';
import { TotalPrice } from './TotalPrice.tsx';
import { useCreatorListStore } from '../../hooks/useCreatorListStore.ts';

export const CreatorTable = () => {
  const params = useParams<{ identifier: string }>();
  const { data: dataCategory } = useGetQuery<CategoryWithEquipments[]>(
    `categories?identifier=${params.identifier}&`,
    'equipments'
  );

  const { list: checkedList, update: setCheckedList } = useCreatorListStore();

  const onChange = (list1: string[]) => {
    const currentCat = dataCategory?.find(
      (cat) => cat.identifier === params.identifier
    );

    if (currentCat) {
      const currentEq = currentCat.equipments;

      const oldData = checkedList.filter(
        (eq) => !currentEq.find((e) => e.partUnique === eq)
      );

      setCheckedList([...oldData, ...list1]);
    }
  };

  useEffect(() => {}, [dataCategory]);

  if (!dataCategory) return <div>Loading...</div>;

  return (
    <Content title={'Kreator Konfiguracji'} subtitle={dataCategory[0].name}>
      <div className={'creator-table'}>
        <Checkbox.Group
          style={{ width: '100%' }}
          value={checkedList}
          onChange={onChange}
        >
          {dataCategory[0].equipments.map((eq) => (
            <div key={eq.id} className={'creator-checkbox'}>
              <div>
                <Checkbox
                  value={eq.partUnique}
                  checked={
                    checkedList.findIndex((s) => s === eq.partUnique) !== -1
                  }
                >
                  {eq.name}
                </Checkbox>
              </div>
              <div className={'price'}>{eq.price} PLN</div>
            </div>
          ))}
        </Checkbox.Group>
      </div>
      {params.identifier && (
        <CreatorButtonsGroup
          checkedList={checkedList}
          currentCategory={
            dataCategory.find((cat) => cat.identifier === params.identifier)!
          }
        />
      )}
      <TotalPrice />
    </Content>
  );
};
