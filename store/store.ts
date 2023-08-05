import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoSlice from "@/store/todoSlice";

let store: ReturnType<typeof configStore>

const configStore = () => {
    const isServer = typeof window === "undefined";

    const rootReducer = combineReducers({
        [todoSlice.name]: todoSlice.reducer,
    });

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
        const persistConfig = {
            key: 'root',
            storage,
        };

        const persistedReducer = persistReducer(persistConfig, rootReducer);

        const store = configureStore({
            reducer: persistedReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    immutableCheck: false,
                    serializableCheck: false,
                }),
        });

        (store as any).__persistor = persistStore(store);

        return store;
    }
};

export const makeStore = () => {
    store = configStore();
    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

export { store };