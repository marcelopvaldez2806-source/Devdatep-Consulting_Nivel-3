function PokemonStats({ pokemon }) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Estadísticas
      </h2>

      <div className="space-y-5">

        {pokemon.stats.map((stat) => (

          <div key={stat.stat.name}>

            <div className="flex justify-between mb-1">

              <span className="capitalize">
                {stat.stat.name.replace("-", " ")}
              </span>

              <span>
                {stat.base_stat}
              </span>

            </div>

            <div className="w-full h-4 rounded-full bg-gray-200">

              <div
                className="h-4 rounded-full bg-sky-500"
                style={{
                  width: `${Math.min(stat.base_stat,100)}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PokemonStats;