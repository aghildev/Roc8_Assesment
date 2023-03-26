import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import Cart from "./components/Cart";
import ProductDetails from './components/ProductDetail';



const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<Error/>,
    children: [
      {
        path: "/",
        element: <Body/>,
      },
      {
        path: '/products/:id',
        element: <ProductDetails />

      },
      {
        path: "/cart",
        element: <Cart/>,
     
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
