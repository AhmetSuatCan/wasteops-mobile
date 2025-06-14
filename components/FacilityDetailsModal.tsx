import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface FacilityDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  facility: {
    id: string;
    name: string;
    facility_type: 'recycling' | 'treatment';
    address: string;
    capacity: number;
    contact_info?: string;
    operating_hours?: string;
  } | null;
  onUpdate: (data: {
    id: string;
    name: string;
    facility_type: 'recycling' | 'treatment';
    address: string;
    capacity: number;
    contact_info?: string;
    operating_hours?: string;
  }) => void;
  onDelete: (id: string) => void;
}

export const FacilityDetailsModal: React.FC<FacilityDetailsModalProps> = ({
  visible,
  onClose,
  facility,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: facility?.name || '',
    facility_type: facility?.facility_type || 'recycling',
    address: facility?.address || '',
    capacity: facility?.capacity?.toString() || '',
    contact_info: facility?.contact_info || '',
    operating_hours: facility?.operating_hours || '',
  });

  const handleUpdate = async () => {
    if (!facility) return;
    
    if (!formData.name || !formData.address || !formData.capacity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await onUpdate({
        id: facility.id,
        name: formData.name,
        facility_type: formData.facility_type,
        address: formData.address,
        capacity: parseInt(formData.capacity),
        contact_info: formData.contact_info || undefined,
        operating_hours: formData.operating_hours || undefined,
      });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!facility) return;
    
    Alert.alert(
      'Delete Facility',
      'Are you sure you want to delete this facility?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(facility.id),
        },
      ]
    );
  };

  if (!facility) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Facility Details</Text>
          <ScrollView style={styles.form}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Facility Name"
              editable={isEditing}
            />

            <Text style={styles.label}>Facility Type *</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[
                  styles.segment,
                  formData.facility_type === 'recycling' && styles.segmentActive,
                  !isEditing && styles.segmentDisabled
                ]}
                onPress={() => isEditing && setFormData({ ...formData, facility_type: 'recycling' })}
                disabled={!isEditing}
              >
                <Text style={[
                  styles.segmentText,
                  formData.facility_type === 'recycling' && styles.segmentTextActive
                ]}>Recycling</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segment,
                  formData.facility_type === 'treatment' && styles.segmentActive,
                  !isEditing && styles.segmentDisabled
                ]}
                onPress={() => isEditing && setFormData({ ...formData, facility_type: 'treatment' })}
                disabled={!isEditing}
              >
                <Text style={[
                  styles.segmentText,
                  formData.facility_type === 'treatment' && styles.segmentTextActive
                ]}>Waste Treatment</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Facility Address"
              multiline
              editable={isEditing}
            />

            <Text style={styles.label}>Capacity (tons) *</Text>
            <TextInput
              style={styles.input}
              value={formData.capacity}
              onChangeText={(text) => setFormData({ ...formData, capacity: text })}
              placeholder="Maximum Capacity"
              keyboardType="numeric"
              editable={isEditing}
            />

            <Text style={styles.label}>Contact Info</Text>
            <TextInput
              style={styles.input}
              value={formData.contact_info}
              onChangeText={(text) => setFormData({ ...formData, contact_info: text })}
              placeholder="Contact Information"
              editable={isEditing}
            />

            <Text style={styles.label}>Operating Hours</Text>
            <TextInput
              style={styles.input}
              value={formData.operating_hours}
              onChangeText={(text) => setFormData({ ...formData, operating_hours: text })}
              placeholder="e.g., Mon-Fri 9:00-17:00"
              editable={isEditing}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setIsEditing(false);
                    setFormData({
                      name: facility.name,
                      facility_type: facility.facility_type,
                      address: facility.address,
                      capacity: facility.capacity.toString(),
                      contact_info: facility.contact_info || '',
                      operating_hours: facility.operating_hours || '',
                    });
                  }}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleUpdate}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={styles.buttonText}>Delete</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    maxHeight: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  segmentActive: {
    backgroundColor: '#169976',
  },
  segmentDisabled: {
    opacity: 0.7,
  },
  segmentText: {
    fontSize: 16,
    color: '#333',
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  submitButton: {
    backgroundColor: '#169976',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
}); 