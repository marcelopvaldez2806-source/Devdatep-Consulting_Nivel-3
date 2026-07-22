import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/pokemon">Pokémon</Link>
      <Link to="/posts">Posts</Link>
    </nav>
  );
}

export default Navbar;