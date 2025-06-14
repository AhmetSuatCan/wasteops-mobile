import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EmployeeCard } from '../../components/EmployeeCard';
import { JoinCodeCard } from '../../components/JoinCodeCard';
import { JoinCodeModal } from '../../components/JoinCodeModal';
import { useEmployment } from '../../hooks/useEmployment';
import { useJoinCode } from '../../hooks/useJoinCode';

const Tab = createMaterialTopTabNavigator();

function JoiningCodesScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const { codes, loading, generateCode, getCodes, expireCode } = useJoinCode();

  useEffect(() => {
    getCodes();
  }, []);

  const handleGenerateCode = async () => {
    try {
      const response = await generateCode();
      console.log('Generated code in UI:', response);
      setGeneratedCode(response.code);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error in handleGenerateCode:', error);
      Alert.alert('Hata', 'Kod oluşturulurken bir hata oluştu.');
    }
  };

  const handleExpireCode = async (code: string) => {
    try {
      await expireCode(code);
      console.log('Code expired in UI:', code);
      Alert.alert('Başarılı', 'Kod başarıyla iptal edildi.');
    } catch (error) {
      console.error('Error in handleExpireCode:', error);
      Alert.alert('Hata', 'Kod iptal edilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={codes}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <JoinCodeCard
            code={item.code}
            expiresAt={item.expires_at}
            onCopy={() => Alert.alert('Başarılı', 'Kod kopyalandı!')}
            onExpire={() => handleExpireCode(item.code)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleGenerateCode}
        disabled={loading}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <JoinCodeModal
        visible={isModalVisible}
        code={generatedCode}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

function EmployeesScreen() {
  const { employees, loading, error, getEmployees } = useEmployment();

  useEffect(() => {
    getEmployees();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#169976" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EmployeeCard
            id={item.id}
            user={item.user}
            start_date={item.start_date}
            created_at={item.created_at}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

export default function HumanResourcesScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, textTransform: 'none' },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarIndicatorStyle: { backgroundColor: '#169976' },
      }}
    >
      <Tab.Screen 
        name="JoiningCodes" 
        component={JoiningCodesScreen} 
        options={{ title: 'Katılım Kodları' }}
      />
      <Tab.Screen 
        name="Employees" 
        component={EmployeesScreen} 
        options={{ title: 'Çalışanlar' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    backgroundColor: '#169976',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  employeeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  employeeInfo: {
    gap: 4,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  employeeRole: {
    fontSize: 16,
    color: '#666',
  },
  employeeStatus: {
    fontSize: 14,
    color: '#666',
  },
  employeeJoinDate: {
    fontSize: 14,
    color: '#666',
  },
}); 