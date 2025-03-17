import Routers from "./routers/Routers";
import "./assets/css/main.css"
import "./assets/css/font.css"
import 'react-quill/dist/quill.snow.css';
import { Toaster } from "react-hot-toast";
// import 'lightbox.js-react/dist/index.css'

const App = () => {

  return (
    <>
      <Toaster />
      <Routers />
    </>
  )
}

export default App