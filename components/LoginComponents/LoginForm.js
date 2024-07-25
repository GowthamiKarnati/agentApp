import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setEmail } from '../../redux/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userEmailID, setUserEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(userEmailID)) {
      setError('Invalid Email Format');
      return;
    }

    if (password.length === 0) {
      setError('Password cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://backendforpnf.vercel.app/login/validate-login',
        { email: userEmailID, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      //console.log("response", response.data);
      if (response.data.success) {
        await AsyncStorage.setItem('userLoggedIn', 'true');
        await AsyncStorage.setItem('userEmailId', userEmailID);
        console.log("From AsyncStorage", await AsyncStorage.getItem('userLoggedIn'));
        console.log("From AsyncStorage", await AsyncStorage.getItem('userEmailId'))
        dispatch(setEmail(userEmailID));
        navigation.navigate('Home');
      } else {
        setError(response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email ID</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Enter the Email ID"
            placeholderTextColor="black"
            autoCapitalize="none"
            value={userEmailID}
            onChangeText={(text) => {
              setUserEmailID(text);
              setError(''); // Clear error message when user starts typing
            }}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Enter the Password"
              placeholderTextColor="black"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(''); 
              }}
            />
            <TouchableOpacity
              style={styles.togglePasswordVisibility}
              onPress={() => setShowPassword(!showPassword)}
            >
              {/* <Text style={styles.togglePasswordText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text> */}
              <Icon 
                name={showPassword ? 'eye' : 'eye-slash'}
                size={25} 
                color="black" 
              />
            </TouchableOpacity>
          </View>
        </View>
        {error ? (<Text style={styles.errorText}>{error}</Text>) : null}
        <TouchableOpacity
          style={[styles.loginButton, styles.enlargedButton]}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 18,
    color: 'black',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  togglePasswordVisibility: {
    padding: 10,
  },
  togglePasswordText: {
    color: '#3c82f6',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignItems: 'center',
    marginTop: 10,
    width: '35%',
    elevation: 4,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  enlargedButton: {
    transform: [{ scale: 1.1 }],
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default LoginForm;

