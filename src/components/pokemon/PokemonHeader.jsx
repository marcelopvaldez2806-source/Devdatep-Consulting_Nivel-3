function PokemonHeader({ pokemon }) {
  return (
    <div className="flex justify-between items-center border-b pb-6 mb-8">
      <h1 className="text-5xl font-bold capitalize">
        {pokemon.name}
      </h1>

      <span className="text-4xl font-bold text-gray-400">
        #{pokemon.id.toString().padStart(4, "0")}
      </span>
    </div>
  );
}

export default PokemonHeader;