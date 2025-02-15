import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './styles.scss';
import { BrowserRouter } from 'react-router';
import { Router } from './Router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
