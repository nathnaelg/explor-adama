import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  price: number;
  category: string;
  availableTickets: number;
  totalTickets: number;
  organizer: {
    name: string;
    email: string;
    phone: string;
  };
  tags: string[];
}

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Mock event data - replace with actual API call
  const event: Event = {
    id: id as string,
    title: 'Tirana Food Festival 2024',
    description: 'Annual food festival featuring the best restaurants and chefs in Tirana. Experience the finest Albanian cuisine and international dishes.',
    fullDescription: 'Join us for the biggest food festival in Tirana! This annual event brings together the best restaurants, chefs, and food vendors from across Albania. Experience traditional Albanian dishes, modern fusion cuisine, cooking demonstrations, live music, and much more.',
    image: 'https://via.placeholder.com/400x250?text=Food+Festival',
    date: '2024-03-15',
    time: '18:00',
    endTime: '23:00',
    location: 'Skanderbeg Square, Tirana',
    address: 'Sheshi Skënderbej, Tirana 1001',
    price: 15.00,
    category: 'Food & Drink',
    availableTickets: 45,
    totalTickets: 200,
    organizer: {
      name: 'Tirana Events',
      email: 'events@tirana.al',
      phone: '+355 123 456 789',
    },
    tags: ['food', 'festival', 'music', 'family'],
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBookTicket = () => {
    // Navigate to booking screen
    router.push(`/events/book?eventId=${event.id}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Event Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.price}>${event.price.toFixed(2)}</Text>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          {/* Event Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>
                  {formatDate(event.date)}, {event.time} - {event.endTime}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{event.location}</Text>
                <Text style={styles.detailSubtext}>{event.address}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="person-outline" size={20} color="#666" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Organizer</Text>
                <Text style={styles.detailValue}>{event.organizer.name}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="ticket-outline" size={20} color="#666" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Available Tickets</Text>
                <Text style={styles.detailValue}>
                  {event.availableTickets} of {event.totalTickets} remaining
                </Text>
              </View>
            </View>
          </View>

          {/* Full Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Event</Text>
            <Text style={styles.fullDescription}>{event.fullDescription}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {event.tags.map((tag: string, index: number) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Booking Footer */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerPrice}>${event.price.toFixed(2)}</Text>
          <Text style={styles.footerTickets}>
            {event.availableTickets} tickets left
          </Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.bookButton,
            event.availableTickets === 0 && styles.bookButtonDisabled
          ]}
          onPress={handleBookTicket}
          disabled={event.availableTickets === 0}
        >
          <Text style={styles.bookButtonText}>
            {event.availableTickets === 0 ? 'Sold Out' : 'Book Tickets'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailText: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  detailSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  fullDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  footerInfo: {
    flex: 1,
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  footerTickets: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});