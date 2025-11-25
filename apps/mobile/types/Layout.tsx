import { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface LayoutProps {
  children: ReactNode;
  style?: ViewStyle | TextStyle | ImageStyle;
}

export interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}