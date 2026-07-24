import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { usePostDetail } from "../hooks/usePostDetail";
import { useDeletePost } from "../hooks/useDeletePost";

function PostDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    error,
  } = usePostDetail(id);

  const deleteMutation = useDeletePost();

  if (isLoading) {
    return (
      <h2 className="text-center mt-10">
        Cargando post...
      </h2>
    );
  }

  if (error || !post) {
    return (
      <h2 className="text-center text-red-500 mt-10">
        No se pudo cargar el post.
      </h2>
    );
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      "¿Seguro que desea eliminar este post?"
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(post.id, {
      onSuccess: () => {
        alert("Post eliminado correctamente");

        navigate("/posts");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      <div className="bg-white shadow-lg rounded-2xl p-8">

        <span className="text-gray-400">
          Post #{post.id}
        </span>

        <h1 className="text-4xl font-bold mt-3 capitalize">
          {post.title}
        </h1>

        <p className="mt-6 text-gray-700 leading-8">
          {post.body}
        </p>

        <p className="mt-6 text-gray-500">
          Autor ID: {post.userId}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            to={`/posts/${post.id}/edit`}
            className="
              bg-yellow-500
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-yellow-600
            "
          >
             Editar
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="
              bg-red-600
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-red-700
              disabled:bg-gray-400
            "
          >
            {deleteMutation.isPending
              ? "Eliminando..."
              : "Eliminar"}
          </button>

          <Link
            to="/posts"
            className="
              bg-gray-600
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-gray-700
            "
          >
            ← Volver
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PostDetail;