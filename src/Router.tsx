import { Route, Routes } from 'react-router';
import { Dashboard } from './components/layout/Dashboard/Dashboard.tsx';
import { NotFound } from './components/layout/NotFound/NotFound.tsx';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import { ButtonChangeStyle } from './components/ButtonChangeStyle.tsx';
import { Categories } from './components/Categories/Categories.tsx';
import { Content } from './components/layout/Content/Content.tsx';
import { OneCategoryTable } from './components/Categories/OneCategoryTable.tsx';
import { Creator } from './components/Creator/Creator.tsx';
import { CreatorTable } from './components/Creator/CreatorTable.tsx';
import { CreatorSummary } from './components/Creator/CreatorSummary.tsx';
import { Orders } from './components/Orders/Orders.tsx';
import { OrderOne } from './components/Orders/OrderOne.tsx';

const systemPrefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;

export const Router = () => {
  const [isDarkMode, setIsDarkMode] = useState(systemPrefersDark);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm, // Wybór motywu
      }}
    >
      <ButtonChangeStyle
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route
            path={'/categories'}
            element={
              <Content
                title={'Kategoria'}
                subtitle={'Wybierz kategorię wyposażenia dodatkowego'}
              >
                <Categories />
              </Content>
            }
          />

          <Route
            path={'/categories/:identifier'}
            element={<OneCategoryTable />}
          />

          <Route path={'/creator'} element={<Creator />}></Route>
          <Route path={'/creator/summary'} element={<CreatorSummary />}></Route>
          <Route path={'/creator/:identifier'} element={<CreatorTable />} />

          <Route path={'/orders'} element={<Orders />}></Route>
          <Route path={'/orders/:id'} element={<OrderOne />}></Route>

          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
