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