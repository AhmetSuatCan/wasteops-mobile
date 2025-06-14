import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddTruckModal } from '../../components/AddTruckModal';
import { TruckCard } from '../../components/truckCard';
import { TruckDetailsModal } from '../../components/TruckDetailsModal';
import { useTruck } from '../../hooks/useTruck';

interface Truck {
  id: string;
  license_plate: string;
  car_type: string;
  capacity: number;
  status: string;
  location: string;
}

export default function FleetScreen() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  
  const { getTrucks, createTruck, updateTruck, deleteTruck, loading, error } = useTruck();

  useEffect(() => {
    loadTrucks();
  }, []);

  const loadTrucks = async () => {
    try {
      const trucksData = await getTrucks();
      setTrucks(trucksData);
    } catch (err) {
      Alert.alert('Error', 'Failed to load trucks');
    }
  };

  const handleTruckPress = (truck: Truck) => {
    setSelectedTruck(truck);
    setIsDetailsModalVisible(true);
  };

  const handleAddTruck = async (truckData: {
    license_plate: string;
    car_type: string;
    capacity: number;
    status: string;
    location: string;
  }) => {
    try {
      await createTruck(truckData);
      await loadTrucks();
      setIsAddModalVisible(false);
      Alert.alert('Success', 'Truck added successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to add truck');
    }
  };

  const handleUpdateTruck = async (truckData: {
    id: string;
    license_plate: string;
    car_type: string;
    capacity: number;
    status: string;
    location: string;
  }) => {
    try {
      await updateTruck(truckData.id, {
        license_plate: truckData.license_plate,
        car_type: truckData.car_type,
        capacity: truckData.capacity,
        status: truckData.status,
        location: truckData.location,
      });
      await loadTrucks();
      setIsDetailsModalVisible(false);
      Alert.alert('Success', 'Truck updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update truck');
    }
  };

  const handleDeleteTruck = async (truckId: string) => {
    try {
      await deleteTruck(truckId);
      await loadTrucks();
      setIsDetailsModalVisible(false);
      Alert.alert('Success', 'Truck deleted successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete truck');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Filo Yönetimi',
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
        data={trucks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TruckCard
            id={item.id}
            licensePlate={item.license_plate}
            carType={item.car_type}
            capacity={item.capacity.toString()}
            status={item.status}
            location={item.location}
            onPress={() => handleTruckPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <AddTruckModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSubmit={handleAddTruck}
      />

      <TruckDetailsModal
        visible={isDetailsModalVisible}
        onClose={() => {
          setIsDetailsModalVisible(false);
          setSelectedTruck(null);
        }}
        truck={selectedTruck ? {
          id: selectedTruck.id,
          licensePlate: selectedTruck.license_plate,
          carType: selectedTruck.car_type,
          capacity: selectedTruck.capacity.toString(),
          status: selectedTruck.status,
          location: selectedTruck.location
        } : null}
        onUpdate={handleUpdateTruck}
        onDelete={handleDeleteTruck}
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

