import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { beerApi } from './beerApiSlice'

export const store = configureStore({
    reducer: {
        [beerApi.reducerPath]: beerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(beerApi.middleware),
})

export const setupStore = (preloadedState?: PreloadedState<Partial<RootState>>) => {
    return configureStore({
        reducer: {
            [beerApi.reducerPath]: beerApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(beerApi.middleware),
      preloadedState
    })
  }

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch