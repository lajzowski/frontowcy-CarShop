import { Button, Flex, Form, Input } from 'antd';
import { Order } from '../../types/order.interface.ts';
import { useForm } from 'antd/es/form/Form';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import useMessage from 'antd/es/message/useMessage';
import { useCreatorListStore } from '../../hooks/useCreatorListStore.ts';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Equipment } from '../../types/equipment.interface.ts';

interface Props {
  setSave: (save: boolean) => void;
}

export const CreatorSummaryForm = ({ setSave }: Props) => {
  const [form] = useForm<Order>();
  const { mutate } = useCreateMutation<Order, Order>('orders');
  const { data } = useGetQuery<Equipment[]>(`equipments`);

  const { list: checkedList, update: setCheckedList } = useCreatorListStore();

  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = useMessage();

  const submit = (formData: Order) => {
    if (!data) {
      return;
    }

    formData.details = checkedList.join('|');

    formData.value = data
      .filter((eq) => !!checkedList.find((e) => e === eq.partUnique))
      .reduce((prev, curr) => prev + Number(curr.price), 0);

    form
      .validateFields()
      .then(() => {
        // Proceed with submitting formData

        mutate(formData, {
          onSuccess: async () => {
            // odświeżanie danych
            queryClient.invalidateQueries({
              queryKey: [`orders`],
            });
            messageApi.success(`Zamówienie zostało zapisane!`);
            form.resetFields();
            setCheckedList([]);
            setSave(true);
          },
        });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
        messageApi.error(`Błąd walidacji: ${error.message}`);
      });
  };

  return (
    <Flex vertical gap={32}>
      <Form
        onFinish={submit}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            form.submit();
          }
        }}
        form={form}
        layout={'vertical'}
        variant={'underlined'}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: 'filled' }}
      >
        <Form.Item
          label='Imię'
          name='firstName'
          rules={[{ required: true, message: 'Proszę wpisać imię.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Nazwisko'
          name='lastName'
          rules={[{ required: true, message: 'Proszę wpisać nazwisko.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Proszę wpisać e-mail.' },
            { type: 'email', message: 'Proszę wpisać poprawny adres e-mail.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={form.submit}>Zapisz Zamówienie</Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Flex>
  );
};
