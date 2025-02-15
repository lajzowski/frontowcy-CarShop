import { Table, TableColumnsType } from 'antd';
import { Category } from '../../types/category.interface.ts';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { ButtonDeleteConfirm } from '../addons/ButtonDeleteConfirm.tsx';
import { ButtonEdit } from '../addons/ButtonEdit.tsx';
import { ButtonAdd } from '../addons/ButtonAdd.tsx';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import useMessage from 'antd/es/message/useMessage';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import { CategoryChangePosition } from './CategoryChangePosition.tsx';
import { ModalAddEditCategory } from './ModalAddEditCategory.tsx';
import { Equipment } from '../../types/equipment.interface.ts';
import { Link } from 'react-router';

export const CategoriesTable = () => {
  const { data } = useGetQuery<Category[]>('categories');
  const { data: equipmentData } = useGetQuery<Equipment[]>('equipments');
  const [isModalAddCategoryOpen, setIsModalAddCategoryOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [addCategoryForm] = useForm<Category>();
  const [editCategoryForm] = useForm<Category>();
  const [messageApi, contextHolder] = useMessage();
  const { mutate } = useCreateMutation<Category, Category>('categories');
  const { mutate: mutateEdit } = useCreateMutation<Category, Category>(
    `categories`,
    'PATCH'
  );

  const { mutate: mutateDelete } = useCreateMutation<Category, Category>(
    `categories`,
    'DELETE'
  );

  const queryClient = useQueryClient();

  const resetFormAddCategory = () => {
    addCategoryForm.resetFields();
    setIsModalAddCategoryOpen(false);
  };

  const addCategorySubmit = (formData: Category) => {
    const currentPosition =
      data && data.length > 0
        ? Math.max(...data.map((category) => category.position)) + 1
        : 1;

    addCategoryForm
      .validateFields()
      .then(() => {
        // Proceed with submitting formData

        mutate(
          {
            ...formData,
            position: currentPosition,
          },
          {
            onSuccess: async (category) => {
              /*          // odświeżanie danych
              queryClient.invalidateQueries({
                queryKey: ['players'],
              });*/

              // dodawanie 1 pozycji do danych
              queryClient.setQueryData<Category[]>(
                ['categories'],
                (oldData) => [...(oldData || []), category]
              );
              messageApi.success(`Kategoria ${category.name} została dodana`);
              resetFormAddCategory();
            },
          }
        );
      })
      .catch((error) => {
        console.error('Validation failed:', error);
        messageApi.error(`Błąd walidacji: ${error.message}`);
      });
  };

  const removeCategory = (category: Category) => {
    // sprawdzanie, czy kategoria jest pusta
    if (equipmentData?.some((eq) => eq.categoryId === category.id)) {
      messageApi.error(
        'Do kategorii przypisane są części! Najpierw usuń części z kategorii.'
      );
      return;
    }

    // usuwanie kategorii

    mutateDelete(category, {
      onSuccess: async (category) => {
        // Poprawa pozycji po usunięciu.
        const updatedCategories = (data ? data : [])
          .filter((cat) => cat.id !== category.id) // Usuń kategorię
          .sort((a, b) => a.position - b.position) // Posortuj według pozycji
          .map((cat, index) => ({ ...cat, position: index + 1 })); // Popraw pozycje

        // Prześlij zmiany do back-endu.

        console.log(updatedCategories);

        for (const updatedCat of updatedCategories) {
          mutateEdit(updatedCat); // Wyślij każdą poprawioną kategorię
        }

        // Zaktualizuj cache z nowymi danymi.
        queryClient.setQueryData<Category[]>(['categories'], updatedCategories);
      },
    });
  };

  const startEditCategory = (category: Category) => {
    setEditCategory(category);
    editCategoryForm.setFieldsValue(category);
  };

  const editCategorySubmit = (formData: Category) => {
    if (editCategory?.id) {
      formData.id = editCategory.id;
    }

    editCategoryForm
      .validateFields()
      .then(() => {
        // Proceed with submitting formData

        mutateEdit(
          {
            ...formData,
          },
          {
            onSuccess: async (category) => {
              /*          // odświeżanie danych
              queryClient.invalidateQueries({
                queryKey: ['players'],
              });*/

              // dodawanie 1 pozycji do danych
              queryClient.setQueryData<Category[]>(
                ['categories'],
                (oldData) => [
                  ...(oldData || []).map((cat) =>
                    cat.id === category.id ? category : cat
                  ),
                ]
              );
              messageApi.success(`Kategoria ${category.name} została dodana`);
              resetFormEditCategory();
            },
          }
        );
      })
      .catch((error) => {
        console.error('Validation failed:', error);
        messageApi.error(`Błąd walidacji: ${error.message}`);
      });
  };

  const resetFormEditCategory = () => {
    editCategoryForm.resetFields();
    setEditCategory(null);
  };

  const addCategoryButtonClick = () => {
    setIsModalAddCategoryOpen(true);
  };

  const columns: TableColumnsType<Category> = [
    {
      title: 'Nazwa Kategorii',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Link to={`/categories/${record.identifier}`}>{record.name}</Link>
      ),
    },

    {
      title: 'Identyfikator',
      dataIndex: 'identifier',
      key: 'identifier',
      render: (_, record) => (
        <Link to={`/categories/${record.identifier}`}>{record.identifier}</Link>
      ),
    },
    {
      title: '',
      width: '200px',
      render: (_, record) => (
        <div className={'table--action'}>
          <CategoryChangePosition category={record} />
          <ButtonEdit
            toolTip={`Edytuj kategorię ${record.name}`}
            onClick={() => startEditCategory(record)}
          />
          <ButtonDeleteConfirm
            confirm={() => removeCategory(record)}
            toolTip={`Usuń kategorię ${record.name}`}
            confirmTitle={'Usuwanie kategorii'}
            confirmText={`Czy na pewno chcesz usunąć kategorię "${record.name}"?`}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <>
            <ButtonAdd
              onClick={addCategoryButtonClick}
              toolTip={'Dodaj kategorię'}
              value={'Dodaj Kategorię'}
            />
          </>
        )}
        dataSource={data?.sort((a, b) => a.position - b.position)}
        rowKey={'id'}
        columns={columns}
        size={'small'}
      />

      {data && (
        <ModalAddEditCategory
          categoryData={data}
          form={addCategoryForm}
          isOpen={isModalAddCategoryOpen}
          reset={resetFormAddCategory}
          submit={addCategorySubmit}
        />
      )}

      {data && (
        <ModalAddEditCategory
          categoryData={data}
          form={editCategoryForm}
          isOpen={!!editCategory}
          reset={resetFormEditCategory}
          submit={editCategorySubmit}
        />
      )}

      {contextHolder}
    </>
  );
};
