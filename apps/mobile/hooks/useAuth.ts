import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginUser, registerUser, logout, fetchProfile } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = (email: string, password: string) => {
    return dispatch(loginUser({ email, password })).unwrap();
  };

  const register = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    return dispatch(registerUser(userData)).unwrap();
  };

  const getProfile = () => {
    return dispatch(fetchProfile()).unwrap();
  };

  const signOut = () => {
    dispatch(logout());
  };

  const updateProfile = (userData: any) => {
    // Implementation for updating profile
  };

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    register,
    getProfile,
    logout: signOut,
    updateUser: updateProfile,
  };
};