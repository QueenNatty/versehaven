import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'

import { PoemsProvider } from './context/PoemsContext.jsx'  // ← Add this
import App from './App.jsx'
import WritePage from './pages/WritePage.jsx'
import LyraPage from './pages/LyraPage.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/write', element: <WritePage /> },
  { path: '/lyra', element: <LyraPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PoemsProvider>  {/* ← Wrap here */}
      <RouterProvider router={router} />
    </PoemsProvider>
  </React.StrictMode>
)