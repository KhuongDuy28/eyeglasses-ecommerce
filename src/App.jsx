import { RouterProvider } from "react-router-dom"
import Routers from "./routers/Routers"

function App() {
  return (
    <>
      <RouterProvider router={Routers}/>
    </>
  )
  
}

export default App
