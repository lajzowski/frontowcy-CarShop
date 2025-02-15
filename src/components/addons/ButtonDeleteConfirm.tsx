import { Button, Popconfirm, Tooltip } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

interface Props {
  confirmTitle: string;
  confirmText: string;
  toolTip: string;
  confirm: () => void;
  cancel?: () => void;
}

export const ButtonDeleteConfirm = (props: Props) => {
  return (
    <Popconfirm
      title={props.confirmTitle}
      description={props.confirmText}
      onConfirm={props.confirm}
      onCancel={props.cancel ? props.cancel : undefined}
      okText='Tak'
      cancelText='Nie'
    >
      <Tooltip title={props.toolTip}>
        <Button shape='circle' icon={<DeleteOutlined />} />
      </Tooltip>
    </Popconfirm>
  );
};
