import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { width } = Dimensions.get('window');

type SpacingType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export const spacingValues: SpacingType = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const spacing = spacingValues; // Just reusing the existing object

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  section: {
    padding: spacing.md, // Use spacing values properly
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },

  // Form styles
  input: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
    padding: spacing.sm,
    fontSize: 16,
    backgroundColor: colors.white,
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: colors.error,
  },
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },

  // Button styles
  button: {
    padding: spacing.md,
    borderRadius: 25, // More rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primaryLight,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonTextSecondary: {
    color: colors.primary,
  },

  // Card styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: 25,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 15,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },

  // Layout utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Feature-specific styles
  healthMetric: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 25,
    width: '48%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  emergencyButton: {
    backgroundColor: colors.emergency,  // Changed to emergency color
    padding: spacing.lg,
    borderRadius: 12,
    ...StyleSheet.absoluteFillObject,
    bottom: spacing.lg,
    marginHorizontal: spacing.md,
  },
  scanScheduleCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 6,    // Increased border width
    borderLeftColor: colors.primary,
  },
});
