import api from "./axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const STORAGE_KEY = "my_posts";

const getLocalPosts = () => {
  const posts = localStorage.getItem(STORAGE_KEY);

  return posts ? JSON.parse(posts) : [];
};

const saveLocalPosts = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};


export const getPosts = async () => {
  // Solo mostramos los posts creados por nosotros.
  return getLocalPosts();
};




export const getPostById = async (id) => {
  const posts = getLocalPosts();

  const post = posts.find(
    (item) => String(item.id) === String(id)
  );

  if (!post) {
    throw new Error("Post no encontrado");
  }

  return post;
};



export const createPost = async (postData) => {

  const response = await api.post(BASE_URL, postData);


  const newPost = {
    ...response.data,
    ...postData,
    id: Date.now(),
  };

  const posts = getLocalPosts();

  const updatedPosts = [
    newPost,
    ...posts,
  ];

  saveLocalPosts(updatedPosts);

  return newPost;
};


export const updatePost = async ({ id, data }) => {
  // Simulamos PUT mediante JSONPlaceholder
  await api.put(`${BASE_URL}/1`, data);

  const posts = getLocalPosts();

  const updatedPost = {
    ...posts.find(
      (post) => String(post.id) === String(id)
    ),
    ...data,
    id,
  };

  const updatedPosts = posts.map((post) =>
    String(post.id) === String(id)
      ? updatedPost
      : post
  );

  saveLocalPosts(updatedPosts);

  return updatedPost;
};


export const deletePost = async (id) => {
  // JSONPlaceholder simula el DELETE
  await api.delete(`${BASE_URL}/1`);

  const posts = getLocalPosts();

  const updatedPosts = posts.filter(
    (post) => String(post.id) !== String(id)
  );

  saveLocalPosts(updatedPosts);

  return id;
};