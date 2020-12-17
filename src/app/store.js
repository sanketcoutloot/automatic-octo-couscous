import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../pages';

export default configureStore({
    reducer: {
        users: userSlice,
    },
});
