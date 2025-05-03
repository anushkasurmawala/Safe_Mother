import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type VideoConsultationProps = {
  route: {
    params: {
      doctorId: string;
      doctorName: string;
      consultationFee: number;
    };
  };
};

export const VideoConsultationScreen = ({ route }: VideoConsultationProps) => {
  const { doctorName, consultationFee } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.fee}>Consultation Fee: ${consultationFee}</Text>
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="mic" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.endCall]}>
          <Ionicons name="call" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="videocam" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  infoContainer: {
    padding: 16,
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  fee: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 8,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCall: {
    backgroundColor: '#FF3B30',
  },
});
