import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FacilityCardProps {
  id: string;
  name: string;
  address: string;
  facilityType: 'recycling' | 'treatment';
  capacity: string;
  onPress: () => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  name,
  address,
  facilityType,
  capacity,
  onPress,
}) => {
  const getFacilityTypeIcon = () => {
    switch (facilityType) {
      case 'recycling':
        return 'reload-circle-outline';
      case 'treatment':
        return 'medical-outline';
      default:
        return 'business-outline';
    }
  };

  const getFacilityTypeColor = () => {
    switch (facilityType) {
      case 'recycling':
        return '#4CAF50';
      case 'treatment':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={getFacilityTypeIcon()}
          size={32}
          color={getFacilityTypeColor()}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>
        <View style={styles.details}>
          <Text style={[styles.type, { color: getFacilityTypeColor() }]}>
            {facilityType === 'recycling' ? 'Recycling' : 'Waste Treatment'}
          </Text>
          <Text style={styles.capacity}>Capacity: {capacity} tons</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#757575" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    fontSize: 14,
    fontWeight: '500',
  },
  capacity: {
    fontSize: 14,
    color: '#666',
  },
}); 