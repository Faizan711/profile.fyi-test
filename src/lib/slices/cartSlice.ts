import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartState {
  items: { product: Product; quantity: number }[];
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.totalItems += 1;
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload.id
          );
        }
        state.totalItems -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
    },
    // Add more reducers as needed (removeFromCart, clearCart, etc.)
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
