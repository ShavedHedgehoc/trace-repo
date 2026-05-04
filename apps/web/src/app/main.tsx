import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { DataProvider, NuqsProvider, ThemeProvider } from './providers';
import { App } from '.';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsProvider>
      <ThemeProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ThemeProvider>
    </NuqsProvider>
  </StrictMode>,
);
