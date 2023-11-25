import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      return [...state, ...action.payload];
    },
    checkoutCart: (state, action) => {
      return [];
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(item => item.id === newItem.id);

      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        existingItem.qty += 1;
      } else {
        // If the item is not in the cart, add it with quantity 1
        return [...state, { ...newItem, qty: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((shoe) => action.payload !== shoe.id);
    },
    increaseQty: (state, action) => {
      return state.map((shoe) =>
        shoe.id === action.payload ? { ...shoe, qty: shoe.qty + 1 } : shoe
      );
    },
    decreaseQty: (state, action) => {
      return state.map((shoe) =>
        shoe.id === action.payload ? { ...shoe, qty: shoe.qty - 1 } : shoe
      );
    },
  },
});

export const {
  setCartFromLocalStorage,
  checkoutCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = CartSlice.actions;
export default CartSlice.reducer;
