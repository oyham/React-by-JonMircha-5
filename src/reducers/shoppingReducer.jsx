import { TYPES } from "../actions/shoppingActions";

export const shoppingInitialState = {
    products: [
        {
            id: 1, name: "Producto 1", price: 100,
        },
        {
            id: 2, name: "Producto 2", price: 200,
        },
        {
            id: 3, name: "Producto 3", price: 300,
        },
        {
            id: 4, name: "Producto 4", price: 400, 
        },
        {
            id: 5, name: "Producto 5", price: 500, 
        },
        {
            id: 6, name: "Producto 6", price: 600, 
        },
    ],
    cart: [

    ]
}

export function shoppingReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_TO_CART: {
            let newItem = state.products.find(
                (product) => product.id === action.payload
            )

            let itemInCart = state.cart.find((item) => item.id === newItem.id)

            return itemInCart
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === newItem.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                } : {
                    ...state,
                    cart: [...state.cart, { ...newItem, quantity: 1 }]
                }
        }

        /* case TYPES.ADD_TO_CART: {
            const productId = action.payload;
            const productToAdd = state.products.find(product => product.id === productId);
            const itemIndex = state.cart.findIndex(item => item.id === productId);

            if (itemIndex !== -1) {
                // El producto ya se encuentra en el carrito, incrementar la cantidad
                const updatedCart = [...state.cart];
                updatedCart[itemIndex].quantity += 1;
                updatedCart[itemIndex].quantity -= .5;
                console.log(updatedCart)
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                // El producto no se encuentra en el carrito, agregar con cantidad 1
                const newItem = { ...productToAdd, quantity: 1 };
                return {
                    ...state,
                    cart: [...state.cart, newItem]
                };
            }
        } */
        case TYPES.REMOVE_ONE_FROM_CART: {
            const productId = action.payload;
            const itemIndex = state.cart.findIndex(item => item.id === productId)
            if (itemIndex >= 0) {
                const updatedCart = [...state.cart];
                if (updatedCart[itemIndex].quantity > 1) {
                    // El producto se encuentra más de una vez en el carrito, reducir la cantidad
                    updatedCart[itemIndex].quantity -= 1;
                    updatedCart[itemIndex].quantity += .5;
                } else {
                    // El producto se encuentra una sola vez en el carrito, eliminarlo
                    updatedCart.splice(itemIndex, 1);
                }
                return {
                    ...state,
                    cart: updatedCart
                };
            }
            return state;
        }
        case TYPES.REMOVE_ALL_FROM_CART: {
            const productId = action.payload;
            const itemIndex = state.cart.findIndex(item => item.id === productId);
            if (itemIndex >= 0) {
                const updatedCart = [...state.cart];
                const productsToRemove = updatedCart.filter(item => item.id === productId);
                productsToRemove.forEach(product => updatedCart.splice(updatedCart.indexOf(product), 1));
                return {
                    ...state,
                    cart: updatedCart
                };
            }
            return state;
        }
        case TYPES.CLEAR_CART: {
            return {
                ...state,
                cart: []
            }
        }
        default:
            return state
    }
}
