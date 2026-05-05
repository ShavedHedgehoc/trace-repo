import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { DataProvider, NuqsProvider, ThemeProvider } from './providers';
import { App } from '.';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <NuqsProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </NuqsProvider>
    </ThemeProvider>
  </StrictMode>,
);
