import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import CategoryGrid from '../../components/home/CategoryGrid';
import ServiceCard from '../../components/home/ServiceCard';
import BannerSlider from '../../components/home/BannerSlider';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  deliveryTime: string;
  isFeatured: boolean;
}

interface Banner {
  id: string;
  image: string;
  url: string;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const { items } = useCart();
  const [refreshing, setRefreshing] = useState(false);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      
      // Mock data - replace with actual API calls
      setCategories([
        { id: '1', name: 'Food', icon: 'fast-food', color: '#FF6B35' },
        { id: '2', name: 'Grocery', icon: 'cart', color: '#4CAF50' },
        { id: '3', name: 'Pharmacy', icon: 'medical', color: '#F44336' },
        { id: '4', name: 'Electronics', icon: 'phone-portrait', color: '#2196F3' },
        { id: '5', name: 'Fashion', icon: 'shirt', color: '#9C27B0' },
        { id: '6', name: 'Home', icon: 'home', color: '#FF9800' },
      ]);

      setFeaturedServices([
        {
          id: '1',
          name: 'Pizza Hut',
          description: 'Best pizza in town with quick delivery',
          price: 12.99,
          image: 'https://via.placeholder.com/300x200?text=Pizza+Hut',
          category: 'Food',
          rating: 4.5,
          deliveryTime: '25-35 min',
          isFeatured: true,
        },
        {
          id: '2',
          name: 'SPAR Market',
          description: 'Fresh groceries and household items',
          price: 8.99,
          image: 'https://via.placeholder.com/300x200?text=SPAR+Market',
          category: 'Grocery',
          rating: 4.2,
          deliveryTime: '15-25 min',
          isFeatured: true,
        },
        {
          id: '3',
          name: 'ABC Pharmacy',
          description: '24/7 pharmacy delivery',
          price: 5.99,
          image: 'https://via.placeholder.com/300x200?text=ABC+Pharmacy',
          category: 'Pharmacy',
          rating: 4.8,
          deliveryTime: '20-30 min',
          isFeatured: true,
        },
      ]);

      setBanners([
        { id: '1', image: 'https://via.placeholder.com/400x200?text=Special+Offer', url: '' },
        { id: '2', image: 'https://via.placeholder.com/400x200?text=Free+Delivery', url: '' },
        { id: '3', image: 'https://via.placeholder.com/400x200?text=New+Restaurants', url: '' },
      ]);

    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  };

  const handleServicePress = (service: Service) => {
    router.push({ pathname: '/services/[id]', params: { id: service.id } });
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hello, {user?.firstName} 👋</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color="#FF6B35" />
              <Text style={styles.location}>Tirana, Albania</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
            <Link href="/cart" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="cart-outline" size={24} color="#333" />
                {items.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{items.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => router.push('/search' as any)}
        >
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search for services, restaurants...</Text>
        </TouchableOpacity>

        {/* Banner Slider */}
        {banners.length > 0 && (
          <View style={styles.bannerSection}>
            <BannerSlider banners={banners} />
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Link href="/categories" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <CategoryGrid 
            categories={categories} 
            onCategoryPress={(category) => router.push({ pathname: '/services/category/[id]', params: { id: category.id } })}
          />
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Services</Text>
            <TouchableOpacity onPress={() => router.push('/services' as any)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                style={styles.serviceCard}
                onPress={() => handleServicePress(service)}
              />
            ))}
          </ScrollView>
          {featuredServices.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No featured services available</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/events' as any)}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#F0F8FF' }]}>
                <Ionicons name="calendar" size={24} color="#2196F3" />
              </View>
              <Text style={styles.actionText}>Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    marginLeft: 4,
    marginRight: 4,
    color: '#666',
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    margin: 20,
    marginTop: 10,
    marginBottom: 0,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchText: {
    marginLeft: 10,
    color: '#999',
    fontSize: 16,
  },
  bannerSection: {
    marginVertical: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  serviceCard: {
    marginLeft: 20,
    width: 280,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  actionCard: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  emptyState: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#999',
    fontSize: 16,
  },
});