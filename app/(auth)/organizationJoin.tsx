import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useJoinCode } from '../../hooks/useJoinCode';
import { useAuthStore } from '../../store/authStore';

export default function OrganizationJoin() {
  const [entranceCode, setEntranceCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { logout } = useAuthStore();
  const { useCode } = useJoinCode();

  const handleJoin = async () => {
    if (!entranceCode.trim()) {
      setError('Please enter an entrance code');
      return;
    }
    if (entranceCode.replace(/\s/g, '').length !== 6) {
      setError('Entrance code must be 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await useCode(entranceCode.replace(/\s/g, ''));
      router.replace('/panel');
    } catch (err) {
      setError('Invalid or expired entrance code');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const formatEntranceCode = (text: string) => {
    const cleaned = text.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (cleaned.length <= 3) {
      return cleaned;
    }
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleLogout}
      >
        <Ionicons name="chevron-back" size={30} color="#169976" />
      </TouchableOpacity>

      <Text style={styles.title}>Organizasyona Katıl</Text>
      <Text style={styles.subtitle}>Organizasyon yöneticiniz tarafından sağlanan 6 karakterlik kodu girin.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={entranceCode}
          onChangeText={(text) => setEntranceCode(formatEntranceCode(text))}
          style={styles.input}
          placeholder="XXX XXX"
          placeholderTextColor="#A0A0A0"
          autoCapitalize="characters"
          maxLength={7}
          error={!!error}
          theme={{ colors: { primary: '#169976', background: '#F0F0F0' } }}
          outlineColor="#B0B0B0"
          activeOutlineColor="#169976"
        />
        {error && <HelperText type="error" style={styles.helperText}>{error}</HelperText>}
      </View>

      <TouchableOpacity 
        style={[styles.joinButton, loading && styles.joinButtonDisabled]} 
        onPress={handleJoin}
        disabled={loading}
      >
        <Text style={styles.joinButtonText}>
          {loading ? 'Katılınıyor...' : 'Organizasyona Katıl'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#F0F0F0',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 3,
  },
  helperText: {
    textAlign: 'center',
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: '#169976',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  joinButtonDisabled: {
    opacity: 0.7,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
