import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item?.id === newItem?.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                newItem.quantity = 1;
                state.items.push(newItem);
            }
            state.totalQuantity += 1;
            state.totalAmount += newItem?.price;
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find(item => item?.id === itemId);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item?.id !== itemId);
            } else {
                existingItem.quantity -= 1;
            }
            state.totalQuantity -= 1;
            state.totalAmount -= existingItem?.price;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    }
});
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;