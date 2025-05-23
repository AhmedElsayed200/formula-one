import { Routes, Route } from 'react-router-dom'
import Races from './pages/races'
import Seasons from './pages/seasons'
import RaceDetails from './pages/raceDetails'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Seasons />} />
        <Route path='/season/:id/races' element={<Races />} />
        <Route path='/season/:id/races/:id' element={<RaceDetails />} />
      </Routes>
    </>
  )
}

export default App
