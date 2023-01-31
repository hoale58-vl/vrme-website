import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { tokenReducer } from './token'
import { userReducer } from './user'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: {},
  devTools: process.env.NODE_ENV === 'development'
})

export type RootState = ReturnType<typeof rootReducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default () => {
  return store
}
