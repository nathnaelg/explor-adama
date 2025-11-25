import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
}

export function IconSymbol({ name, size = 24, color = '#000' }: IconSymbolProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text style={[styles.icon, { fontSize: size, color }]}>
        {getIconSymbol(name)}
      </Text>
    </View>
  );
}

function getIconSymbol(name: string): string {
  const iconMap: { [key: string]: string } = {
    'home': '🏠',
    'blog': '📝',
    'profile': '👤',
    'food': '🍕',
    'grocery': '🛒',
    'pharmacy': '💊',
    'electronics': '📱',
    'fashion': '👕',
    'home-service': '🏡',
    'cart': '🛍️',
    'heart': '❤️',
    'star': '⭐',
  };
  
  return iconMap[name] || '❓';
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});