//import Body from "./components/Body.jsx"
import Navbar from "./components/Navbar.jsx"
import { Outlet } from "react-router-dom";
import {Provider} from "react-redux"
import store from "./utils/store"
function App() {
 

  return (
    <Provider store={store}>
      <Navbar/>
      {/* <Body/> */}
      <Outlet/>
    </Provider>
  )
}

export default App
