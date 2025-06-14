import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function TeamsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ekipler</Text>
    </View>
  );
}

function TasksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Görevler</Text>
    </View>
  );
}

function ShiftsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Vardiyalar</Text>
    </View>
  );
}

export default function OperationsScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, textTransform: 'none' },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: { backgroundColor: '#169976' },
      }}
    >
      <Tab.Screen 
        name="Teams" 
        component={TeamsScreen} 
        options={{ title: 'Ekipler' }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{ title: 'Görevler' }}
      />
      <Tab.Screen 
        name="Shifts" 
        component={ShiftsScreen} 
        options={{ title: 'Vardiyalar' }}
      />
    </Tab.Navigator>
  );
}
