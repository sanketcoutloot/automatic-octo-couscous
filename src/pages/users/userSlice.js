import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos');
    let users = await response.json();
    return users;
});

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            // Add any fetched posts to the array
            state.users = state.users.concat(action.payload);
        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    },
});

// export const {} = userSlice.actions;
export const allUsers = (state) => state.users;
export default userSlice.reducer;
