import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Products from "./pages/gallery";
import Checkout from './pages/Checkout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
