import { create } from "zustand";

const API = "http://localhost:3000/data";

export const useTodo = create((set,get) => ({
    todos: [],
    getTodos: async () => {
        try {
            let res = await fetch(API);
            let data = await res.json();
            set({ todos: data });
        } catch (error) {
            console.log(error);
        }
    },

    addTodo: async (name, id,age) => {
        try {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, id,age }),
            });
            get().getTodos();
        } catch (error) {
            console.log(error);
        }
    },

    deleteTodo: async (id) => {
        try {
            await fetch(`${API}/${id}`, {
                method: "DELETE",
            });
            get().getTodos();
        } catch (error) {
            console.log(error);
        }
    },

    editTodo: async (id, name,age) => {
        try {
                await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name,age}),
            });
               get().getTodos();
        } catch (error) {
            console.log( error);
        }
    },

    chexbox: async (id,elem) => {
        try {
            await fetch(`${API}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: !elem }),
            });
               get().getTodos();
        } catch (error) {
            console.log( error);
        }
    },
}));
