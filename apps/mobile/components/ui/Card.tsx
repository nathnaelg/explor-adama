import React from 'react';
import { Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(href);
    
    if (supported) {
      await Linking.openURL(href);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{children}</Text>
      <Ionicons name="open-outline" size={16} color="#007AFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#007AFF',
    marginRight: 4,
  },
});