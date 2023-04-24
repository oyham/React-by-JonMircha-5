const CartItem = ({ data, delFromCart }) => {
    let { id, name, price, quantity } = data;
    return (
        <div style={{ border: "thin solid gray", padding: "1rem" }}>
            <h4>{name} {quantity===1 ? "" : `X${quantity}`}</h4>
            <h5>Total a pagar: ${price * quantity}.00</h5>
            <button onClick={() => delFromCart(id)}>Eliminar</button>
            <button onClick={() => delFromCart(id,true)}>Eliminar Todos</button>
        </div>
    )
}

export default CartItem