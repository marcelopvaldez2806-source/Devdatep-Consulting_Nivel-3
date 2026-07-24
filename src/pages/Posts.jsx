import { Link } from "react-router-dom";

import { usePosts } from "../hooks/usePosts";
import PostGrid from "../components/posts/PostGrid";

function Posts() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <h2 className="text-center mt-10">
        Cargando posts...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-red-500 mt-10">
        No se pudieron cargar los posts.
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Posts
          </h1>

          <p className="text-gray-500 mt-2">
            Administración de publicaciones
          </p>
        </div>

        <Link
          to="/posts/create"
          className="
            bg-green-600
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-green-700
            transition
          "
        >
          + Nuevo Post
        </Link>

      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay publicaciones disponibles.
        </p>
      ) : (
        <PostGrid posts={posts} />
      )}

    </div>
  );
}

export default Posts;