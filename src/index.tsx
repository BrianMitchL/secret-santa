import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@exampledev/new.css';
import 'typeface-inter';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('no element with id of "root"');
}
