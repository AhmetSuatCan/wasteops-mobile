import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface JoinCodeModalProps {
  visible: boolean;
  code: string;
  onClose: () => void;
}

export function JoinCodeModal({ visible, code, onClose }: JoinCodeModalProps) {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Katılım Kodu</Text>
          <Text style={styles.code}>{code}</Text>
          
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Ionicons name="copy-outline" size={20} color="white" />
            <Text style={styles.copyButtonText}>Kopyala</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  code: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#169976',
    marginBottom: 20,
    letterSpacing: 2,
  },
  copyButton: {
    flexDirection: 'row',
    backgroundColor: '#169976',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 