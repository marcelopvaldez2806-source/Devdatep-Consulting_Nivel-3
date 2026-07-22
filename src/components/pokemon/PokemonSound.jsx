function PokemonCry({ pokemon }) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Sonido
      </h2>

      <audio controls>
        <source
          src={pokemon.cries.latest}
          type="audio/ogg"
        />
      </audio>

    </div>
  );
}

export default PokemonCry;