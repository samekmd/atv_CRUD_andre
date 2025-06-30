import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'

import LandPage from './pages/landPage/landPage'
import Login from './pages/login/login'
import Products from './pages/products/products'
import Sales from './pages/sales/sales'
import User from './pages/user/user'
import PrivateRoute from './middlewares/privateRoute'
import PrivateAdminRoute from './middlewares/privateAdminRoute'
import ResetPassword from './pages/resetPassword/resetPassword'

function App() {
  

  return (
    <>
      <Routes>
        
            <Route path='/' element={<LandPage/>}/>
            
            <Route path='/login' element={<Login/>}/>

            <Route path='/products' element={
                  <PrivateRoute>
                      <Products/>
                  </PrivateRoute>
            }/>
            <Route path='/sales' element={
               <PrivateRoute>
                      <Sales/>
                  </PrivateRoute>
              
            }/>
            
            <Route path='/admin-config' element={
              
               <PrivateAdminRoute>
                      <User/>
               </PrivateAdminRoute>
              
            }/>


            <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </>
  )
}

export default App
