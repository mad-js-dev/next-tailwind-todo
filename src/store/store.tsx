import { configureStore } from '@reduxjs/toolkit'
import TaskListSlice from './taskListSlice'

export const store = configureStore({
  reducer: {    counter: CounterSlice, taskList: TaskListSlice, // Connecting default exported Slice reducertyept
},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch