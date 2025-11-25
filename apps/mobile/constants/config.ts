export const CONFIG = {
  API: {
    BASE_URL: 'https://api.wia.al/v1', // WIA Albania actual API
    TIMEOUT: 15000,
  },
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
      LOGOUT: '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    SERVICES: {
      CATEGORIES: '/categories',
      SERVICES: '/services',
      FEATURED: '/services/featured',
      NEARBY: '/services/nearby',
      SEARCH: '/services/search',
      BY_CATEGORY: '/services/category',
    },
    ORDERS: {
      CREATE: '/orders',
      LIST: '/orders',
      DETAIL: '/orders',
      TRACK: '/orders/track',
      CANCEL: '/orders/cancel',
    },
    BLOG: {
      POSTS: '/blog/posts',
      CREATE: '/blog/posts',
      DETAIL: '/blog/posts',
      COMMENTS: '/blog/comments',
      LIKES: '/blog/likes',
    },
    EVENTS: {
      LIST: '/events',
      DETAIL: '/events',
      BOOK: '/events/book',
      TICKETS: '/events/tickets',
    },
    USER: {
      PROFILE: '/user/profile',
      ADDRESSES: '/user/addresses',
      PAYMENT_METHODS: '/user/payment-methods',
      FAVORITES: '/user/favorites',
    },
    CART: {
      ADD: '/cart/add',
      REMOVE: '/cart/remove',
      UPDATE: '/cart/update',
      CLEAR: '/cart/clear',
    },
    PAYMENT: {
      INITIALIZE: '/payment/initialize',
      VERIFY: '/payment/verify',
      METHODS: '/payment/methods',
    },
  },
};

export const APP = {
  NAME: 'WIA Albania',
  VERSION: '1.0.0',
};