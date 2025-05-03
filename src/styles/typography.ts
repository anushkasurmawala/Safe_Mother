import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
    textShadowColor: colors.shadowColor,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  h2: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bodySecondary: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: colors.text.light,
    lineHeight: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  // New styles for better text hierarchy
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 4,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: 'underline',
  }
});
