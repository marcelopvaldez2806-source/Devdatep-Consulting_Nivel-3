function SearchBar({ value, onChange }) {
  return (
    <div className="mb-8">

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          border
          border-gray-300
          rounded-xl
          p-4
          text-lg
          shadow
          focus:outline-none
          focus:ring-2
          focus:ring-green-400
        "
      />

    </div>
  );
}

export default SearchBar;