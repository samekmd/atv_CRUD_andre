import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'

import LandPage from './pages/landPage/landPage'
import Login from './pages/login/login'
import Products from './pages/products/products'

function App() {
  

  return (
    <>
      <Routes>
            <Route path='/' element={<LandPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/products' element={<Products/>}/>
      </Routes>
    </>
  )
}

export default App
