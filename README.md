# 84. Reducers Introducción
useReducer es un hook que nos permite de una menra mas eficiente el estado a comparación de useState. Cuando nuestro estado se vuelva más complejo, se recomienda migrar de useState a useReducer. Esto va a servir para Apps de mediana complejidad. Siendo esta una alternativa a librerias como Redux. 

Reducer es una función PURA, siendo esta una funcion que devuelve un valor, y toda la lógica que esta en el cuerpo de la función es capaz de resolver un solo procesamiento. No afectara a cosas externas ni generara efectos secundarios interna y externamente. Siempre retornera un valor siendo esta el estado de nuestra App, y no se podrá crear efectos en las funciones reductoras (useEffect) ni peticiones asíncronas. 
Creamos un Contador con useState. 

Luego llamamos al Snippet useReducer: `const [state, dispatch] = useReducer(first, second, third)`. Primero se destructura la vde (se suguiere que sea un objeto), la función que va a despachar la actualización. 

- first: la función reductora, definida fuera del componente.
- second: valor de estado inicial (initialState). Se suguiere que sea un Objeto.
- third: una función que nos permite una transformación al estado inicial. Opcional. 

la función reductora recibira dos params: el estado anterior, y un objeto llamado action, que internamente tendrá un tipo de acción que se va a ejecutar, y adicionalmente podra tener un valor que estaremos mandando para que modifique el estado.

### `<p>Contador en: {state.contador}</p>`
Para mostrar correctamente el estado del contador ingresamos al valor correspondiente con la connotación del . ya que inicialmente utilizamos un initialState tipo Objeto.

La función reductora se acostumbra a usar switch-case, aunque se podria usar ifs... etc. 

La acción que vamos a evaluar en nuestro switch-case será la acción... y la action debe de ser definida, para eso utilizaremos "type". Y para hacer uso del reducer, necesitamos el 'dispatch', diciendo que el action es un objeto, que en su prop type va a recibir la acción de "INCREMENTAR" O "DECREMENTAR".
```js
const initialState = { contador: 0 }

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { contador: state.contador + 1 }
        case "DECREMENT":
            return { contador: state.contador - 1 }
        // break; no necesitamos el break ya que no necesitamos romper la estructura.
        default:
            return state;
    }
}
const Contador = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const sumar = () => dispatch({ type: "INCREMENT" })
    const restar = () => dispatch({ type: "DECREMENT" })

        <h3>Con useReducer</h3>
        <div className="useReducer">
            <button onClick={sumar}>+</button>
            <button onClick={restar}>-</button>
            <p>Contador en: {state.contador}</p>
        </div>
```
# 85. Reducers Hook useReducer
Los case en MAYUSCULAS estan así por que se consideran constantes que nunca van a cambiar. La buena práctica es que tengamos un objeto que tenga las diferentes acciones que nuestra función va a tener para luego poder acceder a ellas a través de la connotación del "." a la hora de utilizar una función con nuestro dispatch.

### Payload: dato que pasamos mediante el dispatch a la función reductora para que modifique el estado.
```js
case TYPES.INCREMENT_5:
    return { contador: state.contador + action.payload }
    ...
const sumar5 = () => dispatch({ type: TYPES.INCREMENT_5, payload: 5 })
```
Contador.jsx:
```js
import { useState, useReducer } from "react"

const initialState = { contador: 0 }

const TYPES = {
    INCREMENT: "INCREMENT",
    INCREMENT_5: "INCREMENT_5",
    DECREMENT: "DECREMENT",
    DECREMENT_5: "DECREMENT_5",
    RESET: "RESET",
}

function reducer(state, action) {
    switch (action.type) {
        case TYPES.INCREMENT:
            return { contador: state.contador + 1 }
        case TYPES.DECREMENT:
            return { contador: state.contador - 1 }
        case TYPES.INCREMENT_5:
            return { contador: state.contador + action.payload }
        case TYPES.DECREMENT_5:
            return { contador: state.contador - action.payload }
        case TYPES.RESET:
            return initialState
        default:
            return state;
    }
}

const Contador = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const sumar = () => dispatch({ type: TYPES.INCREMENT })
    const restar = () => dispatch({ type: TYPES.DECREMENT })
    
    const sumar5 = () => dispatch({ type: TYPES.INCREMENT_5, payload: 5 })
    const restar5 = () => dispatch({ type: TYPES.DECREMENT_5, payload: 5 })

    const reset = () => dispatch({type: TYPES.RESET})

    return <>
        <h3>Con useReducer</h3>
        <div className="useReducer">
            <button onClick={restar5}>-5</button>
            <button onClick={restar}>-</button>
            <button onClick={reset}>0</button>
            <button onClick={sumar}>+</button>
            <button onClick={sumar5}>+5</button>
            <p>Contador en: {state.contador}</p>
        </div>
    </>
}

export default Contador
```
---
# 86. Reducers. Estructura de Archivos
Para que va a servir el 3er parametro del reducer? Para cambiar el valor del segundo parámetro.

