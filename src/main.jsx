

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Cart from './Components/Cart.jsx'
import Home from './Components/Home.jsx'
import Orders from './Components/Orders.jsx'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import ResetPasswordPage1 from './Components/ResetPasswordPage1.jsx'
import ResetPassword from './Components/ResetPassword.jsx'
import Contact from './Components/Contact.jsx'
import ProductDetails from './Components/ProductDetails.jsx'
import PersonalDetails from './Components/PersonalDetails.jsx'


const router=createBrowserRouter([
                    {
                            path:"/" ,
                            element:<Login/>
                    },
                    {
                        path:"/register",
                        element:<Register />
                    },{
                        path:"/resetpassword",
                        element:<ResetPasswordPage1 />
                    },
                    {
                        path:"/resetpassword/:email",
                        element:<ResetPassword />
                    },
                    {
                     path:"/App",
                    element:<App />,
                    children:[{
                        path:"",
                        element:<Home/>
                    },
                        {
                        
                            path:"cart",
                            element:<Cart />
                        
                    },
                    {
                            path:"personalDetails",
                            element:<PersonalDetails/>
                    },
                    {
                        path:"orders",
                        element:<Orders/>
                    },
                    {
                        path:"contact",
                        element:<Contact/>
                    }
                ]
                
                }
            
    
])

createRoot(document.getElementById('root')).render(

 <RouterProvider router={router} />
)
