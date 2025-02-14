import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import { BrowserRouter } from 'react-router';
import { Router } from './Router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);
