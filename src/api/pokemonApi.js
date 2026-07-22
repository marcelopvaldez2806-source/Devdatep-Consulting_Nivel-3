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

export const getPokemons = async () => {
  const response = await api.get("/pokemon?limit=151");

  const pokemons = await Promise.all(
    response.data.results.map(async (pokemon) => {

      // Datos principales
      const detailResponse = await api.get(`/pokemon/${pokemon.name}`);

      // Datos de especie
      const speciesResponse = await api.get(
        `/pokemon-species/${detailResponse.data.id}`
      );

      return {
        ...detailResponse.data,

        region:
          regions[speciesResponse.data.generation.name] || "Desconocida",
      };
    })
  );

  return pokemons;
};
export const getPokemonById = async (id) => {
  // Datos principales del Pokémon
  const detailResponse = await api.get(`/pokemon/${id}`);

  // Datos de la especie (para obtener la generación)
  const speciesResponse = await api.get(`/pokemon-species/${id}`);

  const flavorEntry = speciesResponse.data.flavor_text_entries.find(
  (entry) => entry.language.name === "es"
);

return {
  ...detailResponse.data,

  region:
    regions[speciesResponse.data.generation.name] || "Desconocida",

  description: flavorEntry
    ? flavorEntry.flavor_text.replace(/\f/g, " ")
    : "Sin descripción disponible.",
};
};