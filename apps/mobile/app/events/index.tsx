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
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  availableTickets: number;
  isFeatured: boolean;
}

interface Category {
  id: string;
  name: string;
}

const eventsData: Event[] = [
  {
    id: '1',
    title: 'Tirana Food Festival 2024',
    description: 'Annual food festival featuring the best restaurants and chefs in Tirana',
    image: 'https://via.placeholder.com/400x250?text=Food+Festival',
    date: '2024-03-15',
    time: '18:00',
    location: 'Skanderbeg Square, Tirana',
    price: 15.00,
    category: 'Food & Drink',
    availableTickets: 45,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Albania Tech Summit',
    description: 'Technology conference featuring industry leaders and innovators',
    image: 'https://via.placeholder.com/400x250?text=Tech+Summit',
    date: '2024-04-20',
    time: '09:00',
    location: 'Tirana International Hotel',
    price: 25.00,
    category: 'Technology',
    availableTickets: 120,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Traditional Music Night',
    description: 'An evening of traditional Albanian music and dance performances',
    image: 'https://via.placeholder.com/400x250?text=Music+Night',
    date: '2024-02-28',
    time: '20:00',
    location: 'National Theater, Tirana',
    price: 10.00,
    category: 'Music',
    availableTickets: 89,
    isFeatured: false,
  },
];

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState<Event[]>(eventsData);

  const categories: Category[] = [
    { id: 'all', name: 'All Events' },
    { id: 'Food & Drink', name: 'Food & Drink' },
    { id: 'Technology', name: 'Technology' },
    { id: 'Music', name: 'Music' },
    { id: 'Arts', name: 'Arts' },
    { id: 'Sports', name: 'Sports' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <Link href={`/events/${item.id}` as any} asChild>
      <TouchableOpacity style={styles.eventCard}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        {item.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventPrice}>${item.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.eventDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.eventDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{formatDate(item.date)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{item.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.detailText} numberOfLines={1}>
                {item.location}
              </Text>
            </View>
          </View>
          <View style={styles.eventFooter}>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketText}>
                {item.availableTickets} tickets left
              </Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events & Tickets</Text>
        <Text style={styles.subtitle}>Discover amazing events in your city</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category: Category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List */}
      <FlatList
        data={events}
        renderItem={renderEvent}
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
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    marginRight: 8,
  },
  categoryTabActive: {
    backgroundColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  eventPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketInfo: {
    flex: 1,
  },
  ticketText: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});