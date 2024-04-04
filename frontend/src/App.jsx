
import './App.css'
import Homepage from './component/Homepage.jsx'
import {Routes,Route} from "react-router-dom"
import Result from './component/Result.jsx'
import Getseatavialbilityseats from "./component/Getseatavialbilityseats.jsx"
import Seatavailabality from "./component/Seatavailabality.jsx"
import Loader from './component/Loader.jsx'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/seatavailabilty/' element={<Getseatavialbilityseats/>}>
        <Route path='seat' element={<Seatavailabality/>}/>
      </Route>
      
      
     </Routes>
    </>
  )
}

export default App
