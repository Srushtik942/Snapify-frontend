import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import SuccessComponent from "./components/SuccessComponent";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import AlbumDetail from "./pages/AlbumDetail";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Login/></ProtectedRoute>}/>
         <Route path="/success" element={<SuccessComponent />} />
        <Route path="/albums" element={<ProtectedRoute><Albums /></ProtectedRoute>} />
        <Route path="/albums/name/:albumName"element={<ProtectedRoute><AlbumDetails/></ProtectedRoute>}/>
        <Route path="/albums/id/:albumId" element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
