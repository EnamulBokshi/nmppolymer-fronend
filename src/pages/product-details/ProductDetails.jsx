import React from 'react'
import {Boilerplate} from '..'
import { useParams } from 'react-router-dom'

function ProductDetails() {
  const { id } = useParams();
 
  return (
    <Boilerplate >
      <div className="container">
        <h1>Product Details</h1>
        <p>Product ID: {id}</p>
      </div>
    </Boilerplate>
  )
}

export default ProductDetails