Llamaremos al tercer valor "init". Lo declaramos como constante bajo el "initialState", hará uso de este y retornará la prop que tenga dentro más el nuevo valor a asignar: 
```js
const init = (initialState) => {
    return {
        contador: initialState.contador + 100,
    }
...
const [state, dispatch] = useReducer(reducer, initialState, init)    
```
Recordar ingresar al valor "contador" con la connotación del "." ya que nuestro estado inicial es un objeto. Al precionar el botón de 0, el contador volverá a su estado inicial 0, ya que "init" sólo sirve cuando se *monta* el componente.

Ahora duplicaremos `Contador.jsx` hacia `ContadorMejorado.jsx` para mejorar su estructura. Tener una carpeta para las acciones y otra para los reductores: `actions / reducers`. Jon utiliza lowerCamelCase pero también es valido un "contador.reducer.jsx" en este caso... otra manera es crear una carpeta llamada ContadorReducer y dentro poseer un "index.jsx". También creamos `contadorActions.jsx`.

En el archivo `contadorReducer` nos llevaremos la funcion reductora, el estado inicial y el init... no olvidar de exportar las 2 constantes y la función. Tambien necesitamos importar el `contadorActions` que devolverá la const TYPES. Todas las exportaciones no deben de ser por default. 

ContadorMejorado:
```js
import { useReducer } from "react"
import { contadorReducer, contadorInitialState, contadorInit } from "../reducers/contadorReducer"
import { TYPES } from "../actions/contadorActions"

const ContadorMejorado = () => {
    const [state, dispatch] = useReducer(contadorReducer, contadorInitialState, contadorInit)

    const sumar = () => dispatch({ type: TYPES.INCREMENT })
    const restar = () => dispatch({ type: TYPES.DECREMENT })
    const sumar5 = () => dispatch({ type: TYPES.INCREMENT_5, payload: 5 })
    const restar5 = () => dispatch({ type: TYPES.DECREMENT_5, payload: 5 })
    const reset = () => dispatch({type: TYPES.RESET})

    return <>
        <h3>Contador Mejorado Reducer</h3>
        <div className="useReducer">
            <button onClick={restar5}>-5</button>
            <button onClick={restar}>-</button>
            <button onClick={reset}>0</button>
            <button onClick={sumar}>+</button>
            <button onClick={sumar5}>+5</button>
            <p>Contador en: {state.contador}</p>
        </div>
    </>
}

export default ContadorMejorado
```
contadorReducer.jsx:
```js
import { TYPES } from "../actions/contadorActions"

export const contadorInitialState = { contador: 0 }

export const contadorInit = (initialState) => {
    return {
        contador: initialState.contador + 100,
    }
}

export function contadorReducer(state, action) {
    switch (action.type) {
        case TYPES.INCREMENT:
            return { contador: state.contador + 1 }
        case TYPES.DECREMENT:
            return { contador: state.contador - 1 }
        case TYPES.INCREMENT_5:
            return { contador: state.contador + action.payload }
        case TYPES.DECREMENT_5:
            return { contador: state.contador - action.payload }
        case TYPES.RESET:
            return contadorInitialState
        default:
            return state;
    }
}
```
contadorActions.jsx
```js
export const TYPES = {
    INCREMENT: "INCREMENT",
    INCREMENT_5: "INCREMENT_5",
    DECREMENT: "DECREMENT",
    DECREMENT_5: "DECREMENT_5",
    RESET: "RESET",
}
```
Esta es la manera correcta para trabajar los Reducers.

---
# 87. Carrito de Compras con Reducers (1/5)
Creación de archivos `ShoppingCart, shoppingActions y shoppingReducers .jsx`. Comenzamos programando shoppingActions para crear las diferentes acciones que el usuario va a poder realizar en el carrito de compras. Esto es una buena practica ya que comenzar pensando en las futuras posibilidades que le daremos al usuario y empezar programando dichas acciones nos dará un mejor flujo de desarrollo.

