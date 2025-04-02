import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Products from "./pages/gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
