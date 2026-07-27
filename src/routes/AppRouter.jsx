import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "../components/common/Navbar";

import Home from "../pages/Home";
import Pokemon from "../pages/Pokemon";
import PokemonDetail from "../pages/PokemonDetail";

import Posts from "../pages/Posts";
import PostDetail from "../pages/PostDetail";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";

import Todos from "../pages/Todos";
import CreateTodo from "../pages/CreateTodo";
import TodoDetail from "../pages/todoDetail";
import EditTodo from "../pages/EditTodo";

function AppRouter() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        {/* Pokémon */}

        <Route
          path="/pokemon"
          element={<Pokemon />}
        />

        <Route
          path="/pokemon/:id"
          element={<PokemonDetail />}
        />

        {/* Posts */}

        <Route
          path="/posts"
          element={<Posts />}
        />

        <Route
          path="/posts/create"
          element={<CreatePost />}
        />

        <Route
          path="/posts/:id/edit"
          element={<EditPost />}
        />

        <Route
          path="/posts/:id"
          element={<PostDetail />}
        />
        <Route path="/todos" element={<Todos />} />

        <Route
          path="/todos/create"
          element={<CreateTodo />}
        />

        <Route
          path="/todos/:id/edit"
          element={<EditTodo />}
        />

        <Route
          path="/todos/:id"
          element={<TodoDetail />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;