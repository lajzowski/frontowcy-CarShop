import './Content.scss';
import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const Content = ({ children, title, subtitle }: Props) => {
  return (
    <main className={'main'}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <div className={'content'}>{children}</div>
    </main>
  );
};
