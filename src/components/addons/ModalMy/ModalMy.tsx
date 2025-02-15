import './ModalMy.scss';
import { Modal } from 'antd';
import { ReactNode } from 'react';

import './ModalMy.scss';

interface Props {
  title: string;
  content: ReactNode;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const ModalMy = ({
  isModalOpen,
  handleOk,
  handleCancel,
  content,
  title,
}: Props) => {
  return (
    <Modal
      okText={'Zapisz'}
      cancelText={'Anuluj'}
      destroyOnClose={true}
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className={'modal--content'}>{content}</div>
    </Modal>
  );
};
