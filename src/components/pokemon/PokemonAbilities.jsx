function PokemonAbilities({ pokemon }) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Habilidades
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {pokemon.abilities.map((ability) => (

          <div
            key={ability.ability.name}
            className="
              bg-gray-100
              rounded-xl
              p-4
              shadow
            "
          >
            <p className="capitalize font-semibold">
              {ability.ability.name}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}

export default PokemonAbilities;