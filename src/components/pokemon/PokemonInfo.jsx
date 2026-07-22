function PokemonInfo({ pokemon }) {
  return (
    <div className="bg-sky-500 rounded-2xl p-6 text-white shadow-lg">

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm opacity-80">
            Región
          </p>

          <p className="text-xl font-semibold">
            {pokemon.region}
          </p>
        </div>

        <div>
          <p className="text-sm opacity-80">
            Experiencia Base
          </p>

          <p className="text-xl font-semibold">
            {pokemon.base_experience}
          </p>
        </div>

        <div>
          <p className="text-sm opacity-80">
            Altura
          </p>

          <p className="text-xl font-semibold">
            {pokemon.height / 10} m
          </p>
        </div>

        <div>
          <p className="text-sm opacity-80">
            Peso
          </p>

          <p className="text-xl font-semibold">
            {pokemon.weight / 10} kg
          </p>
        </div>

      </div>

    </div>
  );
}

export default PokemonInfo;