import { UpOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

interface Props {
  toolTip: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ButtonUp = (props: Props) => {
  return (
    <Tooltip title={props.toolTip}>
      <Button
        onClick={props.onClick}
        shape='circle'
        icon={<UpOutlined />}
        disabled={props.disabled}
      />
    </Tooltip>
  );
};
