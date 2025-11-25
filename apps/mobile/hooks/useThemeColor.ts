import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof lightColors & keyof typeof darkColors
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme === 'light' ? lightColors[colorName] : darkColors[colorName];
  }
}

const lightColors = {
  background: '#ffffff',
  text: '#333333',
  tint: '#FF6B35',
  tabIconDefault: '#ccc',
  tabIconSelected: '#FF6B35',
};

const darkColors = {
  background: '#000000',
  text: '#ffffff',
  tint: '#FF6B35',
  tabIconDefault: '#ccc',
  tabIconSelected: '#FF6B35',
};