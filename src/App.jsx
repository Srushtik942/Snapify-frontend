import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SuccessComponent from "./components/SuccessComponent";
import Albums from "./pages/Albums";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<Login/>}/>
         <Route path="/success" element={<SuccessComponent />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
