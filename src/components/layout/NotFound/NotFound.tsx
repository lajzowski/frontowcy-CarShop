import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status='404'
      title='404'
      subTitle='Przepraszamy, strona, którą odwiedziłeś, nie istnieje.'
      extra={
        <Button type='primary' onClick={() => navigate('/')}>
          Wróć do strony głównej
        </Button>
      }
    />
  );
};
