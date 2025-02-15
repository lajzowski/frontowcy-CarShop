import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface Props {
  toolTip: string;
  onClick: () => void;
}

export const ButtonEdit = (props: Props) => {
  return (
    <Tooltip title={props.toolTip}>
      <Button shape='circle' onClick={props.onClick} icon={<EditOutlined />} />
    </Tooltip>
  );
};
