import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [
    { id: 1, title: "mehtoj", status: false },
    { id: 2, title: "Ibrohim", status: false }
  ],
  inpTitle: "",
  editId: null,
  modalEdit: false,
  editTitle: "",
}

export const todoSlices = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.data = state.data.filter((elem) => elem.id !== action.payload)
    },
    setInpTitle: (state, action) => {
      state.inpTitle = action.payload
    },
    addUser: (state) => {
        const newUser = {
        id: Date.now(),
        title: state.inpTitle,
        status: false
      }
      state.data.push(newUser)
      state.inpTitle = ""
    },

    openModal: (state, action) => {
      const { id, title } = action.payload
      state.modalEdit = true
      state.editId = id
      state.editTitle = title
    },

    closeModal: (state) => {
      state.modalEdit = false
      state.editId = null
      state.editTitle = ""
    },

    setEditTitle: (state, action) => {
      state.editTitle = action.payload
    },

    saveEdit: (state) => {
      state.data = state.data.map((el) =>
        el.id === state.editId ?
       { ...el, title: state.editTitle } : el
      )
      state.modalEdit = false
      state.editId = null
      state.editTitle = ""
    },
  }
})

export const { deleteUser, setInpTitle, addUser, openModal, closeModal, setEditTitle, saveEdit } = todoSlices.actions
export default todoSlices.reducer

