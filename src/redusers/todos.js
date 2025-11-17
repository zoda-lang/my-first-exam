import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const Api = "https://to-dos-api.softclub.tj/api/to-dos";

export const getUser = createAsyncThunk("todochka/getUser", async () => {
    let { data } = await axios.get(Api);
    return data.data;
});

export const getUserById = createAsyncThunk("todochka/getUserById", async (id) => {
    let { data } = await axios.get(`${Api}/${id}`);
    return data.data;
});

export const deleteuser = createAsyncThunk("todochka/deleteuser", async (id, { dispatch }) => {
    await axios.delete(`${Api}?id=${id}`);
    dispatch(getUser());
});

export const edituser = createAsyncThunk("todochka/edituser", async (user, { dispatch }) => {
    await axios.put(`${Api}`, user);
    dispatch(getUser());
});

export const adduser = createAsyncThunk("todochka/adduser", async ({ name, desc, image }, { dispatch }) => {
    let formdata = new FormData();
    formdata.append("Name", name);
    formdata.append("Description", desc);
    for (let i = 0; i < image.length; i++) {
        formdata.append("Images", image[i]);
    }
    await axios.post(Api, formdata);
    dispatch(getUser());
});

export const deleteimg = createAsyncThunk("todochka/deleteimg", async (id, { dispatch }) => {
    await axios.delete(`${Api}/images/${id}`);
    dispatch(getUser());
});

export const chexbox = createAsyncThunk("todochka/chexbox", async (elem, { dispatch }) => {
    const updated = { ...elem, isCompleted: !elem.isCompleted };
    await axios.put(`${Api}?id=${elem.id}`, updated);
    dispatch(getUser());
});

export const todoslice = createSlice({
    name: 'todos',
    initialState: {
        data: [],
        selectedUser: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => { state.data = action.payload })
            .addCase(getUserById.pending, (state) => { state.loading = true; state.error = null })
            .addCase(getUserById.fulfilled, (state, action) => { state.loading = false; state.selectedUser = action.payload })
            .addCase(getUserById.rejected, (state, action) => { state.loading = false; state.error = action.payload });
    }
});

export default todoslice.reducer;
