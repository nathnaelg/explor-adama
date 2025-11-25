import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Banner {
  id: string;
  image: string;
  url: string;
}

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  return (
    <View style={styles.container}>
      {banners.map((banner) => (
        <View key={banner.id} style={styles.bannerContainer}>
          <Image source={{ uri: banner.image }} style={styles.bannerImage} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  bannerContainer: {
    width: width - 40,
    height: 70,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});