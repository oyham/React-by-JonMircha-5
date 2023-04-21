import './App.css'
import Contador from './components/Contador'

function App() {
  return (
    <>
      <h1>useReducer</h1>
      <a href="https://react.dev/reference/react/useReducer" target='_blank' rel='noreferrer'>+info</a>
      <div className="card">
        <Contador />
      </div>
    </>
  )
}

export default App
