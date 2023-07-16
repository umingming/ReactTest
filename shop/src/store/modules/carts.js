import { createSlice } from '@reduxjs/toolkit';

const carts = createSlice({
    name: 'carts',
    initialState: [
        { id: 0, title: 'White and Black', count: 2 },
        { id: 2, title: 'Grey Yordan', count: 1 },
    ],
    reducers: {
        increaseCount(state, { payload }) {
            const cart = state.find((i) => i.id === payload);
            cart.count += 1;
        },
        decreaseCount(state, { payload }) {
            const cart = state.find((i) => i.id === payload);
            cart.count -= cart.count > 0 ? 1 : 0;
        },
        removeCart(state, { payload }) {
            const filterCarts = state.filter((i) => i.id !== payload);
            return filterCarts;
        },
        addCart(state, { payload: { id, title } }) {
            const oldCart = state.find((i) => i.id === id);
            if (oldCart) {
                oldCart.count += 1;
            } else {
                const newCart = { id, title, count: 1 };
                state.push(newCart);
            }
        },
    },
});

export const {
    increaseCount, decreaseCount, removeCart, addCart,
} = carts.actions;
export default carts;
