import React from 'react'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  let { productId } = useParams();
  return (
    <div>{productId}</div>
  )
}

export default ProductDetails