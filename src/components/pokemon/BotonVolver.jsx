import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/pokemon")}
      className="
        mt-10
        bg-blue-500
        hover:bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        transition
      "
    >
      ← Volver a la Pokédex
    </button>
  );
}

export default BackButton;