ShoppingCart.jsx:
```js
import React from 'react'

const ShoppingCart = () => {
    return (
        <div>
            <h2>Carrito de Compras</h2>
            <h3>Productos</h3>
            <artice className="box"></artice>
            <h3>Carrito</h3>
            <artice className="box"></artice>
        </div>
    )
}

export default ShoppingCart
```
shopingReducer.jsx:
```js
import { TYPES } from "../actions/shoppingActions";

export const shoppingInitialState = {
    products: [
        {
            id: 1, name: "Producto 1", price: 100
        },
        {
            id: 2, name: "Producto 2", price: 200
        },
        {
            id: 3, name: "Producto 3", price: 300
        },
        {
            id: 4, name: "Producto 4", price: 400
        },
        {
            id: 5, name: "Producto 5", price: 500
        },
        {
            id: 6, name: "Producto 6", price: 600
        },
    ],
    cart: []
}

export function shoppingReducer(state, action) {
    switch (action.type) {
        case TYPES.ADD_TO_CART: {

        }
        case TYPES.REMOVE_ONE_FROM_CART: {

        }
        case TYPES.REMOVE_ALL_FROM_CART: {

        }
        case TYPES.CLEAR_CART: {

        }
        break
        default:
            return state
    }
}
```
shoppingActions.jsx:
```js
export const TYPES = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_ONE_FROM_CART: "REMOVE_ONE_FROM_CART",
    REMOVE_ALL_FROM_CART: "REMOVE_ALL_FROM_CART",
    CLEAR_CART: "CLEAR_CART",
}
```
---
# 88. Carrito de Compras con Reducers (2/5)
Creamos la variable de estado  con useReducer, importando asi la función reductora y el objeto de estado inicial.
Para poder renderizar los productos creamos un componente `ProductItem.jsx`. Destructurara la *"data"* que sería el id, el nombre y el precio, además de un metodo que tendremos en ShoppingCart que permita agregarlo al carrito.
La propiedad "addToCart" se definirá en nuestro ShoppingCart. Destructuramos el estado inicial de state y creamos las funciones necesarias para añadir, remover y limpiar el carrito.

En nuestro article con la clase "box" es donde renderizaremos los productos. Para ello realizaremos un mapeo de la prop product que es la que destructuramos del estado inicial previamente, y por cada mapeo iremos llamando a nuestro componente `<ProducItem />`, y pasaremos como props la key, la data y la función addToCart.

Ahora en ProductItem destructuraremos la data siendo esta id, name, y price. Devolvera un h4 con el nombre, un h5 con el precio y por ultimo un botón que en su onClick desplegará la función de addToCart ¿Pero cómo sabe que elemento añadir al carrito? Bueno, para eso tenemos el *id*, y haremos uso de una "Arrow Function Callback" o "Callback de función de flecha". 

#### Diferencias entre utilizar 'onClick={()=>addToCart(id)}' o 'onClick={addToCart}':
**En ReactJS, el primer método onClick={()=>addToCart(id)} se llama "Arrow Function Callback" o "Callback de función de flecha". En este caso, se crea una nueva función de flecha cada vez que se renderiza el componente, lo que permite pasar argumentos adicionales a la función.**

**Por otro lado, el segundo método onClick={addToCart} se llama "Function Reference Callback" o "Callback de referencia de función". En este caso, se pasa una referencia directa a la función sin pasar ningún argumento adicional, por lo que la función debe tener acceso al valor correcto del argumento id para realizar la tarea deseada.**

__Ambos métodos son comunes en la programación con ReactJS y se utilizan para manejar eventos como clics de botón, cambios en formularios, entre otros. La elección del método depende de la necesidad específica de cada caso.__

ProductItem.jsx:
```js
import React from 'react'

const ProductItem = ({ data, addToCart }) => {
    let { id, name, price } = data
    return (
        <div style={{ border: "thin solid gray", padding: "1rem" }}>
            <h4>{name}</h4>
            <h5>${price}.00</h5>
            <button onClick={() => addToCart(id)}>Agregar</button>
        </div>
    )
}

export default ProductItem
```
ShoppingCart.jsx:
```js
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
    ...
            <artice className="box grid-responsive">
                {products.map((product) => <ProductItem key={products.id} data={product} addToCart={addToCart} />)}
            </artice>
```
Añadimos algo de CSS para los productos.

---
# 89. Carrito de Compras con Reducers (3/5)
Creamos el componente CartItem que se encargará de reenderizar los productos que iremos añadiendo a nuestro carrito. En nuestro segundo article en nuestro ShoppingCart rendeerizamos dicho CartItem con un map de cada item e index. Pasara como prop la key, la data y delFromData para que cada producto posea dicha función. Abajo del article creamos un botón que llamará a la función de limpiar el carrito.

