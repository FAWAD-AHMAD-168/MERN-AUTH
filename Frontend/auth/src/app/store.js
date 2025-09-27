// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authApi from '../services/authApi'            // path adjust if needed
// import authReducer from '../features/auth/authSlice' // optional

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // auth: authReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)

export default store
