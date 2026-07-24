import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updatePost } from "../api/postsApi";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,

    onSuccess: (updatedPost) => {
      queryClient.setQueryData(
        ["posts"],
        (oldPosts = []) =>
          oldPosts.map((post) =>
            String(post.id) === String(updatedPost.id)
              ? updatedPost
              : post
          )
      );

      queryClient.setQueryData(
        ["post", String(updatedPost.id)],
        updatedPost
      );
    },
  });
}