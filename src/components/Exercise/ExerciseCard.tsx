import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseCardProps {
  title: string;
  description: string;
  duration: string;
  intensity: 'Low' | 'Moderate' | 'High';
  trimester: number[];
  imageUrl?: string;
  onPress: () => void;
}

export const ExerciseCard = ({
  title,
  description,
  duration,
  intensity,
  trimester,
  imageUrl,
  onPress,
}: ExerciseCardProps) => {
  const getIntensityColor = () => {
    switch (intensity) {
      case 'Low':
        return '#34C759';
      case 'Moderate':
        return '#FFB100';
      case 'High':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="fitness" size={40} color="#ccc" />
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        
        <View style={styles.metadata}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons name="speedometer-outline" size={16} color={getIntensityColor()} />
            <Text style={[styles.metaText, { color: getIntensityColor() }]}>
              {intensity}
            </Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.metaText}>
              Trimester {trimester.join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: '100%',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
});
