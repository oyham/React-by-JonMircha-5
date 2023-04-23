import React, { useReducer } from 'react'
import { shoppingInitialState, shoppingReducer } from '../reducers/shoppingReducer'
import ProductItem from './ProductItem'

const ShoppingCart = () => {
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
    const { products, cart } = state

    const addToCart = (id) => {
        console.log(id)
    }

    const delFromCart = () => { }

    const clearCart = () => { }
    return (
        <div>
            <h2>Carrito de Compras</h2>
            <h3>Productos</h3>
            <artice className="box grid-responsive">
                {products.map((product) => <ProductItem key={products.id} data={product} addToCart={addToCart} />)}
            </artice>
            <h3>Carrito</h3>
            <artice className="box"></artice>
        </div>
    )
}

export default ShoppingCart