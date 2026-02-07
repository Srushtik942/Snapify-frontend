import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import SuccessComponent from "./components/SuccessComponent";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import AlbumDetail from "./pages/AlbumDetail";

function App() {

  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
         <Route path="/success" element={<SuccessComponent />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/name/:albumName"element={<AlbumDetails/>}/>
        <Route path="/albums/id/:albumId" element={<AlbumDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
