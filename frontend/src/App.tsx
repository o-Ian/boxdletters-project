import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import { Tooltip } from 'react-tooltip'
import './components/layout/styles/tooltip.css'

function App() {

  return (
    <div className="card">
      <Tooltip id="movie-tooltip" className="custom-tooltip"/>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
