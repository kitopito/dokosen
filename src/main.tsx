import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import DetailPage from "./pages/DetailPage.tsx"
import Home from './pages/Home.tsx'
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "detail/",
    element: <DetailPage></DetailPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
