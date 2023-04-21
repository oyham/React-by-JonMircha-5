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