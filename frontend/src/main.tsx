import './index.css';
import { StrictMode } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { router } from './app/router/routes';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import { StyledEngineProvider } from '@mui/material/styles';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </StrictMode>,
)
