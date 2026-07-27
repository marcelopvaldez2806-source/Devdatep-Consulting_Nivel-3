const POKEMON_STORAGE_KEY = "stored_pokemons";
const TODOS_STORAGE_KEY = "my_todos";

export const savePokemonsToStorage = (pokemons) => {
  localStorage.setItem(
    POKEMON_STORAGE_KEY,
    JSON.stringify(pokemons)
  );
};

export const getPokemonsFromStorage = () => {
  const pokemons = localStorage.getItem(
    POKEMON_STORAGE_KEY
  );

  return pokemons
    ? JSON.parse(pokemons)
    : [];
};

export const getUsedPokemonIds = () => {
  const todosRaw = localStorage.getItem(
    TODOS_STORAGE_KEY
  );

  const todos = todosRaw
    ? JSON.parse(todosRaw)
    : [];

  return todos
    .filter((todo) => todo.pokemonId)
    .map((todo) => Number(todo.pokemonId));
};

export const getAvailablePokemons = (
  currentPokemonId = null
) => {
  const pokemons = getPokemonsFromStorage();
  const usedPokemonIds = getUsedPokemonIds();

  return pokemons.filter((pokemon) => {
    const pokemonId = Number(pokemon.id);

    // En edición permitimos conservar
    // el Pokémon que ya tenía esa tarea.
    if (
      currentPokemonId &&
      pokemonId === Number(currentPokemonId)
    ) {
      return true;
    }

    return !usedPokemonIds.includes(pokemonId);
  });
};