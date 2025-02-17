import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Category } from '../../types/category.interface.ts';
import { CategoryWithEquipments } from '../../types/category-with-equipments.interface.ts';
import useMessage from 'antd/es/message/useMessage';

interface Props {
  currentCategory: CategoryWithEquipments;
  checkedList: string[];
}

export const CreatorButtonsGroup = ({
  currentCategory,
  checkedList,
}: Props) => {
  const navigation = useNavigate();
  const { data } = useGetQuery<Category[]>(`categories`);
  const [messageApi, contextHolder] = useMessage();

  if (!data) return <div>Loading...</div>;

  const currentChecked = (): boolean => {
    if (currentCategory) {
      const currentEq = checkedList.findIndex((eq) =>
        currentCategory.equipments.find((catEq) => catEq.partUnique === eq)
      );

      return currentEq !== -1;
    }
    return false;
  };

  const back = () => {
    if (
      data.filter((cat) => cat.identifier === currentCategory.identifier)[0]
        .position === 1
    ) {
      return;
    }

    const backPosition =
      data.filter((cat) => cat.identifier === currentCategory.identifier)[0]
        .position - 1;
    navigation(
      `/creator/${data.filter((cat) => cat.position === backPosition)[0].identifier}`
    );
  };

  const next = () => {
    if (!currentChecked()) {
      messageApi.warning('Musisz wybrać conajmniej jedną część z kategorii');

      return;
    }

    const nextPosition =
      data.find((cat) => cat.identifier === currentCategory.identifier)!
        .position + 1;

    const next = data.find((cat) => cat.position === nextPosition);

    console.log({ next, nextPosition, len: next });
    if (next) {
      navigation(`/creator/${next.identifier}`);
    } else {
      navigation('/creator/summary');
    }
  };

  return (
    <div className={'creator-buttons'}>
      <Button
        disabled={
          data.filter((cat) => cat.identifier === currentCategory.identifier)[0]
            .position === 1
        }
        onClick={back}
      >
        Wstecz
      </Button>
      <Button onClick={next}>Dalej</Button>
      {contextHolder}
    </div>
  );
};
