import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Service } from '../types';

const initialState: CartState = {
  items: [],
  total: 0,
  restaurant: null,
  deliveryFee: 2.99,
  serviceFee: 1.99,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ service: Service; quantity: number }>) => {
      const { service, quantity } = action.payload;
      const existingItem = state.items.find(item => item.service.id === service.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: Date.now().toString(),
          service,
          quantity,
        });
      }
      
      state.total = calculateTotal(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      
      state.total = calculateTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.restaurant = null;
    },
    setRestaurant: (state, action: PayloadAction<Service>) => {
      state.restaurant = action.payload;
    },
  },
});

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.service.price * item.quantity), 0);
};

export const { addItem, removeItem, updateQuantity, clearCart, setRestaurant } = cartSlice.actions;
export default cartSlice.reducer;