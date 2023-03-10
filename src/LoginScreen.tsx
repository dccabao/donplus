import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface Credentials {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(credentials: Credentials): Promise<void> {
    try {
      const response = await axios.post(
        'https://example.com/api/login',
        credentials,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      // Store user session data
      const { accessToken } = response.data;
      await AsyncStorage.setItem('accessToken', accessToken);
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
    }
  }

  const handleLogin = async () => {
    const credentials: Credentials = { email, password };
    await login(credentials);
    // Navigate to the main app screen if login is successful
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title='Log in' onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#eee',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
