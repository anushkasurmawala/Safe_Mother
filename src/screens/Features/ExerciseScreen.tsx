import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ExerciseCard } from '../../components/Exercise/ExerciseCard';

export const colors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  primary: '#6200EE',
  warning: '#FFA000',
  border: '#E0E0E0',
  white: '#FFFFFF',
  text: {
    primary: '#000000',
    secondary: '#666666',
  }
};

// Mock data - replace with real data from your backend
const EXERCISES = [
  {
    id: '1',
    title: 'Prenatal Yoga',
    description: 'Gentle yoga poses to improve flexibility and reduce stress',
    duration: '20 mins',
    intensity: 'Low',
    trimester: [1, 2, 3],
    category: 'Yoga',
    imageUrl: 'https://example.com/prenatal-yoga.jpg',
  },
  {
    id: '2',
    title: 'Walking',
    description: 'Moderate-paced walking to maintain cardiovascular health',
    duration: '30 mins',
    intensity: 'Moderate',
    trimester: [1, 2, 3],
    category: 'Cardio',
    imageUrl: 'https://example.com/walking.jpg',
  },
  {
    id: '3',
    title: 'Kegel Exercises',
    description: 'Strengthen pelvic floor muscles',
    duration: '10 mins',
    intensity: 'Low',
    trimester: [1, 2, 3],
    category: 'Strength',
    imageUrl: 'https://example.com/kegel.jpg',
  },
  {
    id: '4',
    title: 'Swimming',
    description: 'Low-impact cardiovascular exercise',
    duration: '30 mins',
    intensity: 'Moderate',
    trimester: [1, 2, 3],
    category: 'Cardio',
    imageUrl: 'https://example.com/swimming.jpg',
  },
];

const CATEGORIES = ['All', 'Yoga', 'Cardio', 'Strength'];

export const ExerciseScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentTrimester, setCurrentTrimester] = useState(2); // This should come from user profile

  const filteredExercises = EXERCISES.filter(exercise => 
    (selectedCategory === 'All' || exercise.category === selectedCategory) &&
    exercise.trimester.includes(currentTrimester)
  );

  const handleExercisePress = (exercise: any) => {
    Alert.alert(
      'Start Exercise',
      `Would you like to start ${exercise.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start',
          onPress: () => {
            // Navigate to exercise detail/video screen
            // navigation.navigate('ExerciseDetail', { exercise });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pregnancy Exercises</Text>
        <Text style={styles.subtitle}>
          Safe exercises for trimester {currentTrimester}
        </Text>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ Always consult your healthcare provider before starting any exercise routine
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText,
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.exerciseList}>
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            title={exercise.title}
            description={exercise.description}
            duration={exercise.duration}
            intensity={exercise.intensity as 'Low' | 'Moderate' | 'High'}
            trimester={exercise.trimester}
            imageUrl={exercise.imageUrl}
            onPress={() => handleExercisePress(exercise)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
  disclaimer: {
    backgroundColor: colors.warning + '20',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  disclaimerText: {
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: colors.white,
  },
  exerciseList: {
    padding: 16,
  },
});
