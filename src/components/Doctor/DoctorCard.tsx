import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DoctorProps {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  availability: string;
  imageUrl?: string;
  onPress: (doctorId: string) => void;
}

export const DoctorCard = ({
  id,
  name,
  specialty,
  experience,
  rating,
  availability,
  imageUrl,
  onPress,
}: DoctorProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id)}>
      <View style={styles.doctorInfo}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="person" size={30} color="#666" />
            </View>
          )}
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.specialty}>{specialty}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.statText}>{experience} years</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="star" size={16} color="#FFB100" />
              <Text style={styles.statText}>{rating}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.availability}>{availability}</Text>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => onPress(id)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  availability: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
