// app/auth/login.tsx
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    // Frontend validation
    if (!email || !password) {
      setErrorMessage('Email ve şifre gereklidir.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Lütfen geçerli bir e-posta giriniz');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      await login(email, password);
      // After successful login, you can navigate if needed
    } catch (error: any) {
      // API error handling
      if (error?.response?.status === 401) {
        setErrorMessage('Giriş başarısız! Hatalı e-posta veya şifre.');
      } else {
        setErrorMessage('Sunucu ile bağlantı kurulamadı...');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bigTitle}>WasteOps</Text>
      <Text style={styles.title}>Giriş Yap</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Giriş Yap</Text>
        )}
      </TouchableOpacity>

      <View style={styles.toggleContainer}>
        <Text>Hesabınız yok mu? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.toggleText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  bigTitle:{
    color:"#169976",
    fontSize:36,
    fontWeight:'bold',
    marginBottom:30,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#169976',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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

