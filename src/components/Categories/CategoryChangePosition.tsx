import { ButtonDown } from '../addons/ButtonDown.tsx';
import { ButtonUp } from '../addons/ButtonUp.tsx';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Category } from '../../types/category.interface.ts';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  category: Category;
}

export const CategoryChangePosition = ({ category }: Props) => {
  const { data } = useGetQuery<Category[]>('categories');
  const { mutate } = useCreateMutation<Category, Category>(
    'categories',
    'PATCH'
  );

  const queryClient = useQueryClient();

  const positionChange = (num: 1 | -1) => {
    if (!data) return;

    const newPosition = category.position + num;

    // Update the positions for all affected categories
    const updatedCategories = data.map((item) => {
      if (item.id === category.id) {
        return { ...item, position: newPosition };
      }
      if (item.position === newPosition) {
        return { ...item, position: category.position };
      }
      return item;
    });

    // Iteracyjnie wysyłamy PATCH dla każdego elementu
    updatedCategories.forEach((updatedItem) => {
      mutate(updatedItem, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['categories'],
          });
        },
        onError: (e) => {
          console.error('Failed to update', updatedItem.id, e);
        },
      });
    });
  };

  return (
    <div>
      <ButtonDown
        toolTip={'Przesuń kategorię niżej'}
        onClick={() => positionChange(1)}
        disabled={
          data
            ? category.position ===
              Math.max(...data.map((item) => item.position))
            : false
        }
      />
      <ButtonUp
        toolTip={'Przesuń kategorię wyżej'}
        onClick={() => positionChange(-1)}
        disabled={category.position === 1}
      />
    </div>
  );
};
