export interface Truck {
  id: string;
  licensePlate: string;
  carType: string;
  capacity: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
  organization: string;
}

export const mockTrucks: Truck[] = [
  {
    id: '1',
    licensePlate: '34ABC123',
    carType: 'Heavy Duty',
    capacity: '20 tons',
    status: 'active',
    location: 'Istanbul',
    organization: 'WasteOps'
  },
  {
    id: '2',
    licensePlate: '34DEF456',
    carType: 'Medium Duty',
    capacity: '10 tons',
    status: 'maintenance',
    location: 'Ankara',
    organization: 'WasteOps'
  },
  {
    id: '3',
    licensePlate: '34GHI789',
    carType: 'Light Duty',
    capacity: '5 tons',
    status: 'active',
    location: 'Izmir',
    organization: 'WasteOps'
  },
  {
    id: '4',
    licensePlate: '34JKL012',
    carType: 'Heavy Duty',
    capacity: '25 tons',
    status: 'inactive',
    location: 'Bursa',
    organization: 'WasteOps'
  },
  {
    id: '5',
    licensePlate: '34MNO345',
    carType: 'Medium Duty',
    capacity: '15 tons',
    status: 'active',
    location: 'Antalya',
    organization: 'WasteOps'
  }
];
