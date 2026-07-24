import api from "./axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";
const STORAGE_KEY = "my_todos";

const getLocalTodos = () => {
  const todos = localStorage.getItem(STORAGE_KEY);

  return todos ? JSON.parse(todos) : [];
};

const saveLocalTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// LISTAR
export const getTodos = async () => {
  return getLocalTodos();
};

// DETALLE
export const getTodoById = async (id) => {
  const todos = getLocalTodos();

  const todo = todos.find(
    (item) => String(item.id) === String(id)
  );

  if (!todo) {
    throw new Error("Tarea no encontrada");
  }

  return todo;
};

// CREAR
export const createTodo = async (todoData) => {
  // Simulación POST
  await api.post(BASE_URL, todoData);

  const newTodo = {
    ...todoData,
    id: Date.now(),
  };

  const todos = getLocalTodos();

  saveLocalTodos([
    newTodo,
    ...todos,
  ]);

  return newTodo;
};

// EDITAR
export const updateTodo = async ({ id, data }) => {
  // Simulación PUT
  await api.put(`${BASE_URL}/1`, data);

  const todos = getLocalTodos();

  const updatedTodo = {
    ...todos.find(
      (todo) => String(todo.id) === String(id)
    ),
    ...data,
    id,
  };

  const updatedTodos = todos.map((todo) =>
    String(todo.id) === String(id)
      ? updatedTodo
      : todo
  );

  saveLocalTodos(updatedTodos);

  return updatedTodo;
};

// ELIMINAR
export const deleteTodo = async (id) => {
  // Simulación DELETE
  await api.delete(`${BASE_URL}/1`);

  const todos = getLocalTodos();

  const updatedTodos = todos.filter(
    (todo) => String(todo.id) !== String(id)
  );

  saveLocalTodos(updatedTodos);

  return id;
};