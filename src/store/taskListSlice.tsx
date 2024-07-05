import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  title: 'My default list',
  data: [
    {
      id: uuidv4(),
      title: 'Lorem ipsum dolor sit Alpha1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
      completed: false
    },
    {
      id: uuidv4(),
      title: 'Lorem ipsum dolor sit Beta2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
      completed: false
    },
    {
      id: uuidv4(),
      title: 'Lorem ipsum dolor sit Charlie3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
      completed: false
    },
    {
      id: uuidv4(),
      title: 'Lorem ipsum dolor sit Delta4  ',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
      completed: false
    }
  ]
}

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload
    },
    createItem: (state) => {
      let newData =[...state.data]
      newData.push({
        id: uuidv4(),
        title: 'My new task',
        description: '',
        completed: false
      });
      state.data = newData
    },
    updateItem: (state, action) => {
      let newData = state.data.map(
        (item) => { 
          if(item.id == action.payload.id) return action.payload
          return item
        }
      )
      console.log(newData)
      state.data = newData
    },
    deleteItem: (state, action) => {
      let newData = state.data.filter(
        (item) => { 
          if(item.id == action.payload.id) return false
          return true
        }
      )
      state.data = newData
    },

  },
})

// Action creators are generated for each case reducer function
export const { updateTitle, createItem, updateItem, deleteItem } = taskListSlice.actions

export default taskListSlice.reducer // EXPORT Slice reducer