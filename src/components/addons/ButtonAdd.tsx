import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface Props {
  toolTip: string;
  onClick: () => void;
  value: string;
}

export const ButtonAdd = (props: Props) => {
  return (
    <Tooltip title={props.toolTip}>
      <Button onClick={props.onClick} shape='default' icon={<PlusOutlined />}>
        {props.value}
      </Button>
    </Tooltip>
  );
};
