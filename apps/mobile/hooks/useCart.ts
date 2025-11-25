import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addItem, removeItem, updateQuantity, clearCart, setRestaurant } from '../store/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const addToCart = (service: any, quantity: number = 1) => {
    dispatch(addItem({ service, quantity }));
  };

  const removeFromCart = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const selectRestaurant = (restaurant: any) => {
    dispatch(setRestaurant(restaurant));
  };

  const getTotalWithFees = () => {
    return cart.total + cart.deliveryFee + cart.serviceFee;
  };

  return {
    items: cart.items,
    total: cart.total,
    restaurant: cart.restaurant,
    deliveryFee: cart.deliveryFee,
    serviceFee: cart.serviceFee,
    totalWithFees: getTotalWithFees(),
    addToCart,
    removeFromCart,
    updateQuantity: updateItemQuantity,
    clearCart: clearCartItems,
    setRestaurant: selectRestaurant,
  };
};