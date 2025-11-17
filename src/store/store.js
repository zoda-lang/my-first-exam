import { configureStore } from '@reduxjs/toolkit'
import todoslice from '../redusers/todos'
import  todoSlices  from '../redusers/tidi'

export const store = configureStore({
    reducer: {
        todos: todoslice,
        todo:todoSlices,
    },
})
