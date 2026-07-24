import { useNavigate, useParams } from "react-router-dom";

import PostForm from "../components/posts/PostForm";

import { usePostDetail } from "../hooks/usePostDetail";
import { useUpdatePost } from "../hooks/useUpdatePost";

function EditPost() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    error,
  } = usePostDetail(id);

  const updateMutation = useUpdatePost();

  if (isLoading) {
    return (
      <h2 className="text-center mt-10">
        Cargando...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-red-500 mt-10">
        Error al cargar el post.
      </h2>
    );
  }

  const handleUpdate = (data) => {
    updateMutation.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          alert("Post actualizado correctamente");

          navigate(`/posts/${id}`);
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Editar Post
      </h1>

      <PostForm
        initialData={post}
        onSubmit={handleUpdate}
        isPending={updateMutation.isPending}
        submitText="Guardar cambios"
      />

    </div>
  );
}

export default EditPost;