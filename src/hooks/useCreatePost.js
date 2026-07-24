import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createPost } from "../api/postsApi";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: (newPost) => {
      queryClient.setQueryData(
        ["posts"],
        (oldPosts = []) => [
          newPost,
          ...oldPosts,
        ]
      );
    },
  });
}