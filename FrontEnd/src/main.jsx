import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import GeralPost from './pages/GeralPost.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GeralPost />
  </StrictMode>,
);
