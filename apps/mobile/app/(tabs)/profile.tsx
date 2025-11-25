import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Switch,
} from 'react-native';
import { Link, router, Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

interface MenuItem {
  icon: string;
  label: string;
  screen?: any; // Changed to any to handle dynamic routes
  type: 'link' | 'toggle' | 'value';
  value?: string | boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: 'Account',
    items: [
      {
        icon: 'person-outline',
        label: 'Edit Profile',
        screen: 'edit',
        type: 'link',
      },
      {
        icon: 'location-outline',
        label: 'My Addresses',
        screen: 'addresses',
        type: 'link',
      },
      {
        icon: 'card-outline',
        label: 'Payment Methods',
        screen: 'payments',
        type: 'link',
      },
      {
        icon: 'heart-outline',
        label: 'Favorites',
        screen: 'favorites',
        type: 'link',
      },
    ],
  },
  {
    title: 'Orders & Activities',
    items: [
      {
        icon: 'receipt-outline',
        label: 'My Orders',
        screen: '/orders',
        type: 'link',
      },
      {
        icon: 'star-outline',
        label: 'My Reviews',
        screen: 'reviews',
        type: 'link',
      },
      {
        icon: 'newspaper-outline',
        label: 'My Blog Posts',
        screen: 'posts',
        type: 'link',
      },
      {
        icon: 'calendar-outline',
        label: 'My Event Bookings',
        screen: 'events',
        type: 'link',
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        icon: 'notifications-outline',
        label: 'Push Notifications',
        type: 'toggle',
        value: true,
      },
      {
        icon: 'language-outline',
        label: 'Language',
        value: 'English',
        type: 'value',
      },
      {
        icon: 'moon-outline',
        label: 'Dark Mode',
        type: 'toggle',
        value: false,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        icon: 'help-circle-outline',
        label: 'Help & Support',
        screen: '/support',
        type: 'link',
      },
      {
        icon: 'information-circle-outline',
        label: 'About Us',
        screen: '/about',
        type: 'link',
      },
      {
        icon: 'document-text-outline',
        label: 'Terms of Service',
        screen: '/terms',
        type: 'link',
      },
      {
        icon: 'shield-checkmark-outline',
        label: 'Privacy Policy',
        screen: '/privacy',
        type: 'link',
      },
    ],
  },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.type === 'link') {
      return (
        <Link href={item.screen} asChild key={index}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name={item.icon as any} size={24} color="#666" />
            <Text style={styles.menuText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </Link>
      );
    }

    if (item.type === 'toggle') {
      return (
        <View style={styles.menuItem} key={index}>
          <Ionicons name={item.icon as any} size={24} color="#666" />
          <Text style={styles.menuText}>{item.label}</Text>
          <Switch
            value={item.label === 'Push Notifications' ? notificationsEnabled : darkModeEnabled}
            onValueChange={item.label === 'Push Notifications' ? setNotificationsEnabled : setDarkModeEnabled}
            trackColor={{ false: '#f0f0f0', true: '#FF6B35' }}
          />
        </View>
      );
    }

    if (item.type === 'value') {
      return (
        <TouchableOpacity style={styles.menuItem} key={index}>
          <Ionicons name={item.icon as any} size={24} color="#666" />
          <Text style={styles.menuText}>{item.label}</Text>
          <Text style={styles.menuValue}>{item.value}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user?.avatar || 'https://via.placeholder.com/100x100?text=User' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userPhone}>{user?.phone}</Text>
          </View>
          <Link href={'/profile/edit' as any} asChild>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="#FF6B35" />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuItems}>
              {section.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.version}>
          <Text style={styles.versionText}>WIA Albania v1.0.0</Text>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#999',
  },
  editButton: {
    padding: 8,
    backgroundColor: '#FFF5F2',
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  menuSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  menuItems: {
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  menuValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 20,
    marginTop: 30,
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
  version: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});