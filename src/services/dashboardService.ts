import { collection, query, where, orderBy, limit, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Appointment {
  id: string;
  type: string;
  doctor: string;
  date: string;
  time: string;
  userId: string;
}

export interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
  userId: string;
}

export const fetchAppointments = async (userId: string): Promise<Appointment[]> => {
  try {
    const appointmentsRef = collection(db, 'appointments');
    const q = query(
      appointmentsRef,
      where('userId', '==', userId),
      where('date', '>=', new Date().toISOString().split('T')[0]),
      orderBy('date', 'asc'),
      limit(5)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Appointment));
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};

export const fetchAlerts = async (userId: string): Promise<Alert[]> => {
  try {
    const alertsRef = collection(db, 'alerts');
    const q = query(
      alertsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(5)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Alert));
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

export const saveAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<string> => {
  try {
    const appointmentsRef = collection(db, 'appointments');
    const docRef = await addDoc(appointmentsRef, {
      ...appointment,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw error;
  }
};
