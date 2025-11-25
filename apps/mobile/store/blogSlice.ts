import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost, Comment } from '../types';

interface BlogState {
  posts: BlogPost[];
  userPosts: BlogPost[];
  currentPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  userPosts: [],
  currentPost: null,
  isLoading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  'blog/create',
  async (postData: {
    title: string;
    content: string;
    images: string[];
    tags: string[];
    category: string;
  }) => {
    // Simulate API call
    const response = await new Promise<BlogPost>((resolve) => {
      setTimeout(() => {
        resolve({
          id: `POST-${Date.now()}`,
          ...postData,
          author: {
            id: '1',
            firstName: 'Current',
            lastName: 'User',
            email: 'user@example.com',
            phone: '+355123456789',
            avatar: 'https://via.placeholder.com/40',
            createdAt: new Date().toISOString(),
          },
          likes: 0,
          comments: 0,
          isLiked: false,
          createdAt: new Date().toISOString(),
        });
      }, 2000);
    });
    return response;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
    },
    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments += 1;
      }
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost>) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
        state.userPosts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create post';
      });
  },
});

export const { setPosts, likePost, addComment, setCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;