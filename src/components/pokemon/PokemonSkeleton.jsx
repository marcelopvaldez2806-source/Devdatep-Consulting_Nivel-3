function PokemonSkeleton() {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-5
        animate-pulse
      "
    >
      <div className="bg-gray-300 h-40 rounded-xl"></div>

      <div className="bg-gray-300 h-6 w-2/3 rounded mt-5 mx-auto"></div>

      <div className="bg-gray-200 h-4 w-1/3 rounded mt-3 mx-auto"></div>

      <div className="flex justify-center gap-2 mt-5">
        <div className="bg-gray-300 h-8 w-20 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-20 rounded-full"></div>
      </div>

      <div className="space-y-3 mt-6">
        <div className="bg-gray-200 h-4 rounded"></div>
        <div className="bg-gray-200 h-4 rounded"></div>
        <div className="bg-gray-200 h-4 rounded"></div>
      </div>
    </div>
  );
}

export default PokemonSkeleton;