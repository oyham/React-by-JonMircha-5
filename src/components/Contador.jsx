import { useState, useReducer } from "react"

const initialState = { contador: 0 }

const init = (initialState) => {
    return {
        contador: initialState.contador + 100,
    }
}

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

/* function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { contador: state.contador + 1 }
        case "DECREMENT":
            return { contador: state.contador - 1 }
        // break; no necesitamos el break ya que no necesitamos romper la estructura.
        default:
            return state;
    }
} */


const Contador = () => {
    const [count, setCount] = useState(0)
    const [state, dispatch] = useReducer(reducer, initialState, init)

    const handleCount = (e) => {
        if (e.target.value === '+') {
            setCount(count + 1)
        } else if (e.target.value === '-') {
            setCount(count - 1)
        }
    }

    /* const sumar = () => dispatch({ type: "INCREMENT" })
    const restar = () => dispatch({ type: "DECREMENT" }) */

    const sumar = () => dispatch({ type: TYPES.INCREMENT })
    const restar = () => dispatch({ type: TYPES.DECREMENT })
    
    const sumar5 = () => dispatch({ type: TYPES.INCREMENT_5, payload: 5 })
    const restar5 = () => dispatch({ type: TYPES.DECREMENT_5, payload: 5 })

    const reset = () => dispatch({type: TYPES.RESET})


    return <>
        <h2>Contador</h2>
        <h3>Con useState</h3>
        <div className="useState">
            <button value='+' onClick={handleCount}>+</button>
            <button value='-' onClick={handleCount}>-</button>
            <p>Contador en: {count}</p>
        </div>
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