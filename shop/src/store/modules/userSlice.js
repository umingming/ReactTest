import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: { name: '유미', age: 28 },
    reducers: {
        increaseAge(state) {
            const { name, age } = state;
            return { name, age: age + 1 };
        },
    },
});
export const { increaseAge } = user.actions;
export default user;
