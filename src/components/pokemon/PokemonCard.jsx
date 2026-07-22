import typeColors from "../../utils/typeColors";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div
        className="
          bg-white
          rounded-2xl
          shadow-lg
          p-5
          hover:scale-105
          hover:shadow-2xl
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-40 h-40 mx-auto"
        />

        <h2 className="text-2xl font-bold capitalize text-center mt-4">
          {pokemon.name}
        </h2>

        <p className="text-gray-500 text-center">
          #{pokemon.id.toString().padStart(3, "0")}
        </p>

        <div className="flex justify-center gap-2 mt-4">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`
                text-white
                px-3
                py-1
                rounded-full
                text-sm
                capitalize
                ${typeColors[type.type.name]}
              `}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          <p>
            <strong>Región:</strong> {pokemon.region}
          </p>

          <p>
            <strong>Peso:</strong> {pokemon.weight}
          </p>

          <p>
            <strong>Altura:</strong> {pokemon.height}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;