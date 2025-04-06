import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Button, RadioButton, HelperText } from 'react-native-paper';
import useAuth, { RegisterFormValues } from '../../hooks/useAuth';

const roles = [
  { label: 'Admin', value: 'A' },
  { label: 'User', value: 'U' },
];

const genders = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Other', value: 'O' },
];

export default function Register() {
  const { register, loading, error } = useAuth();
  const [serverErrors, setServerErrors] = useState<any>(null);
  
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      gender: 'M',
      age: 18,
      role: 'U',
      phone_number: '',
      address: ''
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // Convert age to number
    const formData = { ...data, age: Number(data.age) };
    const result = await register(formData);
    if (!result.success && result.errors) {
      setServerErrors(result.errors);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Full Name"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.name || !!serverErrors?.name}
              />
              {errors.name && <HelperText type="error">{errors.name.message}</HelperText>}
              {serverErrors?.name && <HelperText type="error">{serverErrors.name}</HelperText>}
            </View>
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email || !!serverErrors?.email}
              />
              {errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
              {serverErrors?.email && <HelperText type="error">{serverErrors.email}</HelperText>}
            </View>
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Password"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                error={!!errors.password || !!serverErrors?.password}
              />
              {errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
              {serverErrors?.password && <HelperText type="error">{serverErrors.password}</HelperText>}
            </View>
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{ required: 'Age is required', min: { value: 1, message: 'Age must be positive' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Age"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                value={value.toString()}
                keyboardType="numeric"
                error={!!errors.age || !!serverErrors?.age}
              />
              {errors.age && <HelperText type="error">{errors.age.message}</HelperText>}
              {serverErrors?.age && <HelperText type="error">{serverErrors.age}</HelperText>}
            </View>
          )}
          name="age"
        />

        <Controller
          control={control}
          rules={{ required: 'Phone number is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Phone Number"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                error={!!errors.phone_number || !!serverErrors?.phone_number}
              />
              {errors.phone_number && <HelperText type="error">{errors.phone_number.message}</HelperText>}
              {serverErrors?.phone_number && <HelperText type="error">{serverErrors.phone_number}</HelperText>}
            </View>
          )}
          name="phone_number"
        />

        <Controller
          control={control}
          rules={{ required: 'Address is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Address"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={3}
                error={!!errors.address || !!serverErrors?.address}
              />
              {errors.address && <HelperText type="error">{errors.address.message}</HelperText>}
              {serverErrors?.address && <HelperText type="error">{serverErrors.address}</HelperText>}
            </View>
          )}
          name="address"
        />

        <Text style={styles.sectionTitle}>Gender</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View style={styles.radioContainer}>
              {genders.map((gender) => (
                <View key={gender.value} style={styles.radioItem}>
                  <RadioButton
                    value={gender.value}
                    status={value === gender.value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(gender.value)}
                  />
                  <Text onPress={() => onChange(gender.value)}>{gender.label}</Text>
                </View>
              ))}
              {errors.gender && <HelperText type="error">{errors.gender.message}</HelperText>}
              {serverErrors?.gender && <HelperText type="error">{serverErrors.gender}</HelperText>}
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>Role</Text>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View style={styles.radioContainer}>
              {roles.map((role) => (
                <View key={role.value} style={styles.radioItem}>
                  <RadioButton
                    value={role.value}
                    status={value === role.value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(role.value)}
                  />
                  <Text onPress={() => onChange(role.value)}>{role.label}</Text>
                </View>
              ))}
              {errors.role && <HelperText type="error">{errors.role.message}</HelperText>}
              {serverErrors?.role && <HelperText type="error">{serverErrors.role}</HelperText>}
            </View>
          )}
        />

        <Button 
          mode="contained" 
          onPress={handleSubmit(onSubmit)} 
          style={styles.button}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : 'Register'}
        </Button>

        <View style={styles.toggleContainer}>
          <Text>Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.toggleText}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  toggleText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
