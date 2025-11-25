import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderItem } from '../types';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData: {
    items: OrderItem[];
    total: number;
    deliveryAddress: string;
    paymentMethod: string;
  }) => {
    // Simulate API call
    const response = await new Promise<Order>((resolve) => {
      setTimeout(() => {
        resolve({
          id: `ORD-${Date.now()}`,
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          restaurant: {
            id: '1',
            name: 'Test Restaurant',
            image: 'https://via.placeholder.com/100',
            description: 'Test description',
            price: 0,
            category: 'Food',
            rating: 4.5,
            deliveryTime: '25-35 min',
            isFeatured: true,
            isOpen: true,
            tags: [],
          },
          trackingNumber: `TRK-${Date.now()}`,
        });
      }, 2000);
    });
    return response;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
      if (state.currentOrder && state.currentOrder.id === action.payload.orderId) {
        state.currentOrder.status = action.payload.status;
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create order';
      });
  },
});

export const { setOrders, updateOrderStatus, clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;