import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { DataProvider, NuqsProvider, ThemeProvider } from './providers';
import { App } from '.';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <NuqsProvider>
        <DataProvider>
          <Toaster position="top-right" richColors />
          <App />
        </DataProvider>
      </NuqsProvider>
    </ThemeProvider>
  </StrictMode>,
);
