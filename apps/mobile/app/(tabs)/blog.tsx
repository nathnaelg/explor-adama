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
  RefreshControl,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

interface BlogPost {
  id: string;
  title?: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  images: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
  createdAt: string;
  category?: string;
  readTime: string;
  name?: string;
  avatar?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Best Pizza Places in Tirana',
    content: 'After trying countless pizza places across Tirana, Ive compiled my top 5 favorites that never disappoint...',
    author: {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40?text=JD',
    },
    images: ['https://via.placeholder.com/400x250?text=Pizza+Review'],
    likes: 124,
    comments: 23,
    isLiked: false,
    tags: ['food', 'pizza', 'tirana', 'review'],
    createdAt: '2 hours ago',
    category: 'Food',
    readTime: '5 min read',
  },
  {
    id: '2',
    content: 'Just discovered this amazing grocery delivery service! The quality is exceptional and delivery was super fast...',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40x40?text=SW',
    },
    images: ['https://via.placeholder.com/400x250?text=Grocery+Tips'],
    likes: 89,
    comments: 15,
    isLiked: true,
    tags: ['grocery', 'delivery', 'tips'],
    createdAt: '1 day ago',
    readTime: '3 min read',
  },
  {
    id: '3',
    content: 'Essential medicines you should always have at home. A comprehensive guide to building your home pharmacy...',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://via.placeholder.com/40x40?text=MJ',
    },
    images: ['https://via.placeholder.com/400x250?text=Health+Tips'],
    likes: 156,
    comments: 34,
    isLiked: false,
    tags: ['health', 'pharmacy', 'medicine'],
    createdAt: '2 days ago',
    readTime: '7 min read',
  },
];

interface Category {
  id: string;
  name: string;
}

export default function BlogScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);

  const categories: Category[] = [
    { id: 'all', name: 'All' },
    { id: 'food', name: 'Food' },
    { id: 'grocery', name: 'Grocery' },
    { id: 'health', name: 'Health' },
    { id: 'tips', name: 'Tips' },
    { id: 'review', name: 'Reviews' },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLike = (postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const renderPost = ({ item }: { item: BlogPost }) => (
    <Link href={`/blog/${item.id}`} asChild>
      <TouchableOpacity style={styles.postCard}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.postMeta}>
              {item.createdAt} • {item.readTime}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {item.title && (
          <Text style={styles.postTitle}>{item.title}</Text>
        )}
        
        <Text style={styles.postContent} numberOfLines={3}>
          {item.content}
        </Text>

        {item.images.length > 0 && (
          <Image source={{ uri: item.images[0] }} style={styles.postImage} />
        )}

        <View style={styles.tagsContainer}>
          {item.tags.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.postFooter}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <Ionicons 
              name={item.isLiked ? "heart" : "heart-outline"} 
              size={20} 
              color={item.isLiked ? "#FF6B35" : "#666"} 
            />
            <Text style={[styles.actionText, item.isLiked && styles.likedText]}>
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={18} color="#666" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={18} color="#666" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Community Blog</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => router.push('/blog/create' as any)}
          >
            <Ionicons name="create-outline" size={24} color="#FF6B35" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Share experiences and discover tips</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search blog posts..."
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

      {/* Blog Posts */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    padding: 8,
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
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  postMeta: {
    fontSize: 12,
    color: '#999',
  },
  moreButton: {
    padding: 4,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  postContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});