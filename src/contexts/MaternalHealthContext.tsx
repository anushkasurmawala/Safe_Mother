import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveHealthData as saveHealthDataToFirestore, getHealthData, updateHealthData as updateHealthDataService } from '../services/healthService';
import { MaternalHealthData, HealthDataUpdate } from '../types/health';

interface MaternalHealthContextType {
  healthData: MaternalHealthData | null;
  loading: boolean;
  error: string | null;
  updateHealthData: (data: HealthDataUpdate) => Promise<void>;
  loadHealthData: (uid: string) => Promise<void>;
  saveHealthData: (data: MaternalHealthData) => Promise<MaternalHealthData>;
}

const MaternalHealthContext = createContext<MaternalHealthContextType | undefined>(undefined);

export const MaternalHealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [healthData, setHealthData] = useState<MaternalHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHealthData = async (uid: string) => {
    try {
      setLoading(true);
      const data = await getHealthData(uid);
      setHealthData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load health data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateHealthData = async (data: Partial<MaternalHealthData>) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!data.uid) {
        throw new Error('User ID is required');
      }

      const result = await updateHealthDataService(data);
      
      if (result.success && result.data) {
        const updatedData = {
          ...result.data,
          lastUpdated: new Date(result.data.lastUpdated ?? Date.now()).toISOString()
        };
        setHealthData(updatedData as MaternalHealthData);
      } else {
        throw new Error('Failed to update health data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update health data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveHealthData = async (data: MaternalHealthData) => {
    try {
      setLoading(true);
      const savedData = await saveHealthDataToFirestore(data);
      const validatedData: MaternalHealthData = {
        ...savedData,
        riskLevel: savedData.riskLevel === 'high' ? 'high' : 'low'
      };
      setHealthData(validatedData);
      return validatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaternalHealthContext.Provider
      value={{
        healthData,
        loading,
        error,
        updateHealthData,
        loadHealthData,
        saveHealthData
      }}
    >
      {children}
    </MaternalHealthContext.Provider>
  );
};

export const useMaternalHealth = () => {
  const context = useContext(MaternalHealthContext);
  if (context === undefined) {
    throw new Error('useMaternalHealth must be used within a MaternalHealthProvider');
  }
  return context;
};
