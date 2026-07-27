import api from "./axios";

const regions = {
  "generation-i": "Kanto",
  "generation-ii": "Johto",
  "generation-iii": "Hoenn",
  "generation-iv": "Sinnoh",
  "generation-v": "Unova",
  "generation-vi": "Kalos",
  "generation-vii": "Alola",
  "generation-viii": "Galar",
  "generation-ix": "Paldea",
};

// ================================
// LISTADO DE POKÉMON CON PAGINACIÓN
// ================================

export const getPokemons = async (page = 1) => {
  const limit = 20;
  const offset = (page - 1) * limit;

  const response = await api.get(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  const pokemons = await Promise.all(
    response.data.results.map(async (pokemon) => {
      // Datos principales
      const detailResponse = await api.get(
        `/pokemon/${pokemon.name}`
      );

      // Datos de especie
      const speciesResponse = await api.get(
        `/pokemon-species/${detailResponse.data.id}`
      );

      return {
        ...detailResponse.data,

        region:
          regions[speciesResponse.data.generation.name] ||
          "Desconocida",
      };
    })
  );

  return {
    pokemons,
    count: response.data.count,
  };
};

// ================================
// DETALLE DE UN POKÉMON
// ================================

export const getPokemonById = async (id) => {
  const detailResponse = await api.get(
    `/pokemon/${id}`
  );

  const speciesResponse = await api.get(
    `/pokemon-species/${id}`
  );

  const pokemon = detailResponse.data;
  const species = speciesResponse.data;

  // Buscar descripción en inglés
  const description =
    species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text || "Sin descripción disponible.";

  return {
    ...pokemon,

    region:
      regions[species.generation.name] ||
      "Desconocida",

    description: description.replace(
      /[\n\f]/g,
      " "
    ),
  };
};

// ================================
// BÚSQUEDA GLOBAL POR NOMBRE
// ================================

export const searchPokemonByName = async (name) => {
  if (!name.trim()) {
    return null;
  }

  const normalizedName = name
    .trim()
    .toLowerCase();

  const detailResponse = await api.get(
    `/pokemon/${normalizedName}`
  );

  const speciesResponse = await api.get(
    `/pokemon-species/${detailResponse.data.id}`
  );

  return {
    ...detailResponse.data,

    region:
      regions[speciesResponse.data.generation.name] ||
      "Desconocida",
  };
};

// ================================
// OBTENER 30 POKÉMON
// PARA LOCALSTORAGE
// ================================

export const get30Pokemons = async () => {
  const response = await api.get(
    "/pokemon?limit=30"
  );

  const pokemons = await Promise.all(
    response.data.results.map(async (pokemon) => {
      const detailResponse = await api.get(
        `/pokemon/${pokemon.name}`
      );

      return {
        id: detailResponse.data.id,

        name: detailResponse.data.name,

        image:
          detailResponse.data.sprites.other[
            "official-artwork"
          ].front_default,
      };
    })
  );

  return pokemons;
};
export const getPokemonIndex = async () => {
  const response = await api.get(
    "/pokemon?limit=100000&offset=0"
  );

  return response.data.results;
};


// ================================
// BÚSQUEDA GLOBAL PARCIAL
// ================================

export const searchPokemons = async (search) => {
  if (!search.trim()) {
    return [];
  }

  // Obtener lista global de nombres
  const pokemonIndex = await getPokemonIndex();

  const normalizedSearch = search
    .trim()
    .toLowerCase();

  // Buscar coincidencias parciales
  const matches = pokemonIndex
    .filter((pokemon) =>
      pokemon.name.includes(normalizedSearch)
    )
    .slice(0, 20);

  // Obtener detalle de los Pokémon encontrados
  const detailedPokemons = await Promise.all(
    matches.map(async (pokemon) => {
      const detailResponse = await api.get(
        `/pokemon/${pokemon.name}`
      );

      const speciesResponse = await api.get(
        `/pokemon-species/${detailResponse.data.id}`
      );

      return {
        ...detailResponse.data,

        region:
          regions[
            speciesResponse.data.generation.name
          ] || "Desconocida",
      };
    })
  );

  return detailedPokemons;
};