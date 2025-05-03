import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export const useNotifications = () => {
  useEffect(() => {
    const configureNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
        return;
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    };

    configureNotifications();
  }, []);
};
