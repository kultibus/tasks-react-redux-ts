import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

const rootReducer = combineReducers(reducers);

// export const setupStore = () => {
//     return configureStore({
//         reducer: rootReducer,
//     });
// };

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore["dispatch"];
