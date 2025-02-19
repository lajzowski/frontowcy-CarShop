import { Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';

const { Header, Content, Footer } = Layout;

import './Dashboard.scss';
import { useEffect } from 'react';

export const Dashboard = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = token.colorBgContainer; // Zmiana koloru tła
    body.style.color = token.colorText; // Zmiana koloru tekstu
  }, [token]);
  return (
    <Layout
      className={'container'}
      style={{ background: token.colorBgContainer }}
    >
      <Header className={'header'}>
        <div className={'logo'}>Frontowcy CarShop</div>

        <Menu
          mode='horizontal'
          defaultSelectedKeys={[`${location.pathname.split('/')[1]}`]}
          className={'menu'}
        >
          <Menu.Item key='categories' onClick={() => navigate('/categories')}>
            Kategorie
          </Menu.Item>
          <Menu.Item onClick={() => navigate('/creator')} key='creator'>
            Kreator
          </Menu.Item>
          <Menu.Item onClick={() => navigate('/orders')} key='orders'>
            Zamówienia
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ background: token.colorBgContainer }}>
        CarShop - 2025
      </Footer>
    </Layout>
  );
};
