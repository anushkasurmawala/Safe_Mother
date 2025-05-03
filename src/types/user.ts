export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  pregnancyWeek?: number;
  dueDate?: Date;
  lastCheckup?: Date;
  bloodType?: string;
  age?: number;
}

export interface UserContextType {
  user: UserProfile | null;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface MaternalHealthData {
  uid: string;
  age: number;
  systolicBP: number;
  diastolicBP: number;
  bloodSugar: number;
  bodyTemperature: number;
  previousComplications: boolean;
  preexistingDiabetes: boolean;
  gestationalDiabetes: boolean;
  mentalHealth: string;
  heartRate: number;
  timestamp?: Date;
}
