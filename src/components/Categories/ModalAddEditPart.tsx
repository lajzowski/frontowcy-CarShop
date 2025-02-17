import { ModalMy } from '../addons/ModalMy/ModalMy.tsx';
import { Flex, Form, FormInstance, Input } from 'antd';
import { Equipment } from '../../types/equipment.interface.ts';

interface Props {
  isOpen: boolean;
  submit: (formData: Equipment) => void;
  reset: () => void;
  form: FormInstance<Equipment>;
  partData: Equipment[];
}

export const ModalAddEditPart = ({
  isOpen,
  submit,
  form,
  partData,
  reset,
}: Props) => {
  return (
    <ModalMy
      isModalOpen={isOpen}
      title={'Dodaj Część'}
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
              label='Nazwa Części'
              name='name'
              rules={[
                { required: true, message: 'Nazwa części jest wymagana' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Unikalny Identyfikator'
              name='partUnique'
              rules={[
                {
                  required: true,
                  message: 'Identyfikator części jest wymagany',
                },
                {
                  validator: (_, value) => {
                    if (
                      partData?.some(
                        (part) =>
                          part.partUnique === value &&
                          part.id !== form.getFieldValue('id')
                      )
                    ) {
                      return Promise.reject(
                        new Error('Część z takim identyfikatorem już istnieje')
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Cena'
              name='price'
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]+(\.[0-9]+)?$/,
                  message:
                    'Cena musi być liczbą. Może zawierać część dziesiętną oddzieloną kropką',
                },
              ]}
            >
              <Input
                type='text'
                onChange={(event) => {
                  const value = event.target.value;
                  form.setFieldValue(
                    'price',
                    value ? parseFloat(value) : undefined
                  );
                }}
              />
            </Form.Item>
          </Form>
        </Flex>
      }
      handleCancel={() => reset()}
      handleOk={form.submit}
    />
  );
};
