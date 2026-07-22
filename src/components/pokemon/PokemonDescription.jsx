function PokemonDescription({ pokemon }) {
  return (
    <div className="mt-8 bg-gray-100 rounded-xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-4">
        Descripción
      </h2>

      <p className="leading-8 text-gray-700">
        {pokemon.description}
      </p>

    </div>
  );
}

export default PokemonDescription;