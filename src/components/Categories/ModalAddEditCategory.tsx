import { ModalMy } from '../addons/ModalMy/ModalMy.tsx';
import { Flex, Form, FormInstance, Input } from 'antd';
import { Category } from '../../types/category.interface.ts';

interface Props {
  isOpen: boolean;
  submit: (formData: Category) => void;
  reset: () => void;
  form: FormInstance<Category>;
  categoryData: Category[];
}

export const ModalAddEditCategory = ({
  isOpen,
  submit,
  form,
  categoryData,
  reset,
}: Props) => {
  return (
    <ModalMy
      isModalOpen={isOpen}
      title={'Dodaj Kategorię'}
      content={
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
              label='Nazwa kategorii'
              name='name'
              rules={[
                { required: true, message: 'Nazwa kategorii jest wymagana' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Unikalny Identyfikator'
              name='identifier'
              rules={[
                {
                  required: true,
                  message: 'Identyfikator kategorii jest wymagany',
                },
                {
                  validator: (_, value) => {
                    if (
                      categoryData?.some(
                        (category) =>
                          category.identifier === value &&
                          category.id !== form.getFieldValue('id')
                      )
                    ) {
                      return Promise.reject(
                        new Error(
                          'Kategoria z takim identyfikatorem już istnieje'
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Flex>
      }
      handleCancel={() => reset()}
      handleOk={form.submit}
    />
  );
};
