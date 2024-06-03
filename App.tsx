// import { View, Text, ActivityIndicator } from 'react-native'
// import React, {useEffect, useState} from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import CustomerScreen from './screens/CustomerScreen';
// import CustomerProfileScreen from './screens/CustomerProfileScreen';
// import UpdateScreen from './screens/UpdateScreen';
// import Toast from 'react-native-toast-message';
// import LoginScreen from './screens/LoginScreen';
// import { selectEmail, setEmail } from './redux/authSlice';
// import {  useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const Stack = createStackNavigator();
// const App = () => {
//   const dispatch = useDispatch();
//   const email = useSelector(selectEmail);
//   const [initialLoading, setInitialLoading] = useState(true);
//   useEffect(() => {
//     const checkUserLoggedIn = async () => {
//       try {
//         const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        
//         if (userLoggedIn === 'true') {
//           const storedEmailId = await AsyncStorage.getItem('userEmailId');
//           console.log(storedEmailId);
//           dispatch(setEmail(storedEmailId));
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
//   }, [dispatch]);

//   useEffect(() => {
//     // Use the mobileNumber state to determine whether the user is logged in
//     if (email) {
//       setTimeout(() => {
//         setInitialLoading(false);
//       }, 1000);
//     }
//   }, [email]);

//   if (initialLoading) {
//     return (
//       <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
//          <ActivityIndicator size="large" color="#0000ff" /> 
//       </View>
        
      
//     );
    
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={email ? 'Home' : 'Login'}>
//       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />

//       </Stack.Navigator>
//       <Toast />
//     </NavigationContainer>
//   )
// }

// export default App
// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
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
// import BackgroundTimer from 'react-native-background-timer';
// import axios from 'axios';

// const Stack = createStackNavigator();

// const requestLocationPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true;
// };

// const transmitLocation = async (latitude: number, longitude: number) => {
//   try {
//     const data = {
//       latitude: latitude,
//       longitude: longitude,
//       timestamp: new Date().toISOString(),
//     };
//     console.log("Data", data);
//     //const response = await axios.post('https://20dd-183-82-4-110.ngrok-free.app/gps', data);
//     //console.log('Location transmitted:', response.data);
//   } catch (error) {
//     console.error('Error transmitting location:', error);
//   }
// };

// const getLocationAndTransmit = async () => {
//   Geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       transmitLocation(latitude, longitude);
//     },
//     (error) => {
//       console.error(error);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//   );
// };

// const App = () => {
//   const dispatch = useDispatch();
//   const email = useSelector(selectEmail);
//   const [initialLoading, setInitialLoading] = useState(true);

//   useEffect(() => {
//     const checkUserLoggedIn = async () => {
//       try {
//         const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        
//         if (userLoggedIn === 'true') {
//           const storedEmailId = await AsyncStorage.getItem('userEmailId');
//           console.log(storedEmailId);
//           dispatch(setEmail(storedEmailId));
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
//   }, [dispatch]);

//   useEffect(() => {
//     if (email) {
//       setTimeout(() => {
//         setInitialLoading(false);
//       }, 1000);
//     }
//   }, [email]);

//   useEffect(() => {
//     const initializeLocationTracking = async () => {
//       const permissionGranted = await requestLocationPermission();
//       if (permissionGranted) {
//         const intervalId = BackgroundTimer.setInterval(() => {
//           getLocationAndTransmit();
//         }, 10 * 60 * 1000); // 10 minutes in milliseconds
//         console.log(intervalId);
//         return () => {
//           BackgroundTimer.clearInterval(intervalId);
//         };
//       }
//     };

//     initializeLocationTracking();
//   }, []);

//   if (initialLoading) {
//     return (
//       <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
//          <ActivityIndicator size="large" color="#0000ff" /> 
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={email ? 'Home' : 'Login'}>
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//       <Toast />
//     </NavigationContainer>
//   );
// };

// export default App;
// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, PermissionsAndroid, Platform, Linking } from 'react-native';
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
// const Stack = createStackNavigator();

// const requestLocationPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Location permission granted');
//       } else {
//         console.log('Location permission denied');
//       }
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn('Error requesting location permission:', err);
//       return false;
//     }
//   }
//   return true;
// };

// const transmitLocation = async (latitude:any, longitude:any) => {
//   try{
//   const data = {
//     latitude: latitude,
//     longitude: longitude,
//     timestamp: new Date().toISOString(),
//   };
//   console.log("Location Data:", data);
//   const response = await axios.post('https://backendforpnf.vercel.app/gps', data);
//   console.log("response", response.data);
//   }
//   catch(err){
//     console.log("error will uploading co ordinates to backend", err);
//   }
//   };

// const openSettings = () => {
//   Linking.openSettings();
// };

