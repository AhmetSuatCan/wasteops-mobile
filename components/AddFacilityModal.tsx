import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface AddFacilityModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    facility_type: 'recycling' | 'treatment';
    address: string;
    capacity: number;
    contact_info?: string;
    operating_hours?: string;
  }) => void;
}

export const AddFacilityModal: React.FC<AddFacilityModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [facilityType, setFacilityType] = useState<'recycling' | 'treatment'>('recycling');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !address || !capacity) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        name,
        facility_type: facilityType,
        address,
        capacity: parseInt(capacity),
        contact_info: contactInfo || undefined,
        operating_hours: operatingHours || undefined,
      });
      // Reset form
      setName('');
      setFacilityType('recycling');
      setAddress('');
      setCapacity('');
      setContactInfo('');
      setOperatingHours('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Facility</Text>
          <ScrollView 
            style={styles.form}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Facility Name"
            />

            <Text style={styles.label}>Facility Type *</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity
                style={[
                  styles.segment,
                  facilityType === 'recycling' && styles.segmentActive,
                ]}
                onPress={() => setFacilityType('recycling')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    facilityType === 'recycling' && styles.segmentTextActive,
                  ]}
                >
                  Recycling
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.segment,
                  facilityType === 'treatment' && styles.segmentActive,
                ]}
                onPress={() => setFacilityType('treatment')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    facilityType === 'treatment' && styles.segmentTextActive,
                  ]}
                >
                  Waste Treatment
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Facility Address"
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Capacity (tons) *</Text>
            <TextInput
              style={styles.input}
              value={capacity}
              onChangeText={setCapacity}
              placeholder="Maximum Capacity"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Contact Info</Text>
            <TextInput
              style={styles.input}
              value={contactInfo}
              onChangeText={setContactInfo}
              placeholder="Contact Information"
            />

            <Text style={styles.label}>Operating Hours</Text>
            <TextInput
              style={styles.input}
              value={operatingHours}
              onChangeText={setOperatingHours}
              placeholder="e.g., Mon-Fri 9:00-17:00"
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Add Facility</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: Platform.OS === 'ios' ? '80%' : '90%',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    maxHeight: Platform.OS === 'ios' ? '80%' : '85%',
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
    minHeight: Platform.OS === 'ios' ? 40 : 50,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 15,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#169976',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  segmentTextActive: {
    color: '#fff',
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
    minHeight: 50,
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  submitButton: {
    backgroundColor: '#169976',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
}); 