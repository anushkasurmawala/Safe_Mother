import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DoctorCard } from '../../components/Doctor/DoctorCard';

const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Obstetrician & Gynecologist',
    experience: 12,
    rating: 4.8,
    availability: 'Available Now',
    consultationFee: 50,
    imageUrl: 'https://example.com/doctor1.jpg',
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Maternal-Fetal Medicine',
    experience: 15,
    rating: 4.9,
    availability: 'Available in 30 mins',
    consultationFee: 60,
    imageUrl: 'https://example.com/doctor2.jpg',
    available: true,
  },
  {
    id: '3',
    name: 'Dr. Emily Wilson',
    specialty: 'Obstetrician & Gynecologist',
    experience: 8,
    rating: 4.7,
    availability: 'Offline',
    consultationFee: 45,
    imageUrl: 'https://example.com/doctor3.jpg',
    available: false,
  },
];

export const DoctorOnDemandScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredDoctors = MOCK_DOCTORS.filter(doctor =>
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(query.toLowerCase())
    );
    setDoctors(filteredDoctors);
  };

  const handleDoctorSelect = (doctorId: string) => {
    const selectedDoctor = doctors.find(doc => doc.id === doctorId);
    if (selectedDoctor?.available) {
      navigation.navigate('VideoConsultation', { 
        doctorId,
        doctorName: selectedDoctor.name,
        consultationFee: selectedDoctor.consultationFee 
      });
    } else {
      Alert.alert('Doctor Unavailable', 'Please select another doctor who is currently available.');
    }
  };

  const renderDoctorCard = ({ item }: { item: typeof MOCK_DOCTORS[0] }) => (
    <DoctorCard
      {...item}
      onPress={handleDoctorSelect}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Video Consultation</Text>
        <Text style={styles.subHeaderText}>Connect with doctors instantly</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors by name or specialty"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#007AFF" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="swap-vertical-outline" size={20} color="#007AFF" />
          <Text style={styles.filterButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderDoctorCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonText: {
    marginLeft: 4,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
