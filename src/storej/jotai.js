import { atom } from "jotai";

export const dataAtom = atom([
  { id: 1, name: "Ibrohim", status: false },
  { id: 2, name: "Aziz", status: true },
]);

export const addUserAtom = atom( null,(get, set, newName) => {
    const todos = get(dataAtom);
    set(dataAtom, [...todos, { id: Date.now(), name: newName, status: false }]);
  }
);

export const deleteUserAtom = atom( null, (get, set, id) => {
    const todos = get(dataAtom);
    set(dataAtom, todos.filter((el) => el.id !== id));
  }
);

export const updateUserAtom = atom(null,(get, set, { id, name }) => {
    const todos = get(dataAtom);
    set( dataAtom,
      todos.map((el) => (el.id === id ? { ...el, name } : el))
    );
  }
);

export const chexbox = atom( null,(get, set, id) => {
    const todos = get(dataAtom);
    set(dataAtom,
      todos.map((el) => (el.id === id ? { ...el, status: !el.status } : el))
    );
  }
);
