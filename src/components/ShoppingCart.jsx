import { useReducer } from 'react'
import { shoppingReducer, shoppingInitialState } from '../reducers/shoppingReducer'
import ProductItem from './ProductItem'
import CartItem from './CartItem'
import { TYPES } from '../actions/shoppingActions'

const ShoppingCart = () => {
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
    const { products, cart } = state

    const addToCart = (id) => {
        dispatch({ type: TYPES.ADD_TO_CART, payload: id })
    }

    const delFromCart = () => { }

    const clearCart = () => { }
    return (
        <div>
            <h2>Carrito de Compras</h2>
            <h3>Productos</h3>
            <article className="box grid-responsive">
                {products.map((product) => <ProductItem key={product.id} data={product} addToCart={addToCart} />)}
            </article>
            <h3>Carrito</h3>
            <article className="box" style={{ display: "flex" }}>
                {cart.map((item, index) => <CartItem key={index} data={item} delFromCart={delFromCart} />)}
                <button onClick={clearCart}>Limpiar Carrito</button>
            </article>
        </div>
    )
}

export default ShoppingCart