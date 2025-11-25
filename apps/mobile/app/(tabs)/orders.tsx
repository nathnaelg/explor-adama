import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface OrderItem {
  id: string;
  restaurant: {
    name: string;
    image: string;
  };
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  date: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

const ordersData: OrderItem[] = [
  {
    id: '1',
    restaurant: {
      name: 'Pizza Hut',
      image: 'https://via.placeholder.com/60x60?text=PH',
    },
    items: ['Pepperoni Pizza', 'Garlic Bread'],
    total: 24.98,
    status: 'delivered',
    date: '2024-01-15',
    trackingNumber: 'TRK123456',
    estimatedDelivery: '25-35 min',
  },
  {
    id: '2',
    restaurant: {
      name: 'SPAR Market',
      image: 'https://via.placeholder.com/60x60?text=SP',
    },
    items: ['Milk', 'Bread', 'Eggs'],
    total: 15.47,
    status: 'delivering',
    date: '2024-01-14',
    trackingNumber: 'TRK123457',
    estimatedDelivery: '15-25 min',
  },
  {
    id: '3',
    restaurant: {
      name: 'ABC Pharmacy',
      image: 'https://via.placeholder.com/60x60?text=AP',
    },
    items: ['Vitamin C', 'Pain Relief'],
    total: 12.99,
    status: 'preparing',
    date: '2024-01-14',
    trackingNumber: 'TRK123458',
    estimatedDelivery: '20-30 min',
  },
];

const statusConfig = {
  pending: { color: '#FFA500', label: 'Pending', icon: 'time' },
  confirmed: { color: '#2196F3', label: 'Confirmed', icon: 'checkmark-circle' },
  preparing: { color: '#FF9800', label: 'Preparing', icon: 'restaurant' },
  delivering: { color: '#4CAF50', label: 'On the way', icon: 'car' },
  delivered: { color: '#666', label: 'Delivered', icon: 'checkmark-done' },
  cancelled: { color: '#F44336', label: 'Cancelled', icon: 'close-circle' },
};

type StatusKey = keyof typeof statusConfig;

export default function OrdersScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<StatusKey | 'all'>('all');

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredOrders = selectedFilter === 'all' 
    ? ordersData 
    : ordersData.filter(order => order.status === selectedFilter);

  const renderOrder = ({ item }: { item: OrderItem }) => {
    const status = statusConfig[item.status as StatusKey];
    
    return (
      <Link href={{ pathname: '/orders/[id]', params: { id: item.id } }} asChild>
        <TouchableOpacity style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Image source={{ uri: item.restaurant.image }} style={styles.restaurantImage} />
            <View style={styles.orderInfo}>
              <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
              <Ionicons name={status.icon as any} size={16} color={status.color} />
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          </View>
          
          <View style={styles.orderDetails}>
            <Text style={styles.itemsText} numberOfLines={1}>
              {item.items.join(', ')}
            </Text>
            <Text style={styles.totalText}>${item.total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.orderFooter}>
            <Text style={styles.trackingText}>Tracking: {item.trackingNumber}</Text>
            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Track your orders and deliveries</Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {(['all', 'preparing', 'delivering', 'delivered'] as const).map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter === 'all' ? 'All Orders' : statusConfig[filter as StatusKey]?.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No orders found</Text>
            <Text style={styles.emptyStateText}>
              {selectedFilter === 'all' 
                ? "You haven't placed any orders yet"
                : `No ${statusConfig[selectedFilter as StatusKey]?.label.toLowerCase()} orders`
              }
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackingText: {
    fontSize: 12,
    color: '#999',
  },
  trackButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});