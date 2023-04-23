import React from 'react'

const CartItem = ({ data, delFromCart }) => {
    let { id, name, price } = data;
    return (
        <div style={{ border: "thin solid gray", padding: "1rem" }}>
            <h4>{name}</h4>
            <h5>${price}.00</h5>
            <button onClick={() => delFromCart(id)}>Eliminar</button>
            <button>Eliminar Todos</button>
        </div>
    )
}

export default CartItem