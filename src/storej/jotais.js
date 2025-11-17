import { atom } from "jotai";
import axios from "axios";

const API = "https://689efc1f3fed484cf878a4ca.mockapi.io/users";

// ⬇ Core State
export const dataAtom = atom([]);

// ⬇ Fetch Users
export const fetchUsersAtom = atom(null, async (get, set) => {
  try {
    const res = await axios.get(API);
    set(dataAtom, res.data);
  } catch (err) {
    console.log(err);
  }
});

// ⬇ Add User
export const addUserAtom = atom(null, async (get, set, { name }) => {
  try {
    const res = await axios.post(API, { name, status: false });
    set(dataAtom, [...get(dataAtom), res.data]);
  } catch (err) {
    console.log(err);
  }
});

// ⬇ Delete User
export const deleteUserAtom = atom(null, async (get, set, id) => {
  try {
    await axios.delete(`${API}/${id}`);
    set(dataAtom, get(dataAtom).filter((el) => el.id !== id));
  } catch (err) {
    console.log(err);
  }
});

// ⬇ Update User
export const updateUserAtom = atom(null, async (get, set, { id, name }) => {
  try {
    const res = await axios.put(`${API}/${id}`, { name });
    set(
      dataAtom,
      get(dataAtom).map((el) =>
        el.id === id ? { ...el, name: res.data.name } : el
      )
    );
  } catch (err) {
    console.log(err);
  }
});


export const checkboxAtom = atom(null, async (get, set, { id, status }) => {
  try {
    const res = await axios.put(`${API}/${id}`, { status: !status });
    set( dataAtom,
      get(dataAtom).map((el) =>
        el.id === id ? { ...el, status: res.data.status } : el
      )
    );
  } catch (err) {
    console.log(err);
  }
});
