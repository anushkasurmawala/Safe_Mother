import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MaternalHealthData } from '../types/health';
import { getPrediction } from './predictionService';

export const saveHealthData = async (data: MaternalHealthData) => {
  try {
    // Get prediction from ML model
    const prediction = await getPrediction(data).catch(err => {
      console.error('Prediction failed:', err);
      return { risk_level: 'low' };  // Default to low risk if prediction fails
    });
    
    // Prepare data with prediction and timestamp
    const healthData = {
      ...data,
      riskLevel: prediction.risk_level,
      lastUpdated: new Date().toISOString()
    };

    // Save to Firestore
    const healthRef = doc(db, 'healthData', data.uid);
    await setDoc(healthRef, healthData);

    return healthData;
  } catch (error) {
    console.error('Error saving health data:', error);
    // Still save the data even if prediction fails
    const healthData = {
      ...data,
      riskLevel: 'low',
      lastUpdated: new Date().toISOString()
    };
    const healthRef = doc(db, 'healthData', data.uid);
    await setDoc(healthRef, healthData);
    return healthData;
  }
};

export const getHealthData = async (uid: string) => {
  try {
    const healthRef = doc(db, 'healthData', uid);
    const healthSnap = await getDoc(healthRef);
    
    if (healthSnap.exists()) {
      return healthSnap.data() as MaternalHealthData;
    }
    return null;
  } catch (error) {
    console.error('Error getting health data:', error);
    throw error;
  }
};

export const updateHealthData = async (data: Partial<MaternalHealthData>) => {
  try {
    // Get existing data first
    const healthRef = doc(db, 'healthData', data.uid!);
    const healthSnap = await getDoc(healthRef);
    
    const existingData = healthSnap.exists() ? healthSnap.data() as MaternalHealthData : null;
    const updatedData = {
      ...existingData,
      ...data,
      lastUpdated: new Date().toISOString()
    } as MaternalHealthData;

    // Get new prediction if necessary health fields have changed
    const prediction = await getPrediction(updatedData);
    updatedData.riskLevel = prediction.risk_level as "high" | "low";

    // Save to Firestore
    await setDoc(healthRef, updatedData);

    return {
      success: true,
      data: updatedData
    };
  } catch (error) {
    console.error('Error updating health data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
