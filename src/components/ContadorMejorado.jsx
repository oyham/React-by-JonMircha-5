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