// const App = () => {
//   const dispatch = useDispatch();
//   const email = useSelector(selectEmail);
//   const [initialLoading, setInitialLoading] = useState(true);
//    useEffect(() => {
//     const fetchData = async() =>{
//       try{
//           const response = await axios.get('https://799d-183-82-4-110.ngrok-free.app/Employees')
//           console.log(response.data);

//       }catch(err){
//         console.log("Error while fetching the employee Data", err)
//       }

//     }
//     fetchData();
//    })
//   useEffect(() => {
//     const checkUserLoggedIn = async () => {
//       try {
//         const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
//         if (userLoggedIn === 'true') {
//           const storedEmailId = await AsyncStorage.getItem('userEmailId');
//           dispatch(setEmail(storedEmailId));
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
//   }, [dispatch]);

//   useEffect(() => {
//     const getLocationAndTransmit = async () => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           console.log(position);
//           const { latitude, longitude } = position.coords;
//           //transmitLocation(latitude, longitude);
//         },
//         (error) => {
//           console.error(error);
//         },
//         { enableHighAccuracy: true, maximumAge: 10000 },
//       );
//     };

//     const initializeLocationTracking = async () => {
//       const permissionGranted = await requestLocationPermission();
//       if (permissionGranted) {
//         getLocationAndTransmit(); 
//         const intervalId = setInterval(getLocationAndTransmit, 10 * 60 * 1000); 
//         return () => clearInterval(intervalId); 
//       } else {
//         openSettings();
//       }
//     };

//     initializeLocationTracking();
//   }, []);

//   if (initialLoading) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={email ? 'Home' : 'Login'}>
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//       <Toast />
//     </NavigationContainer>
//   );
// };

// export default App;
// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, PermissionsAndroid, Platform, Linking } from 'react-native';
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
// import BackgroundFetch from 'react-native-background-fetch';
// const Stack = createStackNavigator();

// const requestLocationPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Location permission granted');
//       } else {
//         console.log('Location permission denied');
//       }
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn('Error requesting location permission:', err);
//       return false;
//     }
//   }
//   return true;
// };

// const transmitLocation = async (latitude:any, longitude:any) => {
//   try {
//     //console.log(latitude, longitude);
//     const data = {
//       latitude: latitude,
//       longitude: longitude,
//       timestamp: new Date().toISOString(),
//     };
//     //console.log("Location Data:", data);
//     const response = await axios.post('https://backendforpnf.vercel.app/gps', data);
//     console.log("response", response.data);
//   } catch (err) {
//     console.log("error will uploading co ordinates to backend", err);
//   }
// };

// const openSettings = () => {
//   Linking.openSettings();
// };

// const convertTo24HourFormat = (time:any) => {
//   let [hours, minutes] = time.slice(0, -2).split(':').map(Number);
//   const period = time.slice(-2);
//   //console.log(period);
//   if (period.toLowerCase() === 'pm' && hours !== 12) {
//     hours += 12;
//   } else if (period.toLowerCase() === 'am' && hours === 12) {
//     hours = 0;
//   }
//   //console.log(hours, minutes);
//   return { hours, minutes };
// };

// const isWithinWorkHours = (workStartTime:any, workEndTime:any) => {
//   //console.log(workStartTime, workEndTime);
//   const now = new Date();

//   const { hours: startHour, minutes: startMinutes } = convertTo24HourFormat(workStartTime);
//   const { hours: endHour, minutes: endMinutes } = convertTo24HourFormat(workEndTime);

//   const startTime = new Date(now);
//   const endTime = new Date(now);

//   startTime.setHours(startHour, startMinutes, 0, 0);
//   endTime.setHours(endHour, endMinutes, 0, 0);

//   return now >= startTime && now <= endTime;
// };


// const App = () => {
//   const dispatch = useDispatch();
//   const email = useSelector(selectEmail);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://799d-183-82-4-110.ngrok-free.app/Employees');
//         //console.log(response.data);
//         setEmployees(response.data.data);
//       } catch (err) {
//         console.log("Error while fetching the employee Data", err);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const checkUserLoggedIn = async () => {
//       try {
//         const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
//         if (userLoggedIn === 'true') {
//           const storedEmailId = await AsyncStorage.getItem('userEmailId');
//           dispatch(setEmail(storedEmailId));
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
//   }, [dispatch]);

//   useEffect(() => {
//     const getLocationAndTransmit = async () => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           //console.log(position);
//           const { latitude, longitude } = position.coords;
//           const currentEmployee = employees.find(emp => emp.Email === email);
//           if (currentEmployee) {
//             //console.log(currentEmployee)
//             const workStartTime = currentEmployee["Work Start Time"];
//             const workEndTime = currentEmployee["Work End Time"];
//             //console.log(workStartTime, workEndTime);
//             if (isWithinWorkHours(workStartTime, workEndTime)) {
//               transmitLocation(latitude, longitude);
//               console.log(true);
//             }
//             else{
//               console.log(false);
//             }
//           }
//         },
//         (error) => {
//           console.error(error);
//         },
//         { enableHighAccuracy: true, maximumAge: 10000 },
//       );
//     };

