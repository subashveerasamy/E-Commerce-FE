

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Cart from './Components/Cart.jsx'
import Home from './Components/Home.jsx'

const router=createBrowserRouter([
    
                {
                    path:"/",
                    element:<App />,
                    children:[{
                        path:"/",
                        element:<Home/>
                    },
                        {
                        
                            path:"/cart",
                            element:<Cart />
                        
                    }]
                
                }
            
    
])

createRoot(document.getElementById('root')).render(

 <RouterProvider router={router} />
)
