import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

const rootReducer = combineReducers(reducers);

// export const setupStore = () => {
//     return configureStore({
//         reducer: rootReducer,
//     });
// };

// export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore["dispatch"];

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
