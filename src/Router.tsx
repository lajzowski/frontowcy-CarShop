import { Route, Routes } from 'react-router';
import { Dashboard } from './components/layout/Dashboard/Dashboard.tsx';
import { NotFound } from './components/layout/NotFound/NotFound.tsx';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import { ButtonChangeStyle } from './components/ButtonChangeStyle.tsx';
import { Categories } from './components/Categories/Categories.tsx';
import { Content } from './components/layout/Content/Content.tsx';
import { OneCategoryTable } from './components/Categories/OneCategoryTable.tsx';

export const Router = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
};
