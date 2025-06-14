import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface TruckDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  truck: {
    id: string;
    licensePlate: string;
    carType: string;
    capacity: string;
    status: string;
    location: string;
  } | null;
  onUpdate: (truckData: {
    id: string;
    license_plate: string;
    car_type: string;
    capacity: number;
    status: string;
    location: string;
  }) => void;
  onDelete: (truckId: string) => void;
}

export const TruckDetailsModal: React.FC<TruckDetailsModalProps> = ({
  visible,
  onClose,
  truck,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (truck) {
      setLicensePlate(truck.licensePlate);
      setCapacity(truck.capacity);
      setLocation(truck.location);
      setStatus(truck.status);
    }
  }, [truck]);

  const handleUpdate = () => {
    if (!truck) return;
    
    onUpdate({
      id: truck.id,
      license_plate: licensePlate,
      car_type: 'truck',
      capacity: parseInt(capacity) || 0,
      status: status,
      location: location,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!truck) return;

    Alert.alert(
      'Aracı Sil',
      'Bu aracı silmek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            onDelete(truck.id);
            onClose();
          },
        },
      ]
    );
  };

  if (!truck) return null;

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
            <Text style={styles.modalTitle}>Araç Detayları</Text>
            <View style={styles.headerButtons}>
              {!isEditing ? (
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  style={styles.headerEditButton}
                >
                  <Ionicons name="pencil" size={24} color="#169976" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIsEditing(false);
                    // Reset form to original values
                    if (truck) {
                      setLicensePlate(truck.licensePlate);
                      setCapacity(truck.capacity);
                      setLocation(truck.location);
                      setStatus(truck.status);
                    }
                  }}
                  style={styles.headerEditButton}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Plaka</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={licensePlate}
                onChangeText={setLicensePlate}
                placeholder="34ABC123"
                placeholderTextColor="#999"
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Kapasite (ton)</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={capacity}
                onChangeText={setCapacity}
                placeholder="20"
                keyboardType="numeric"
                placeholderTextColor="#999"
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Konum</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={location}
                onChangeText={setLocation}
                placeholder="Istanbul"
                placeholderTextColor="#999"
                editable={isEditing}
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
                      !isEditing && styles.statusButtonDisabled,
                    ]}
                    onPress={() => isEditing && setStatus(statusOption)}
                    disabled={!isEditing}
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
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setIsEditing(false);
                    // Reset form to original values
                    if (truck) {
                      setLicensePlate(truck.licensePlate);
                      setCapacity(truck.capacity);
                      setLocation(truck.location);
                      setStatus(truck.status);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleUpdate}
                >
                  <Text style={[styles.buttonText, styles.submitButtonText]}>
                    Kaydet
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={[styles.buttonText, styles.deleteButtonText]}>
                    Sil
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.footerEditButton]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={[styles.buttonText, styles.footerEditButtonText]}>
                    Düzenle
                  </Text>
                </TouchableOpacity>
              </>
            )}
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
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  headerEditButton: {
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
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#666',
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
  statusButtonDisabled: {
    opacity: 0.7,
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
  deleteButton: {
    backgroundColor: '#f5f5f5',
  },
  footerEditButton: {
    backgroundColor: '#169976',
  },
  buttonText: {
    fontSize: 16,
    color: '#666',
  },
  submitButtonText: {
    color: 'white',
  },
  deleteButtonText: {
    color: '#F44336',
  },
  footerEditButtonText: {
    color: 'white',
  },
}); 