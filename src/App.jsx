import './App.css'
import Contador from './components/Contador'
import ContadorMejorado from './components/ContadorMejorado'

function App() {
  return (
    <>
      <h1>useReducer</h1>
      <a href="https://react.dev/reference/react/useReducer" target='_blank' rel='noreferrer'>+info</a>
      <div className="card">
        <ContadorMejorado />
        <hr />
        <Contador />
      </div>
    </>
  )
}

export default App
