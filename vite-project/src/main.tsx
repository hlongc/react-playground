import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Editor from './Editor';
// import './index.css'

createRoot(document.getElementById('root')!).render(
  <Editor />,
)
