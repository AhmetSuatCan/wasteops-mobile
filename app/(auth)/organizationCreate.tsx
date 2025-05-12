import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useOrganization } from '../../hooks/useOrganization';
import { useAuthStore } from '../../store/authStore';

export default function OrganizationCreate() {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  } = useOrganization();
  const { logout } = useAuthStore();
  const router = useRouter();

  const onSubmit = () => {
    // Call the handleSubmit method from the hook
    handleSubmit();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleLogout}
      >
        <Ionicons name="chevron-back" size={36} color="#169976" />
      </TouchableOpacity>

      <Text style={styles.heading}>Create Organization</Text>

      <Text style={styles.label}>Organization Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter organization name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />

      <Text style={styles.label}>Organization Type</Text>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[
            styles.segment,
            formData.organization_type === 'government' && styles.segmentActive,
            { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
          ]}
          onPress={() => handleInputChange('organization_type', 'government')}
        >
          <Text style={[
            styles.segmentText,
            formData.organization_type === 'government' && styles.segmentTextActive
          ]}>Government</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segment,
            formData.organization_type === 'private' && styles.segmentActive,
            { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
          ]}
          onPress={() => handleInputChange('organization_type', 'private')}
        >
          <Text style={[
            styles.segmentText,
            formData.organization_type === 'private' && styles.segmentTextActive
          ]}>Private</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.createButton, loading && styles.createButtonDisabled]} 
        onPress={onSubmit} 
        disabled={loading}
      >
        <Text style={styles.createButtonText}>
          {loading ? 'Creating...' : 'Create Organization'}
        </Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 10,
    padding: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 60,
    marginTop: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 12,
    fontSize: 16,
    borderRadius: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#169976',
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  segmentActive: {
    backgroundColor: '#169976',
  },
  segmentText: {
    fontSize: 16,
    color: '#169976',
  },
  segmentTextActive: {
    color: 'white',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  createButton: {
    backgroundColor: '#169976',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});