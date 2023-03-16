import { createSlice } from '@reduxjs/toolkit';

export const cartslice = createSlice({
  name: 'cart',
  initialState: {
    cart: 0,
    products: []
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload + 1;
    },
    cartProduct: (state, action) => {
      console.log("added product is",action.payload);
      state.products.push(action.payload)
    },
    removeItem: ( state, action) => {
      console.log(action);
      state.products.splice(action.payload,1);
      state.cart = state.cart-1; 
    },
  }
});

// this is for dispatch
export const {updateCart, cartProduct, removeItem } = cartslice.actions;

// this is for configureStore
export default cartslice.reducer;