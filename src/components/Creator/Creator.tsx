import { Content } from '../layout/Content/Content.tsx';
import { Button } from 'antd';

import './Creator.scss';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Category } from '../../types/category.interface.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const Creator = () => {
  const { data: dataCategory } = useGetQuery<Category[]>('categories');
  const [firstCategory, setFirstCategory] = useState<Category | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    if (dataCategory && dataCategory.length > 0)
      setFirstCategory(dataCategory.sort((a, b) => a.position - b.position)[0]);
    else setFirstCategory(null);
  }, [dataCategory]);

  if (!firstCategory) return <div>Loading...</div>;

  return (
    <Content
      title={'Kreator Konfiguracji'}
      subtitle={'Skonfiguruj samochód swoich marzeń'}
    >
      <div className={'description'}>
        <p>
          Witaj w kreatorze konfiguracji. Tutaj znajdziesz wszystko, czego
          potrzebujesz, aby stworzyć samochód swoich marzeń.
        </p>
        <p>
          Naciśnij <strong>Rozpocznij</strong>, aby zanurzyć się w proces
          konfiguracji auta dopasowanego do Twoich potrzeb i upodobań.
        </p>
      </div>
      <div className={'button-start-div'}>
        <Button onClick={() => navigation(firstCategory?.identifier)}>
          Rozpocznij
        </Button>
      </div>
    </Content>
  );
};
