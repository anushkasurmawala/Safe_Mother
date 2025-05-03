import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { globalStyles } from '../styles/globalStyles';

export const ExampleComponent = () => {
  return (
    <View style={globalStyles.container}>
      {/* Using typography */}
      <Text style={typography.h1}>Welcome</Text>
      <Text style={typography.body}>Your next appointment is scheduled.</Text>
      
      {/* Using global button styles */}
      <TouchableOpacity 
        style={[
          globalStyles.button,
          { marginTop: 16 }
        ]}
      >
        <Text style={globalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Using layout utilities */}
      <View style={[globalStyles.row, { gap: 8 }]}>
        <View style={globalStyles.healthMetric}>
          <Text style={typography.h3}>Blood Pressure</Text>
        </View>
        <View style={globalStyles.healthMetric}>
          <Text style={typography.h3}>Heart Rate</Text>
        </View>
      </View>
    </View>
  );
};
