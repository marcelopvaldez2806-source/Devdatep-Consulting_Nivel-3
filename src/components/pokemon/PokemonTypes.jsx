import typeColors from "../../utils/typeColors";

function PokemonTypes({ pokemon }) {
  return (
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Tipos
      </h2>

      <div className="flex gap-4 flex-wrap">

        {pokemon.types.map((type) => (

          <span
            key={type.type.name}
            className={`
                px-6
                py-2
                rounded-full
                text-white
                font-semibold
                capitalize
                ${typeColors[type.type.name]}
            `}
          >
            {type.type.name}
          </span>

        ))}

      </div>

    </div>
  );
}

export default PokemonTypes;