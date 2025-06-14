import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface TruckCardProps {
  id: string;
  licensePlate: string;
  carType: string;
  capacity: string;
  status: string;
  location: string;
  onPress?: () => void;
}

export const TruckCard: React.FC<TruckCardProps> = ({
  licensePlate,
  carType,
  capacity,
  status,
  location,
  onPress,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#4CAF50';
      case 'maintenance':
        return '#FFA000';
      case 'inactive':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.licensePlateContainer}>
          <Ionicons name="car" size={24} color="#169976" />
          <Text style={styles.licensePlate}>{licensePlate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="construct" size={20} color="#666" />
          <Text style={styles.detailText}>{carType}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="scale" size={20} color="#666" />
          <Text style={styles.detailText}>{capacity}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location" size={20} color="#666" />
          <Text style={styles.detailText}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  licensePlateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  licensePlate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});
