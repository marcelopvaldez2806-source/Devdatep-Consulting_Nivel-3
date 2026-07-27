import { NavLink } from "react-router-dom";

function Navbar() {
  const getLinkClass = ({ isActive }) => `
    relative
    px-4
    py-2
    rounded-xl
    font-medium
    transition-all
    duration-300
    ${
      isActive
        ? "bg-blue-600 text-white shadow-md scale-105"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5"
    }
  `;

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        bg-white/90
        backdrop-blur-md
        border-b
        border-gray-200
        shadow-sm
      "
    >
      <nav
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        {/* Logo / Nombre */}
        <NavLink
          to="/"
          className="
            text-2xl
            font-black
            tracking-tight
            text-gray-900
            transition
            duration-300
            hover:scale-105
          "
        >
          Prueba Frontend de Nivel 3
        </NavLink>

        {/* Navegación */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <NavLink to="/" className={getLinkClass}>
            Inicio
          </NavLink>

          <NavLink
            to="/pokemon"
            className={getLinkClass}
          >
            Pokémon
          </NavLink>

          <NavLink
            to="/posts"
            className={getLinkClass}
          >
            Posts
          </NavLink>

          <NavLink
            to="/todos"
            className={getLinkClass}
          >
            Tareas
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;