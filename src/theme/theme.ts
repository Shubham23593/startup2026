import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightColors = {
  primary: '#6750A4',
  primaryContainer: '#EADDFF',
  secondary: '#625B71',
  tertiary: '#7D5260',
  background: '#FFFBFE',
  surface: '#FFFBFE',
  surfaceVariant: '#E7E0EC',
  error: '#B3261E',
  onPrimary: '#FFFFFF',
  onBackground: '#1C1B1F',
  gradientPrimary: ['#6750A4', '#7D5260'],
  gradientSecondary: ['#625B71', '#7D5260'],
  glass: 'rgba(255, 255, 255, 0.7)',
};

export const darkColors = {
  primary: '#D0BCFF',
  primaryContainer: '#4F378B',
  secondary: '#CCC2DC',
  tertiary: '#EFB8C8',
  background: '#1C1B1F',
  surface: '#1C1B1F',
  surfaceVariant: '#49454F',
  error: '#F2B8B5',
  onPrimary: '#381E72',
  onBackground: '#E6E0E9',
  gradientPrimary: ['#4F378B', '#7D5260'],
  gradientSecondary: ['#49454F', '#7D5260'],
  glass: 'rgba(28, 27, 31, 0.7)',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: lightColors.primary,
    primaryContainer: lightColors.primaryContainer,
    secondary: lightColors.secondary,
    tertiary: lightColors.tertiary,
    background: lightColors.background,
    surface: lightColors.surface,
    surfaceVariant: lightColors.surfaceVariant,
    error: lightColors.error,
  },
  roundness: 16,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkColors.primary,
    primaryContainer: darkColors.primaryContainer,
    secondary: darkColors.secondary,
    tertiary: darkColors.tertiary,
    background: darkColors.background,
    surface: darkColors.surface,
    surfaceVariant: darkColors.surfaceVariant,
    error: darkColors.error,
  },
  roundness: 16,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const gradients = {
  primary: ['#6750A4', '#7D5260'] as const,
  secondary: ['#625B71', '#7D5260'] as const,
  urgent: ['#B3261E', '#7D5260'] as const,
  success: ['#2E7D32', '#4CAF50'] as const,
};
