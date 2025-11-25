import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

interface ServiceCardProps {
  service: Service;
  onPress?: (service: Service) => void;
  style?: any;
}

export default function ServiceCard({ service, onPress, style }: ServiceCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, style]}
      onPress={() => onPress?.(service)}
    >
      <Image source={{ uri: service.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{service.rating}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.deliveryTime}>{service.deliveryTime}</Text>
          <Text style={styles.price}>${service.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});