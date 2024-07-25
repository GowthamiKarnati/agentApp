import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator,AppState, NativeModules} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CustomerScreen from './screens/CustomerScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';
import UpdateScreen from './screens/UpdateScreen';
import Toast from 'react-native-toast-message';
import LoginScreen from './screens/LoginScreen';
import { selectEmail, selectSearchValue, setEmail, setSearchValue } from './redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NewCustomerProfileScreen from './screens/NewCustomerProfileScreen';
import NewCustomerUpdateScreen from './screens/NewCustomerUpdateScreen';
import { enableScreens } from 'react-native-screens';
import CustomerList from './components/HomeCompoents/CustomersList';
import NewCustomerList from './components/HomeCompoents/NewCustomerList';
import AppBar from './components/HomeCompoents/AppBar';
enableScreens(true)
const Stack = createStackNavigator();
const { LocationModule } = NativeModules;

const App = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  //console.log("Email", email);
  const [initialLoading, setInitialLoading] = useState(true);
  const [asyncEmailId, setAsyncEmailId] = useState(null);
  useEffect(() => {
    dispatch(setSearchValue('')) // Login based navigation
    const checkUserLoggedIn = async () => {
      let retryCount = 3;
      const delay = 2000; // Delay between retries in milliseconds
      //console.log(await AsyncStorage.getItem('userLoggedIn'), await AsyncStorage.getItem('userEmailId'), 'IN USEFFECT');

      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        //console.log('userLoggedIn',userLoggedIn)
        if (userLoggedIn === 'true') {
          const storedEmailId = await AsyncStorage.getItem('userEmailId');
          setAsyncEmailId(storedEmailId);
          dispatch(setEmail(storedEmailId));
          let response;
          do {
            try {
              response = await axios.get('https://backendforpnf.vercel.app/Employees', {
                timeout: 15000, // Increased timeout to 15 seconds
              });
              break; // Break out of retry loop on successful response
            } catch (err) {
              retryCount--;
              // console.warn(`Retrying... (${retryCount} attempts left)`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          } while (retryCount > 0);
    
          if (response) {
            const filteredEmployees = response.data.data.filter(employee => employee.Email === storedEmailId);
            if (filteredEmployees.length > 0) {
              const employee = filteredEmployees[0];
              const fullNames = [employee['Full Name']];
              const workStartTime = employee['Work Start Time'];
              const workEndTime = employee['Work End Time'];
              const fullNamesJoined = fullNames.join(', ');
              const weekOff = employee['Weekoff'];
              const onLeave = employee['OnLeave']
              LocationModule.showToast(fullNamesJoined, workStartTime, workEndTime, weekOff, onLeave);
            }
          } else {
            console.error('Request failed after retries');
          }
        }
      } catch (error) {
        console.error('Error checking user logged-in status:', error);
      } finally {
        setTimeout(() => {
          setInitialLoading(false);
        }, 1000);
      }
    };
    
    checkUserLoggedIn();
  }, [dispatch, email]);


  if (initialLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={asyncEmailId ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={AppBar} options={{ headerShown: false }} />
        <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewCustomerProfile" component={NewCustomerProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewCustomerUpdate" component={NewCustomerUpdateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Old" component={CustomerList} options={{ headerShown: false }} />
        <Stack.Screen name="New" component={NewCustomerList} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
