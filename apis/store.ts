import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import filterReducer from './reducers/filterReducer'
import snackbarsReducer from './reducers/snackbarsReducer'

export const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        snackbars: snackbarsReducer,
        auth: authReducer,
        filter: filterReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch