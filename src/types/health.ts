export interface MaternalHealthData {
  uid: string;
  age: number;
  systolicBP: number;
  diastolicBP: number;  // Changed from diastolic
  bloodSugar: number;   // Changed from bs
  bodyTemperature: number;  // Changed from bodyTemp
  bmi: number;
  prevComplications: boolean;
  preexistingDiabetes: boolean;
  gestationalDiabetes: boolean;
  mentalHealth: string;
  heartRate: number;
  riskLevel?: 'high' | 'low';
  lastUpdated?: string;
  gestationalAge?: number;
}

export type HealthDataUpdate = Partial<MaternalHealthData>;
