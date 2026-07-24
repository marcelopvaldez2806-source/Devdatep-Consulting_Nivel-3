import { useNavigate } from "react-router-dom";

import PostForm from "../components/posts/PostForm";
import { useCreatePost } from "../hooks/useCreatePost";

function CreatePost() {
  const navigate = useNavigate();

  const createMutation = useCreatePost();

  const handleCreate = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        alert("Post creado correctamente");

        navigate("/posts");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Crear nuevo Post
      </h1>

      <PostForm
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
        submitText="Crear Post"
      />

      {createMutation.isError && (
        <p className="text-red-500 mt-4">
          Ocurrió un error al crear el post.
        </p>
      )}

    </div>
  );
}

export default CreatePost;