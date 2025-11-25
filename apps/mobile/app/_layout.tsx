import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="services" />
        <Stack.Screen name="orders" />
        <Stack.Screen name="blog" />
        <Stack.Screen name="events" />
      </Stack>
    </Provider>
  );
}