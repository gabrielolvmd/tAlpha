import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../components/Home'
import { RegisterAccount } from '../components/RegisterAccount'
import { ProductsList } from '../components/ProductsList'
import { AddProduct } from '../components/AddProduct'
import { DeleteProduct } from '../components/DeleteProduct'
import { UpdateProduct } from '../components/UpdateProduct'
import { ProductDetails } from '../components/ProductDetails'

export const Rotas = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/RegisterAccount' element={<RegisterAccount/>}/>
                <Route path='/ProductsList' element={<ProductsList/>}/>
                <Route path='/AddProduct' element={<AddProduct/>}/>
                <Route path='/DeleteProduct/:id' element={<DeleteProduct/>}/>
                <Route path='/UpdateProduct/:id' element={<UpdateProduct/>}/>
                <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
            </Routes>
        </Router>
    </div>
  )
}