Luego de esto pasico, nos vamos a la función addToCart y pasamos como parametro el *id* si es que no lo habian pasado previamente para hacer uso del dispatch, justamente en su payload pasaremos el ID. En nuestro case ADD_TO_CART primero debemos de buscar el id en la lista de nuestros productos y guardarlo en una variable.

Creamos la let newItem y le diremos que acceda al estado, dentro de este tiene un arreglo llamado products, y que busque con *find*, diciendole que por cada product busque el product.id, y cuando éste sea igual a nuestro action.payload lo guarde en nuestra variable. `let newItem = state.products.find(product => product.id === action.payload)`

Ahora para que que vaya mostrando el producto que añadamos a traves de ADD_TO_CART debemos de retornar cart... la manera de Jon fue la siguiente: `return {...state, cart: [...state.cart, newItem]}`, y la mía fue: `return {...state,cart: state.cart.concat(newItem)};`. 

Luego implementaremos la UI en nuestro CartItem, destructuramos data y delFromCart. Destructuramos el id, name y price de data. Y sólo queda pintar casi igual que en ProductItem. Tambien añadiremos otro botón por si queremos añadir mas de un mismo producto.

CartItem.jsx:
```js
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
```
ShoppingCart.jsx:
```js
<h3>Carrito</h3>
    <article className="box" style={{ display: "flex" }}>
        {cart.map((item, index) => <CartItem key={index} data={item} delFromCart={delFromCart} />)}
        <button onClick={clearCart}>Limpiar Carrito</button>
    </article>
```
---
# 90. Carrito de Compras con Reducers (4/5)
#### Pude completar las funciones restantes aunque el método de Jon se ve mucho mejor.

Jon:
```js
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
```
Mio:
```js
case TYPES.ADD_TO_CART: {
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
        }
```
En el método de Jon nos ahorramos tener que poner la propiedad quantity manualmente. El se pregunta si ya existe el nuevo item en la cart y si da a verdadero le añade la prop quantity++. Si no existe se la añade de igual manera en 1.

Por mi parte la prop quantity se la tenía que añadir a todos los productos = 1 para tenerlo como referencia cuando se añadia a la cart ya poseían esa prop. Ademas de que yo poseía un error que al añadir al carrito sumaba x2 en vez de x1 y no pude encontrar solución alguna mas que hacer esto: 
```js
                updatedCart[itemIndex].quantity += 1;
                updatedCart[itemIndex].quantity -= .5;
```
Muy desprolijo. 

---
# 91. Carrito de Compras con Reducers (5/5)
Por mi parte habia implementado un *"delAllFromCart"* para que a la hora de apretar el botón de Eliminar todos, pero Jon centralizo la lógica de la eliminación de Eliminar y Eliminar todos en en *"delFromCart"*, pasando como argumentos ademas el id, un "all = false" y dentro un condicional preguntando que si es falso estamos mandando a llamar el botón de Eliminar, y si es true ejecutar el Eliminar todos.

Vamos a entender un poco la lógica que aplica Jon a:
```js
            return itemToDelete.quantity > 1 ? {
                ...state,
                cart: state.cart.map((item) => item.id === action.payload
                    ? { ...item, quantity: item.quantity - 1 }
                    : item)
            } : {}
```
Para eliminar de uno en uno es lógico preguntarnos si el item a eliminar, en su propiedad quantity que se debió de crear previamente al añadir un producto al cart, es mayor a 1. Nos copiamos el estado anterior con el spred-operator, y luego nos enfocamos en el atributo cart. Accedemos a la propiedad cart del estado, generamos un map para crear un nuevo arreglo, y le decimos que por cada item que pasemos evalua lo siguiente. Si el item del ID coresponde al action.payload entonces generamos un nuevo operador ternario. Parte verdadera, retornamos toda la información del Item, del producto en cuestion, pero modificando su propiedad quantity al valor que ya tenía previamente pero restandole uno. Caso contrario, cómo no es el item que queremos eliminar, entonces que regrese el item con toda la información que ta tenía. Esto es programación funcianl PURA.

Caso contrario:
```js
:{
    ...state,
    cart: state.cart.filter((item) => item.id === action.payload)
    }
```
Realizamos una copia del estado, y luego modificamos cart. Filtramos del state.cart, por cada item que recibe el filter, evalúa que cuando item.id sea diferente del action.payload se irá agregando al nuevo arreglo del estado, y cuando coincída, lo va a ir eliminando.

