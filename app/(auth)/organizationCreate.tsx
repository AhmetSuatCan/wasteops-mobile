import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useOrganization } from '../../hooks/useOrganization';

export default function OrganizationCreate() {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  } = useOrganization();

  const onSubmit = () => {
    // Call the handleSubmit method from the hook
    handleSubmit();
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, formData.organization_type === 'government' && styles.radioButtonSelected]}
          onPress={() => handleInputChange('organization_type', 'government')}
        >
          <Text style={styles.radioText}>Government</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, formData.organization_type === 'private' && styles.radioButtonSelected]}
          onPress={() => handleInputChange('organization_type', 'private')}
        >
          <Text style={styles.radioText}>Private</Text>
        </TouchableOpacity>
      </View>

      <Button title="Create Organization" onPress={onSubmit} disabled={loading} />
      
      {loading && <Text>Creating...</Text>}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#4CAF50', // Selected state color
    borderColor: '#4CAF50',
  },
  radioText: {
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

