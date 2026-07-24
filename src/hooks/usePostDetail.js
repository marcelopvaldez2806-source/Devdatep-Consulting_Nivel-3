import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "../api/postsApi";

export function usePostDetail(id) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["post", String(id)],

    queryFn: async () => {
      const posts = queryClient.getQueryData(["posts"]);

      const cachedPost = posts?.find(
        (post) => String(post.id) === String(id)
      );

      if (cachedPost) {
        return cachedPost;
      }

      return getPostById(id);
    },

    enabled: Boolean(id),
  });
}