
import './App.css'
import Homepage from './component/Homepage.jsx'
import {Routes,Route} from "react-router-dom"
import Result from './component/Result.jsx'
function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/result' element={<Result/>}/>
     </Routes>
    </>
  )
}

export default App
