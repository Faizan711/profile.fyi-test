import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productsData from "@/data/products.json";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartState {
  items: { product: Product; quantity: number }[];
  totalItems: number;
  subtotal: number;
  discount: number; // in percentage
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const product = productsData.find((p) => p.id === action.payload);
      if (product) {
        const existingItem = state.items.find(
          (item) => item.product.id === product.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ product, quantity: 1 });
        }
        state.totalItems += 1;
        state.subtotal = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== id);
        }
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.subtotal = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.product.id !== id);
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.subtotal = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
