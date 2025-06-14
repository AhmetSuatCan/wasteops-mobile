import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface JoinCodeCardProps {
  code: string;
  expiresAt: string;
  onCopy: () => void;
  onExpire: () => void;
}

export function JoinCodeCard({ code, expiresAt, onCopy, onExpire }: JoinCodeCardProps) {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    onCopy();
  };

  return (
    <View style={styles.card}>
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{code}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={20} color="#169976" />
          <Text style={styles.buttonText}>Kopyala</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.expireButton]} onPress={onExpire}>
          <Ionicons name="close-circle-outline" size={20} color="#FF3B30" />
          <Text style={[styles.buttonText, styles.expireButtonText]}>İptal Et</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeContainer: {
    marginBottom: 12,
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  expiresAt: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#169976',
    gap: 4,
  },
  buttonText: {
    color: '#169976',
    fontSize: 14,
    fontWeight: '600',
  },
  expireButton: {
    borderColor: '#FF3B30',
  },
  expireButtonText: {
    color: '#FF3B30',
  },
}); 