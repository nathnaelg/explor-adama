import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  serviceCount: number;
  image: string;
}

const categoriesData: Category[] = [
  {
    id: '1',
    name: 'Food & Restaurants',
    icon: 'restaurant',
    color: '#FF6B35',
    description: 'Order from your favorite restaurants',
    serviceCount: 156,
    image: 'https://via.placeholder.com/300x200?text=Food',
  },
  {
    id: '2',
    name: 'Grocery',
    icon: 'cart',
    color: '#4CAF50',
    description: 'Fresh groceries and household items',
    serviceCount: 89,
    image: 'https://via.placeholder.com/300x200?text=Grocery',
  },
  {
    id: '3',
    name: 'Pharmacy',
    icon: 'medical',
    color: '#F44336',
    description: 'Medicines and healthcare products',
    serviceCount: 45,
    image: 'https://via.placeholder.com/300x200?text=Pharmacy',
  },
  {
    id: '4',
    name: 'Electronics',
    icon: 'phone-portrait',
    color: '#2196F3',
    description: 'Gadgets and electronics',
    serviceCount: 67,
    image: 'https://via.placeholder.com/300x200?text=Electronics',
  },
  {
    id: '5',
    name: 'Fashion',
    icon: 'shirt',
    color: '#9C27B0',
    description: 'Clothing and accessories',
    serviceCount: 123,
    image: 'https://via.placeholder.com/300x200?text=Fashion',
  },
  {
    id: '6',
    name: 'Home Services',
    icon: 'home',
    color: '#FF9800',
    description: 'Home maintenance and services',
    serviceCount: 78,
    image: 'https://via.placeholder.com/300x200?text=Home+Services',
  },
  {
    id: '7',
    name: 'Events & Tickets',
    icon: 'calendar',
    color: '#E91E63',
    description: 'Book events and buy tickets',
    serviceCount: 34,
    image: 'https://via.placeholder.com/300x200?text=Events',
  },
  {
    id: '8',
    name: 'Beauty & Spa',
    icon: 'sparkles',
    color: '#00BCD4',
    description: 'Salons and beauty services',
    serviceCount: 56,
    image: 'https://via.placeholder.com/300x200?text=Beauty',
  },
];

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>(categoriesData);

  useEffect(() => {
    if (searchQuery) {
      const filtered = categoriesData.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCategories(filtered);
    } else {
      setCategories(categoriesData);
    }
  }, [searchQuery]);

  const renderCategory = ({ item }: { item: Category }) => (
    <Link href={{ pathname: '/services/category/[id]', params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.categoryCard}>
        <View style={styles.categoryHeader}>
          <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon as any} size={24} color={item.color} />
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.serviceCount}>{item.serviceCount} services</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <Text style={styles.categoryDescription}>{item.description}</Text>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Explore all services</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
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
  searchContainer: {
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
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceCount: {
    fontSize: 14,
    color: '#666',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
});