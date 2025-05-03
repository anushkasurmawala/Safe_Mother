import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Vaccine {
  id: string;
  name: string;
  ageRange: string;
  description: string;
  isRequired: boolean;
  doses: number;
  notes?: string;
}

const VACCINES: Vaccine[] = [
  {
    id: '1',
    name: 'BCG',
    ageRange: 'At birth',
    description: 'Protects against tuberculosis',
    isRequired: true,
    doses: 1,
    notes: 'Given within 24 hours of birth',
  },
  {
    id: '2',
    name: 'Hepatitis B',
    ageRange: 'At birth, 6 weeks, 14 weeks',
    description: 'Prevents hepatitis B infection',
    isRequired: true,
    doses: 3,
    notes: 'First dose within 24 hours of birth',
  },
  {
    id: '3',
    name: 'OPV (Oral Polio Vaccine)',
    ageRange: '6 weeks, 10 weeks, 14 weeks',
    description: 'Protects against polio',
    isRequired: true,
    doses: 3,
  },
  {
    id: '4',
    name: 'DTaP',
    ageRange: '6 weeks, 10 weeks, 14 weeks',
    description: 'Protects against diphtheria, tetanus, and pertussis',
    isRequired: true,
    doses: 3,
  },
  {
    id: '5',
    name: 'Hib',
    ageRange: '6 weeks, 10 weeks, 14 weeks',
    description: 'Protects against Haemophilus influenzae type b',
    isRequired: true,
    doses: 3,
  },
  {
    id: '6',
    name: 'PCV',
    ageRange: '6 weeks, 10 weeks, 14 weeks',
    description: 'Protects against pneumococcal disease',
    isRequired: true,
    doses: 3,
  },
  {
    id: '7',
    name: 'Rotavirus',
    ageRange: '6 weeks, 10 weeks, 14 weeks',
    description: 'Prevents rotavirus gastroenteritis',
    isRequired: false,
    doses: 3,
  },
  {
    id: '8',
    name: 'MMR',
    ageRange: '9 months',
    description: 'Protects against measles, mumps, and rubella',
    isRequired: true,
    doses: 1,
  },
];

const VaccineCard = ({ vaccine, onPress }: { vaccine: Vaccine; onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.vaccineName}>{vaccine.name}</Text>
        <Text style={styles.ageRange}>{vaccine.ageRange}</Text>
      </View>
      {vaccine.isRequired && (
        <View style={styles.requiredBadge}>
          <Text style={styles.requiredText}>Required</Text>
        </View>
      )}
    </View>
    
    <Text style={styles.description}>{vaccine.description}</Text>
    
    <View style={styles.footer}>
      <View style={styles.doseContainer}>
        <Ionicons name="medical" size={16} color="#007AFF" />
        <Text style={styles.doseText}>{vaccine.doses} dose{vaccine.doses > 1 ? 's' : ''}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </View>
  </TouchableOpacity>
);

export const VaccineGuideScreen = () => {
  const [filter, setFilter] = useState<'all' | 'required'>('all');

  const filteredVaccines = filter === 'all'
    ? VACCINES
    : VACCINES.filter(vaccine => vaccine.isRequired);

  const handleVaccinePress = (vaccine: Vaccine) => {
    Alert.alert(
      vaccine.name,
      `Age Range: ${vaccine.ageRange}\n\n${vaccine.description}\n\nDoses Required: ${vaccine.doses}${vaccine.notes ? `\n\nNote: ${vaccine.notes}` : ''}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Newborn Vaccine Guide</Text>
        <Text style={styles.subtitle}>
          Recommended immunization schedule for your baby
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
            All Vaccines
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'required' && styles.activeFilter]}
          onPress={() => setFilter('required')}
        >
          <Text style={[styles.filterText, filter === 'required' && styles.activeFilterText]}>
            Required Only
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.vaccineList}>
        {filteredVaccines.map((vaccine) => (
          <VaccineCard
            key={vaccine.id}
            vaccine={vaccine}
            onPress={() => handleVaccinePress(vaccine)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  vaccineList: {
    padding: 16,
  },
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ageRange: {
    fontSize: 14,
    color: '#666',
  },
  requiredBadge: {
    backgroundColor: '#E3F2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requiredText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  doseText: {
    fontSize: 14,
    color: '#666',
  },
});
