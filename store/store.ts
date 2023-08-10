import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoSlice from "@/store/todoSlice";

// Declare the store variable to use outside of components / pages
let store: ReturnType<typeof configStore>;

// Configuration function to create the Redux store
const configStore = () => {
    // Flag that determines if the code is running on the server
    const isServer = typeof window === "undefined";

    // Combine reducers (only todoSlice in this case)
    const rootReducer = combineReducers({
        [todoSlice.name]: todoSlice.reducer,
    });

    // Configure the store for server-side rendering
    if (isServer) {
        return configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    immutableCheck: false,
                    serializableCheck: false,
                }),
        });
    } else {
        // Configuration for client-side rendering with persistence
        const persistConfig = {
            key: 'root',
            storage,
        };

        // Create a persisted reducer
        const persistedReducer = persistReducer(persistConfig, rootReducer);

        // Configure the store with persisted reducer
        const store = configureStore({
            reducer: persistedReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    immutableCheck: false,
                    serializableCheck: false,
                }),
        });

        // Create the persistor property for the store (a bit hacky)
        (store as any).__persistor = persistStore(store);

        return store;
    }
};

// Create the store and export it
export const makeStore = () => {
    store = configStore();
    return store;
};

// Define types for the store and its state
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

// Create a wrapper for the store using next-redux-wrapper
export const wrapper = createWrapper<AppStore>(makeStore);

// Export the store for manual usage if needed
export { store };