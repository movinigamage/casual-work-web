import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "./reducers/rootReducer";
import thunk from "redux-thunk";

export function storeSettings() {
    return configureStore({
        reducer: rootReducer,
        middleware: [thunk]
    });
}
