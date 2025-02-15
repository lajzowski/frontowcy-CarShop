import { Content } from '../layout/Content/Content.tsx';
import { useParams } from 'react-router';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Category } from '../../types/category.interface.ts';
import { Table, TableColumnsType } from 'antd';
import { ButtonAdd } from '../addons/ButtonAdd.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { ButtonEdit } from '../addons/ButtonEdit.tsx';
import { ButtonDeleteConfirm } from '../addons/ButtonDeleteConfirm.tsx';
import { Equipment } from '../../types/equipment.interface.ts';
import { ModalAddEditPart } from './ModalAddEditPart.tsx';
import { useForm } from 'antd/es/form/Form';
import useMessage from 'antd/es/message/useMessage';
import { useState } from 'react';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';

interface CategoryWithEquipments extends Category {
  equipments: Equipment[];
}

export const OneCategoryTable = () => {
  const params = useParams<{ identifier: string }>();
  const { data, isLoading } = useGetQuery<CategoryWithEquipments[]>(
    `categories?identifier=${params.identifier}&`,
    'equipments'
  );

  const [addEquipmentForm] = useForm<Equipment>();
  const [editEquipmentForm] = useForm<Equipment>();
  const [messageApi, contextHolder] = useMessage();
  const [isModalAddPartOpen, setIsModalAddPartOpen] = useState(false);
  const [startEditPart, setStartEditPart] = useState<Equipment | null>(null);

  const { mutate } = useCreateMutation<Equipment, Equipment>('equipments');
  const { mutate: editMutate } = useCreateMutation<Equipment, Equipment>(
    'equipments',
    'PATCH'
  );
  const { mutate: deleteMutate } = useCreateMutation<Equipment, Equipment>(
    'equipments',
    'DELETE'
  );

  const queryClient = useQueryClient();

  const addCategoryButtonClick = () => {
    setIsModalAddPartOpen(true);
  };

  const removePart = (part: Equipment) => {
    deleteMutate(part, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: [`categories?identifier=${params.identifier}&`],
        });
      },
    });
  };

  const editPart = (part: Equipment) => {
    editEquipmentForm.setFieldsValue(part);
    setStartEditPart(part);
  };

  const columns: TableColumnsType<Equipment> = [
    {
      title: 'Nazwa Części',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Identyfikator',
      dataIndex: 'partUnique',
      key: 'partUnique',
    },
    {
      title: '',
      width: '200px',
      render: (_, record) => (
        <div className={'table--action'}>
          <ButtonEdit
            toolTip={`Edytuj część ${record.name}`}
            onClick={() => editPart(record)}
          />
          <ButtonDeleteConfirm
            confirm={() => removePart(record)}
            toolTip={`Usuń część ${record.name}`}
            confirmTitle={'Usuwanie części'}
            confirmText={`Czy na pewno chcesz usunąć część "${record.name}"?`}
          />
        </div>
      ),
    },
  ];

  if (isLoading || !data || data.length === 0) {
    return <div>Loading...</div>;
  }

  const resetFormAddPart = () => {
    setIsModalAddPartOpen(false);
    addEquipmentForm.resetFields();
  };

  const formAddPartSubmit = (formData: Equipment) => {
    if (data) {
      formData.categoryId = data[0].id;
    } else {
      return;
    }

    addEquipmentForm
      .validateFields()
      .then(() => {
        // Proceed with submitting formData

        mutate(formData, {
          onSuccess: async (equipment) => {
            // odświeżanie danych
            queryClient.invalidateQueries({
              queryKey: [`categories?identifier=${params.identifier}&`],
            });

            // dodawanie 1 pozycji do danych
            /*            queryClient.setQueryData<Equipment[]>(
              [`categories?identifier=${params.identifier}&`],
              (oldData) => [...(oldData || []), equipment]
            );*/
            messageApi.success(`Część ${equipment.name} została dodana`);
            resetFormAddPart();
          },
        });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
        messageApi.error(`Błąd walidacji: ${error.message}`);
      });
  };

  const formEditPartSubmit = (formData: Equipment) => {
    if (startEditPart) {
      formData.id = startEditPart.id;
    } else {
      return;
    }

    editEquipmentForm
      .validateFields()
      .then(() => {
        // Proceed with submitting formData

        editMutate(formData, {
          onSuccess: async (equipment) => {
            // odświeżanie danych
            queryClient.invalidateQueries({
              queryKey: [`categories?identifier=${params.identifier}&`],
            });

            // dodawanie 1 pozycji do danych
            /*            queryClient.setQueryData<Equipment[]>(
              [`categories?identifier=${params.identifier}&`],
              (oldData) => [...(oldData || []), equipment]
            );*/
            messageApi.success(`Część ${equipment.name} została dodana`);
            resetFormEditPart();
          },
        });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
        messageApi.error(`Błąd walidacji: ${error.message}`);
      });
  };

  const resetFormEditPart = () => {
    editEquipmentForm.resetFields();
    setStartEditPart(null);
  };

  return (
    <Content
      title={`Kategoria - ${data && data.length > 0 ? data[0].name : '...'}`}
      subtitle={'Zarządzaj częściami w tej kategorii.'}
    >
      <Table
        title={() => (
          <>
            <ButtonAdd
              onClick={addCategoryButtonClick}
              toolTip={'Dodaj element'}
              value={'Dodaj Element'}
            />
          </>
        )}
        dataSource={data[0].equipments}
        rowKey={'id'}
        columns={columns}
        size={'small'}
      />

      {data && (
        <>
          <ModalAddEditPart
            form={addEquipmentForm}
            partData={data[0].equipments}
            isOpen={isModalAddPartOpen}
            submit={formAddPartSubmit}
            reset={resetFormAddPart}
          />

          <ModalAddEditPart
            form={editEquipmentForm}
            partData={data[0].equipments}
            isOpen={!!startEditPart}
            submit={formEditPartSubmit}
            reset={resetFormEditPart}
          />
        </>
      )}
      {contextHolder}
    </Content>
  );
};
