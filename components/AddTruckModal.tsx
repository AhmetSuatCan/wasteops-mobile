import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface AddTruckModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (truckData: {
    license_plate: string;
    car_type: string;
    capacity: number;
    status: string;
    location: string;
  }) => void;
}

export const AddTruckModal: React.FC<AddTruckModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = () => {
    onSubmit({
      license_plate: licensePlate,
      car_type: 'truck',
      capacity: parseInt(capacity) || 0,
      status: status,
      location: location,
    });
    // Reset form
    setLicensePlate('');
    setCapacity('');
    setLocation('');
    setStatus('active');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Yeni Araç Ekle</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Plaka</Text>
              <TextInput
                style={styles.input}
                value={licensePlate}
                onChangeText={setLicensePlate}
                placeholder="34ABC123"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Kapasite (ton)</Text>
              <TextInput
                style={styles.input}
                value={capacity}
                onChangeText={setCapacity}
                placeholder="20"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Konum</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Istanbul"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Durum</Text>
              <View style={styles.statusButtons}>
                {['active', 'maintenance', 'inactive'].map((statusOption) => (
                  <TouchableOpacity
                    key={statusOption}
                    style={[
                      styles.statusButton,
                      status === statusOption && styles.statusButtonActive,
                    ]}
                    onPress={() => setStatus(statusOption)}
                  >
                    <Text
                      style={[
                        styles.statusButtonText,
                        status === statusOption && styles.statusButtonTextActive,
                      ]}
                    >
                      {statusOption === 'active'
                        ? 'Aktif'
                        : statusOption === 'maintenance'
                        ? 'Bakımda'
                        : 'Pasif'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, styles.submitButtonText]}>
                Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    maxHeight: '70%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#169976',
    borderColor: '#169976',
  },
  statusButtonText: {
    color: '#666',
    fontSize: 14,
  },
  statusButtonTextActive: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#169976',
  },
  buttonText: {
    fontSize: 16,
    color: '#666',
  },
  submitButtonText: {
    color: 'white',
  },
}); 