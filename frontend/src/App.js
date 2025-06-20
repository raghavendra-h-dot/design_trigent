import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/register';
import Login from './pages/Login';
import Cube from './pages/Cube';
import SearchResults from './pages/SearchResults';
import Upload from './pages/Upload'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Cube" element={<Cube />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