//     const initializeLocationTracking = async () => {
//       const permissionGranted = await requestLocationPermission();
//       if (permissionGranted) {
//         getLocationAndTransmit();
//         const intervalId = setInterval(getLocationAndTransmit, 10 * 60 * 1000);
//         return () => clearInterval(intervalId);
//       } else {
//         openSettings();
//       }
//     };

//     initializeLocationTracking();
//   }, [email, employees]);

//   useEffect(() => {
//     const backgroundFetchTask = async (taskId) => {
//       console.log("[BackgroundFetch] Task ID:", taskId);
//       await getLocationAndTransmit();
//       BackgroundFetch.finish(taskId);
//     };

//     BackgroundFetch.configure(
//       {
//         minimumFetchInterval: 15, // Fetch interval in minutes
//         stopOnTerminate: false,   // Continue running after app is terminated
//         startOnBoot: true,        // Start background fetch after device is booted
//       },
//       backgroundFetchTask,
//       (error) => {
//         console.error("[BackgroundFetch] Configure failed:", error);
//       }
//     );

//     return () => {
//       BackgroundFetch.stop();
//     };
//   }, []);

//   if (initialLoading) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={email ? 'Home' : 'Login'}>
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//       <Toast />
//     </NavigationContainer>
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, PermissionsAndroid, Platform, Linking } from 'react-native';
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
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import BackgroundFetch from 'react-native-background-fetch'; // Import background fetch

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const [initialLoading, setInitialLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://799d-183-82-4-110.ngrok-free.app/Employees');
        setEmployees(response.data.data);
      } catch (err) {
        console.log("Error while fetching the employee Data", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        if (userLoggedIn === 'true') {
          const storedEmailId = await AsyncStorage.getItem('userEmailId');
          dispatch(setEmail(storedEmailId));
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
  }, [dispatch]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
          } else {
            console.log('Location permission denied');
          }
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn('Error requesting location permission:', err);
          return false;
        }
      }
      return true;
    };

    const transmitLocation = async (latitude, longitude) => {
      try {
        const data = {
          latitude: latitude,
          longitude: longitude,
          timestamp: new Date().toISOString(),
        };
        const response = await axios.post('https://backendforpnf.vercel.app/gps', data);
        console.log("response", response.data);
      } catch (err) {
        console.log("error will uploading co ordinates to backend", err);
      }
    };

    const getLocationAndTransmit = async () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentEmployee = employees.find(emp => emp.Email === email);
          if (currentEmployee) {
            const workStartTime = currentEmployee["Work Start Time"];
            const workEndTime = currentEmployee["Work End Time"];
            if (isWithinWorkHours(workStartTime, workEndTime)) {
              transmitLocation(latitude, longitude);
              console.log(true);
            } else {
              console.log(false);
            }
          }
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, maximumAge: 10000 },
      );
    };

    const initializeLocationTracking = async () => {
      const permissionGranted = await requestLocationPermission();
      if (permissionGranted) {
        getLocationAndTransmit();
        const intervalId = setInterval(getLocationAndTransmit, 10 * 60 * 1000);
        return () => clearInterval(intervalId);
      } else {
        openSettings();
      }
    };

    const openSettings = () => {
      Linking.openSettings();
    };

    const convertTo24HourFormat = (time) => {
      let [hours, minutes] = time.slice(0, -2).split(':').map(Number);
      const period = time.slice(-2);
      if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
      } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
      }
      return { hours, minutes };
    };

    const isWithinWorkHours = (workStartTime, workEndTime) => {
      const now = new Date();
      const { hours: startHour, minutes: startMinutes } = convertTo24HourFormat(workStartTime);
      const { hours: endHour, minutes: endMinutes } = convertTo24HourFormat(workEndTime);
      const startTime = new Date(now);
      const endTime = new Date(now);
      startTime.setHours(startHour, startMinutes, 0, 0);
      endTime.setHours(endHour, endMinutes, 0, 0);
      return now >= startTime && now <= endTime;
    };

    initializeLocationTracking();

    // Background fetch task
    const backgroundFetchTask = async (taskId) => {
      console.log("[BackgroundFetch] Task ID:", taskId);
      await getLocationAndTransmit(); // Run location fetching and transmitting logic
      BackgroundFetch.finish(taskId); // Signal completion of task
    };

    // Configure background fetch
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // Fetch interval in minutes
        stopOnTerminate: false,   // Continue running after app is terminated
        startOnBoot: true,        // Start background fetch after device is booted
      },
      backgroundFetchTask, // Pass background fetch task function
      (error) => {
        console.error("[BackgroundFetch] Configure failed:", error);
      }
    );

    // Clean up background fetch when component unmounts
    return () => {
      BackgroundFetch.stop();
    };
  }, [email, employees]);

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
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      );
    };
    
      
export default App;
