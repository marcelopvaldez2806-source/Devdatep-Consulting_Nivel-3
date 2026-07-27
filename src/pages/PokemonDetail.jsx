import { useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonid";

import PokemonHeader from "../components/pokemon/PokemonHeader";
import PokemonInfo from "../components/pokemon/PokemonInfo";
import PokemonTypes from "../components/pokemon/PokemonTypes";
import PokemonStats from "../components/pokemon/PokemonStats";
import PokemonAbilities from "../components/pokemon/PokemonAbilities";
import PokemonEvolution from "../components/pokemon/PokemonEvolution";
import typeBackgrounds from "../utils/typebackgrounds";
import PokemonDescription from "../components/pokemon/PokemonDescription";
import PokemonSound from "../components/pokemon/PokemonSound";
import BackButton from "../components/pokemon/BotonVolver";
import PokemonCry from "../components/pokemon/PokemonSound";

function PokemonDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = usePokemonDetail(id);

  if (isLoading) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Cargando...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-red-500 mt-20">
        Error al cargar el Pokémon
      </h1>
    );
  }
  const bg =
  typeBackgrounds[data.types[0].type.name] ||
  "from-gray-100 to-white";

  return (
    <div
  className={`
    max-w-7xl
    mx-auto
    p-8
    rounded-3xl
    bg-gradient-to-br
    ${bg}
  `}
>

      <PokemonHeader pokemon={data} />

      <div className="grid lg:grid-cols-2 gap-12">

        <div>

          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="w-full max-w-md mx-auto"
          />
          <PokemonDescription pokemon={data} />

        </div>

        <div>

          <PokemonInfo pokemon={data} />

          <PokemonTypes pokemon={data} />

        </div>

      </div>

      <PokemonStats pokemon={data} />

      <PokemonAbilities pokemon={data} />

      <PokemonEvolution />
      <PokemonCry pokemon={data} />

      <BackButton />

    </div>
  );
}

export default PokemonDetail;