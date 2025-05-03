import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  isError?: boolean;
}

export const ChatMessage = ({ message, isUser, timestamp, isLoading, isError }: ChatMessageProps) => {
  return (
    <View style={[
      styles.container, 
      isUser ? styles.userMessage : styles.botMessage,
      isError && styles.errorMessage
    ]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <Ionicons name="medical" size={20} color="#007AFF" />
        </View>
      )}
      <View style={styles.messageContent}>
        {isLoading ? (
          <ActivityIndicator size="small" color={isUser ? '#FFFFFF' : '#007AFF'} />
        ) : (
          <>
            <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
              {message}
            </Text>
            <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.botTimestamp]}>
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  errorMessage: {
    backgroundColor: '#FFE5E5',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageContent: {
    backgroundColor: '#E3F2FF',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: '100%',
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#000000',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
  },
  botTimestamp: {
    color: 'rgba(0,0,0,0.5)',
  },
});
