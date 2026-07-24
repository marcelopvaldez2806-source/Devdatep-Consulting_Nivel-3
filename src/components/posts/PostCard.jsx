import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="flex justify-between items-start gap-4">
        <span className="text-sm text-gray-400">
          #{post.id}
        </span>

        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Usuario {post.userId}
        </span>
      </div>

      <h2 className="text-xl font-bold mt-4 capitalize">
        {post.title}
      </h2>

      <p className="text-gray-600 mt-3 line-clamp-3">
        {post.body}
      </p>

      <Link
        to={`/posts/${post.id}`}
        className="
          inline-block
          mt-5
          text-blue-600
          font-semibold
          hover:text-blue-800
        "
      >
        Ver detalle →
      </Link>
    </div>
  );
}

export default PostCard;