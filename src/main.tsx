import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LegalNewsAndResources from './components/LegalNewsAndResources';
import Resources from './components/Resources';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <LegalNewsAndResources />
      <Resources />
    </App>
  </StrictMode>,
)
