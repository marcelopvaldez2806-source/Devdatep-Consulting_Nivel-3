import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deletePost } from "../api/postsApi";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: (deletedId) => {
      queryClient.setQueryData(
        ["posts"],
        (oldPosts = []) =>
          oldPosts.filter(
            (post) =>
              String(post.id) !== String(deletedId)
          )
      );

      queryClient.removeQueries({
        queryKey: ["post", String(deletedId)],
      });
    },
  });
}