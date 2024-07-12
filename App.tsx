// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, ActivityIndicator, PermissionsAndroid, Platform, Linking, AppState,NativeModules, NativeEventEmitter, } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import CustomerScreen from './screens/CustomerScreen';
// import CustomerProfileScreen from './screens/CustomerProfileScreen';
// import UpdateScreen from './screens/UpdateScreen';
// import Toast from 'react-native-toast-message';
// import LoginScreen from './screens/LoginScreen';
// import { selectEmail, setEmail } from './redux/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';
// import BackgroundFetch from 'react-native-background-fetch'; // Import background fetch
// import BackgroundTimer from 'react-native-background-timer';
// import {RESULTS, PERMISSIONS, request } from 'react-native-permissions';
// import NewCustomerProfileScreen from './screens/NewCustomerProfileScreen';
// import NewCustomerUpdateScreen from './screens/NewCustomerUpdateScreen';
// const Stack = createStackNavigator();
// const {  LocationModule } = NativeModules;


// const App = () => {
//   const dispatch = useDispatch();
//   //const email = 'riktam@test.com';
//   const email = useSelector(selectEmail) ;
//   console.log("Email", email);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [fullNamesString, setFullNamesString] = useState('');
//   const [employees, setEmployees] = useState([]);
//   const locationRef = useRef();
//   const appState = useRef(AppState.currentState);
//   const [appStateVisible, setAppStateVisible] = useState(appState.current);

//   useEffect(() => { // Login based navigation
//     const checkUserLoggedIn = async () => {
//       let retryCount = 3;
//       const delay = 2000; // Delay between retries in milliseconds
    
//       try {
//         const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
//         if (userLoggedIn === 'true') {
//           const storedEmailId = await AsyncStorage.getItem('userEmailId');
//           console.log("StoredEmail", storedEmailId);
//           dispatch(setEmail(storedEmailId));
    
//           let response;
//           do {
//             try {
//               response = await axios.get('https://backendforpnf.vercel.app/Employees', {
//                 timeout: 15000, // Increased timeout to 15 seconds
//               });
//               break; // Break out of retry loop on successful response
//             } catch (err) {
//               retryCount--;
//               console.warn(`Retrying... (${retryCount} attempts left)`);
//               await new Promise(resolve => setTimeout(resolve, delay));
//             }
//           } while (retryCount > 0);
    
//           if (response) {
//             const filteredEmployees = response.data.data.filter(employee => employee.Email === storedEmailId);
//             //console.log('Filtered Employees', filteredEmployees);
//             if (filteredEmployees.length > 0) {
//               const employee = filteredEmployees[0];
//               const fullNames = [employee['Full Name']];
//               const workStartTime = employee['Work Start Time'];
//               const workEndTime = employee['Work End Time'];
//               const fullNamesJoined = fullNames.join(', ');
//               setFullNamesString(fullNamesJoined);
//               console.log(employee)
//               console.log(fullNamesJoined)
//               console.log(workStartTime)
//               console.log(workEndTime)
//               //console.log(employee)
//               //setEmployees(filteredEmployees);

//               // Send the data to the native module
//               LocationModule.showToast(fullNamesJoined, workStartTime, workEndTime);
//             }
//             const fullNames = filteredEmployees.map(employee => employee['Full Name']);
//             //console.log('Full Names', fullNames);
//             const fullNamesJoined = fullNames.join(', ');
//             //console.log('Full Names String', fullNamesJoined);
//             setFullNamesString(fullNamesJoined);
//           } else {
//             console.error('Request failed after retries');
//           }
//         }
//       } catch (error) {
//         console.error('Error checking user logged-in status:', error);
//       } finally {
//         setTimeout(() => {
//           setInitialLoading(false);
//         }, 1000);
//       }
//     };
    

//     checkUserLoggedIn();
//   }, [dispatch, email]);

//   // useEffect(() => {
//   //   if (fullNamesString) {
//   //     LocationModule.showToast(fullNamesString);
//   //   }
//   // }, [fullNamesString]);

//   if (initialLoading) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName={email ? 'Home' : 'Login'}>
//             <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
//             <Stack.Screen name= "NewCustomerProfile" component={NewCustomerProfileScreen} options={{headerShown: false}} />
//             <Stack.Screen name = "NewCustomerUpdate" component = {NewCustomerUpdateScreen} options={{headerShown: false}} />
//           </Stack.Navigator>
//           <Toast />
//         </NavigationContainer>
//       );
//     };
    
    

// export default App;
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, PermissionsAndroid, Platform, Linking, AppState, NativeModules, NativeEventEmitter, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CustomerScreen from './screens/CustomerScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';
import UpdateScreen from './screens/UpdateScreen';
import Toast from 'react-native-toast-message';
import LoginScreen from './screens/LoginScreen';
import { selectEmail, setEmail } from './redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BackgroundFetch from 'react-native-background-fetch'; // Import background fetch
import BackgroundTimer from 'react-native-background-timer';
import { RESULTS, PERMISSIONS, request } from 'react-native-permissions';
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
  console.log("Email", email);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fullNamesString, setFullNamesString] = useState('');
  const [employees, setEmployees] = useState([]);
  const locationRef = useRef();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => { // Login based navigation
    const checkUserLoggedIn = async () => {
      let retryCount = 3;
      const delay = 2000; // Delay between retries in milliseconds
    
      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        if (userLoggedIn === 'true') {
          const storedEmailId = await AsyncStorage.getItem('userEmailId');
          console.log("StoredEmail", storedEmailId);
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
              console.warn(`Retrying... (${retryCount} attempts left)`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          } while (retryCount > 0);
    
          if (response) {
            const filteredEmployees = response.data.data.filter(employee => employee.Email === storedEmailId);
            //console.log('Filtered Employees', filteredEmployees);
            if (filteredEmployees.length > 0) {
              const employee = filteredEmployees[0];
              const fullNames = [employee['Full Name']];
              const workStartTime = employee['Work Start Time'];
              const workEndTime = employee['Work End Time'];
              const fullNamesJoined = fullNames.join(', ');
              const weekOff = employee['Weekoff'];
              const onLeave = employee['OnLeave']
              setFullNamesString(fullNamesJoined);
              console.log(employee)
              console.log(fullNamesJoined)
              console.log(workStartTime)
              console.log(workEndTime)
              console.log(weekOff)
              console.log(onLeave)
              //console.log(employee)
              //setEmployees(filteredEmployees);
              LocationModule.showToast(fullNamesJoined, workStartTime, workEndTime, weekOff, onLeave);
            }
            const fullNames = filteredEmployees.map(employee => employee['Full Name']);
            //console.log('Full Names', fullNames);
            const fullNamesJoined = fullNames.join(', ');
            //console.log('Full Names String', fullNamesJoined);
            setFullNamesString(fullNamesJoined);
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
      <Stack.Navigator initialRouteName={email ? 'Home' : 'Login'}>
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
