import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import Home from "../pages/Home";
import Pokemon from "../pages/Pokemon";
import Posts from "../pages/Posts";
import PokemonDetail from "../pages/PokemonDetail";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;