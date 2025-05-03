import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useUser } from '../../context/UserContext';

export const ProfileScreen = () => {
  const { user, updateUser, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    age: user?.age?.toString() || '',
    pregnancyWeek: user?.pregnancyWeek?.toString() || '',
    bloodType: user?.bloodType || ''
  });

  const handleSave = async () => {
    await updateUser({
      displayName: formData.displayName,
      age: parseInt(formData.age) || undefined,
      pregnancyWeek: parseInt(formData.pregnancyWeek) || undefined,
      bloodType: formData.bloodType
    });
    setIsEditing(false);
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.displayName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, displayName: text }))}
            />
          ) : (
            <Text style={styles.value}>{user?.displayName || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'Not set'}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Age</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.value}>{user?.age || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Pregnancy Week</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.pregnancyWeek}
              onChangeText={(text) => setFormData(prev => ({ ...prev, pregnancyWeek: text }))}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.value}>{user?.pregnancyWeek || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Blood Type</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.bloodType}
              onChangeText={(text) => setFormData(prev => ({ ...prev, bloodType: text }))}
            />
          ) : (
            <Text style={styles.value}>{user?.bloodType || 'Not set'}</Text>
          )}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  form: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
