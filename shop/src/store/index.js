import { configureStore } from '@reduxjs/toolkit';
import user from './modules/userSlice';
import carts from './modules/carts';

export default configureStore({
    reducer: {
        user: user.reducer,
        carts: carts.reducer,
    },
});
