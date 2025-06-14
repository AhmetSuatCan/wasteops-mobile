// app/dashboard/facilities.tsx
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddFacilityModal } from '../../components/AddFacilityModal';
import { FacilityCard } from '../../components/facilityCard';
import { FacilityDetailsModal } from '../../components/FacilityDetailsModal';
import { Facility, useFacility } from '../../hooks/useFacility';

export default function FacilitiesScreen() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  
  const { createFacility, updateFacility, deleteFacility, getFacilities, loading, error } = useFacility();

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const data = await getFacilities();
      setFacilities(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load facilities');
    }
  };

  const handleFacilityPress = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsDetailsModalVisible(true);
  };

  const handleAddFacility = async (facilityData: {
    name: string;
    facility_type: 'recycling' | 'treatment';
    address: string;
    capacity: number;
    contact_info?: string;
    operating_hours?: string;
  }) => {
    try {
      const newFacility = await createFacility(facilityData);
      setFacilities(prevFacilities => [...prevFacilities, newFacility]);
      setIsAddModalVisible(false);
      Alert.alert('Success', 'Facility added successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to add facility');
    }
  };

  const handleUpdateFacility = async (facilityData: {
    id: string;
    name: string;
    facility_type: 'recycling' | 'treatment';
    address: string;
    capacity: number;
    contact_info?: string;
    operating_hours?: string;
  }) => {
    try {
      const updatedFacility = await updateFacility(facilityData.id, facilityData);
      setFacilities(prevFacilities => 
        prevFacilities.map(facility => 
          facility.id === facilityData.id ? updatedFacility : facility
        )
      );
      setIsDetailsModalVisible(false);
      Alert.alert('Success', 'Facility updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update facility');
    }
  };

  const handleDeleteFacility = async (facilityId: string) => {
    try {
      await deleteFacility(facilityId);
      setFacilities(prevFacilities => prevFacilities.filter(facility => facility.id !== facilityId));
      setIsDetailsModalVisible(false);
      Alert.alert('Success', 'Facility deleted successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete facility');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Facility Management',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => setIsAddModalVisible(true)}
              style={styles.addButton}
              disabled={loading}
            >
              <Ionicons name="add-circle-outline" size={28} color="#169976" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={facilities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FacilityCard
            id={item.id}
            name={item.name}
            address={item.address}
            facilityType={item.facility_type}
            capacity={item.capacity.toString()}
            onPress={() => handleFacilityPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <AddFacilityModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSubmit={handleAddFacility}
      />

      <FacilityDetailsModal
        visible={isDetailsModalVisible}
        onClose={() => {
          setIsDetailsModalVisible(false);
          setSelectedFacility(null);
        }}
        facility={selectedFacility}
        onUpdate={handleUpdateFacility}
        onDelete={handleDeleteFacility}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
  },
  addButton: {
    marginRight: 15,
  },
});

