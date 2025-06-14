import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import useAuth, { RegisterFormValues } from '../../hooks/useAuth';

const roles = [
  { label: 'Yönetici', value: 'A' },
  { label: 'Çalışan', value: 'E' },
];

const genders = [
  { label: 'Erkek', value: 'M' },
  { label: 'Kadın', value: 'F' },
  { label: 'Diğer', value: 'O' },
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
      role: 'E',
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
        <Text style={styles.title}>Hesap Oluştur</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Controller
          control={control}
          rules={{ required: 'İsim gereklidir' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Ad Soyad"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.name || !!serverErrors?.name}
                theme={{ colors: { primary: '#169976' } }}
              />
              {errors.name && <HelperText type="error">{errors.name.message}</HelperText>}
              {serverErrors?.name && <HelperText type="error">{serverErrors.name}</HelperText>}
            </View>
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: 'E-posta gereklidir', pattern: { value: /^\S+@\S+$/i, message: 'Geçersiz e-posta formatı' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="E-posta"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email || !!serverErrors?.email}
                theme={{ colors: { primary: '#169976' } }}
              />
              {errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
              {serverErrors?.email && <HelperText type="error">{serverErrors.email}</HelperText>}
            </View>
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: 'Şifre gereklidir', minLength: { value: 6, message: 'Şifre en az 6 karakter olmalıdır' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Şifre"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                error={!!errors.password || !!serverErrors?.password}
                theme={{ colors: { primary: '#169976' } }}
              />
              {errors.password && <HelperText type="error">{errors.password.message}</HelperText>}
              {serverErrors?.password && <HelperText type="error">{serverErrors.password}</HelperText>}
            </View>
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{ required: 'Yaş gereklidir', min: { value: 1, message: 'Yaş pozitif olmalıdır' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Yaş"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                value={value.toString()}
                keyboardType="numeric"
                error={!!errors.age || !!serverErrors?.age}
                theme={{ colors: { primary: '#169976' } }}
              />
              {errors.age && <HelperText type="error">{errors.age.message}</HelperText>}
              {serverErrors?.age && <HelperText type="error">{serverErrors.age}</HelperText>}
            </View>
          )}
          name="age"
        />

        <Controller
          control={control}
          rules={{ required: 'Telefon numarası gereklidir' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Telefon Numarası"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                error={!!errors.phone_number || !!serverErrors?.phone_number}
                theme={{ colors: { primary: '#169976' } }}
              />
              {errors.phone_number && <HelperText type="error">{errors.phone_number.message}</HelperText>}
              {serverErrors?.phone_number && <HelperText type="error">{serverErrors.phone_number}</HelperText>}
            </View>
          )}
          name="phone_number"
        />

        <Controller
          control={control}
          rules={{ required: 'Adres gereklidir' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Adres"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={3}
                error={!!errors.address || !!serverErrors?.address}
                theme={{ colors: { primary: '#169976' } }}
              />
              {errors.address && <HelperText type="error">{errors.address.message}</HelperText>}
              {serverErrors?.address && <HelperText type="error">{serverErrors.address}</HelperText>}
            </View>
          )}
          name="address"
        />

        <Text style={styles.sectionTitle}>Cinsiyet</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View style={styles.segmentedControl}>
              {genders.map((gender, index) => (
                <TouchableOpacity
                  key={gender.value}
                  style={[
                    styles.segment,
                    value === gender.value && styles.segmentActive,
                    index === 0 && { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                    index === genders.length - 1 && { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
                  ]}
                  onPress={() => onChange(gender.value)}
                >
                  <Text style={[
                    styles.segmentText,
                    value === gender.value && styles.segmentTextActive
                  ]}>{gender.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {(errors.gender || serverErrors?.gender) && (
          <HelperText type="error">
            {errors.gender?.message || serverErrors?.gender}
          </HelperText>
        )}

        <Text style={styles.sectionTitle}>Rol</Text>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View style={styles.segmentedControl}>
              {roles.map((role, index) => (
                <TouchableOpacity
                  key={role.value}
                  style={[
                    styles.segment,
                    value === role.value && styles.segmentActive,
                    index === 0 && { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                    index === roles.length - 1 && { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
                  ]}
                  onPress={() => onChange(role.value)}
                >
                  <Text style={[
                    styles.segmentText,
                    value === role.value && styles.segmentTextActive
                  ]}>{role.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {(errors.role || serverErrors?.role) && (
          <HelperText type="error">
            {errors.role?.message || serverErrors?.role}
          </HelperText>
        )}

        <Button 
          mode="contained" 
          onPress={handleSubmit(onSubmit)} 
          style={styles.button}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : 'Kayıt Ol'}
        </Button>

        <View style={styles.toggleContainer}>
          <Text>Zaten hesabınız var mı? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.toggleText}>Giriş Yap</Text>
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
  segmentedControl: {
    flexDirection: 'row',
    marginBottom: 15,
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
  button: {
    backgroundColor: '#169976',
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
    color: '#169976',
    fontWeight: 'bold',
  },
});