Ahora para remover todos los productos individuales realizamos esto: 
```js
        case TYPES.REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload)
            } 
        }
```
Es exactamente a el caso contrario de remove_one.

--- 
# 92. CRUD API con Reducers (1/2)
Creamos los archivos reducer y actions para nuestro crudApi. 

```js
export const TYPES = {
    CREATE_DATA: "CREATE_DATA",
    READ_ALL_DATA: "READ_ALL_DATA",
    READ_ONE_DATA: "READ_ONE_DATA",
    UPDATE_DATA: "UPDATE_DATA",
    DELETE_DATA: "DELETE_DATA",
    NO_DATA: "NO_DATA",
}
```
```js
import { TYPES } from "../actions/crudActions";

export const crudInitialState = {
    db: null
}

export function crudReducer(state, action) {
    switch (action.type) {
        case TYPES.READ_ALL_DATA: {
            return null
        }
        case TYPES.CREATE_DATA: {
            return null
        }
        case TYPES.READ_ONE_DATA: {
            return null
        }
        case TYPES.UPDATE_DATA: {
            return null
        }
        case TYPES.DELETE_DATA: {
            return null
        }
        case TYPES.NO_DATA: {
            return crudInitialState
        }
        default:
            return state
    }
}
```
# 93. CRUD API con Reducers (2/2)
Yo creí que debiamos de pasar toda la lógica de las peticiones hacía el crudReducer pero recordé que no se pueden realizar peticiones en el reducer. Lo que si inicializamos una variable de tipo reducer con su crudReducer y su crudInitialState, ademas de destructurar la variable db proveniende de state.

Lo primero que debemos hacer es reemplazar el setDb(res) por el dispatch que lee toda la data, pasandole como payload esa respuesta. Ahora en el reducer debemos de programar el return, accedemos al estado y en la propiedad db le decimos que haga un mapeo de la respuesta, en este caso, de la action.payload, y por cada data devuelva data. Esto se hace para asegurar de que debemos de recorrer el objeto por si hay algun nuevo tipo de dato.

Ahora en el caso de que no haya datos, en la parte que seteabamos la db en nula, llamaremos al dispatch de NO_DATA, sin payload, ya que esta retornara el estado inicial, siendo esta nula.

Para la parte de la creación de datos, debemos de llamar el dispatch de CREATE_DATA, y en su payload pasar la *res*. Luego en el reducer debemos de retornar una copia del estado en su propiedad db, y que haga una copia de state.db con un spread-operator, y añadirle lo que venga en la respuesta.

En el update data haremos el dispatch correspondiente y pasaremos como payload la prop *data* proveniente del form. Luego la logica de la variable newData la pasamos a nuestro reducer y reemplazamos las variables correspondientes quedanto esto asi: <br>
`let newData = db.map(el => el.id === data.id ? data : el)` por => <br> `state.db.map(el => el.id === action.payload.id ? action.payload : el)`<br>
Retornará la newData asignandola a la prop db cómo hicimos previamente.

Ahora bien, READ_ONE_DATA no lo vamos a necesitar para este ejercicio. Pero si la accion dependiera de buscar un sólo registro hacia una API externa, ahí si nos serviría.

Para el delete data llamamos al dispatch respectivo y pasamos como payload el id. <br>
`let newData = db.filter(el => el.id !== id)` => `... state.db.filter(el => el.id !== action.payload)`
Con esto terminariamos.

crudReducer.jsx:
```js
import { TYPES } from "../actions/crudActions";

export const crudInitialState = {
    db: null
}

export function crudReducer(state, action) {
    switch (action.type) {
        case TYPES.READ_ALL_DATA: {
            return {
                ...state,
                db: action.payload.map(data => data)
            }
        }
        case TYPES.CREATE_DATA: {
            return {
                ...state,
                db: [...state.db, action.payload]
            }
        }
        /* case TYPES.READ_ONE_DATA: {
            return null
        } */
        case TYPES.UPDATE_DATA: {
            let newData = state.db.map(el => el.id === action.payload.id ? action.payload : el)
            return {
                ...state,
                db: newData
            }
        }
        case TYPES.DELETE_DATA: {
            let newData = state.db.filter(el => el.id !== action.payload)
            return {
                ...state,
                db: newData
            }
        }
        case TYPES.NO_DATA: {
            return crudInitialState
        }
        default:
            return state
    }
}
```
En el CrudApi solo reemplazamos los setDb por los distpach y pasar la lógica al reducer.

---
