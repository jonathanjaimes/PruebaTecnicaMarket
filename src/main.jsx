import React from 'react'
import ReactDOM from 'react-dom/client'
import Principal from './pages/Principal.jsx';
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Principal />,
  },
  {
    path: "casa",
    element: <p>Casasss</p>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
