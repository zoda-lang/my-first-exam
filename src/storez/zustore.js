import { create } from "zustand";

export const useTodo = create((set) => ({
  todos: [
    { id: 1, name: "nasim", status: false },
    { id: 2, name: "Abdulloh", status: false },
  ],

  addTodo: (name) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), name, status: false }],
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  editTodo: (id, newname) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, name: newname } : t
      ),
    })),

  chexbox: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, status: !t.status } : t
      ),
    })),
    
}));
