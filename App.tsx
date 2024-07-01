// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, ActivityIndicator, PermissionsAndroid, Platform, Linking, AppState } from 'react-native';
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
// import { NativeModules } from 'react-native';
// const { LocationService } = NativeModules;
// const Stack = createStackNavigator();

// const App = () => {
//   const dispatch = useDispatch();
//   //const email = 'riktam@test.com';
//   const email = useSelector(selectEmail) ;
//   console.log("Email", email);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [employees, setEmployees] = useState([]);
//   const locationRef = useRef();
//   const appState = useRef(AppState.currentState);
//   const [appStateVisible, setAppStateVisible] = useState(appState.current);

//   useEffect(() => { // employee Data
//     const fetchData = async (retryCount = 3, delay = 2000) => {
//       try {
//         const response = await axios.get('https://backendforpnf.vercel.app/Employees', { timeout: 10000 });
//         console.log('EMPLOYEE API', response.data.data?.length);
//         await AsyncStorage.setItem('employeesFromLocalStorage', JSON.stringify(response.data.data));
//         setEmployees(response.data.data);
//       } catch (err:any) {
//         if (retryCount === 0 || err.response?.status === 504) {
//           console.error('Error fetching data:', err);
//         } else {
//           console.warn(`Retrying... (${retryCount} attempts left)`);
//           setTimeout(() => fetchData(retryCount - 1, delay), delay);
//         }
//       }
//     };

//     fetchData();
//   }, []);


//   useEffect(() => { // Login based navigation
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
//   const transmitLocation = async (latitude:any, longitude:any, username:any) => {
    
//     try {
//       const appStateStatus = AppState.currentState;
//       const data = {
//         latitude: latitude,
//         longitude: longitude,
//         timestamp: new Date().toISOString(),
//         username:username,
//         appState: appStateStatus
//       };
//       //console.log('Before Calling API: ',data);
//       const response = await axios.post('https://backendforpnf.vercel.app/gps', data);
//       //locationRef.current = null;
//       console.log("response", response.data);
//     } catch (err) {
//       console.log("error will uploading co ordinates to backend", err);
//     }
//   };
//   const convertTo24HourFormat = (time:any) => {
//     let [hours, minutes] = time.slice(0, -2).split(':').map(Number);
//     const period = time.slice(-2);
//     if (period.toLowerCase() === 'pm' && hours !== 12) {
//         hours += 12;
//     } else if (period.toLowerCase() === 'am' && hours === 12) {
//         hours = 0;
//     }
//     return { hours, minutes };
//   };

//   const isWithinWorkHours = (workStartTime:any, workEndTime:any) => {
//     const now = new Date();
//     const { hours: startHour, minutes: startMinutes } = convertTo24HourFormat(workStartTime);
//     const { hours: endHour, minutes: endMinutes } = convertTo24HourFormat(workEndTime);

//     const startTime = new Date(now);
//     const endTime = new Date(now);

//     startTime.setHours(startHour, startMinutes, 0, 0);
//     endTime.setHours(endHour, endMinutes, 0, 0);

//     // Check if the work hours span midnight
//     const spansMidnight = endTime <= startTime;

//     //console.log("Current Time:", now);
//     //console.log("Start Time:", startTime);
//     //console.log("End Time:", endTime);
//     //console.log("Spans Midnight:", spansMidnight);

//     if (spansMidnight) {
//         const endTimeNextDay = new Date(endTime);
//         endTimeNextDay.setDate(endTimeNextDay.getDate() + 1);
//         console.log("End Time Next Day:", endTimeNextDay);
//         return now >= startTime || now <= endTimeNextDay;
//     } else {
//         return now >= startTime && now <= endTime;
//     }
//   };

//   const getLocationAndTransmit = async () => {
//     //console.log('insided get location');
//     Geolocation.getCurrentPosition(
//       (position) => {
//         //console.log('position', position);
//         const { latitude, longitude } = position.coords;
//         //console.log(email);
//         //console.log(employees);
//         const currentEmployee = employees.find(emp => emp.Email === email);
//         console.log('is current employee', currentEmployee, employees?.length, email);
//         if (currentEmployee) {
//           const username = currentEmployee["Full Name"];
//           const workStartTime = currentEmployee["Work Start Time"];
//           const workEndTime = currentEmployee["Work End Time"];
//           if (isWithinWorkHours(workStartTime, workEndTime)) {
//             console.log('In Work Time');
//             //transmitLocation(latitude, longitude,username);
//           } else {
//             console.log('Out of Work Time');
//             return;
//           }
//         }
//       },
//       (error) => {
//         console.error(error);
//       },
//       { enableHighAccuracy: true, forceLocationManager: true, maximumAge: 3000 },
//     );
//   };
//   const getNativePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           const backgroundGranted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//             {
//               title: 'Background Location Permission',
//               message: 'This app needs access to your location in the background',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             }
//           );

//           if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Location and background location permissions granted');
//             getLocationAndTransmit();
//           } else {
//             console.log('Background location permission denied');
//           }
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn('Error requesting location permission:', err);
//       }
//     } else {
//       // Handle iOS permissions
//       const fineLocationGranted = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
//       if (fineLocationGranted === RESULTS.GRANTED) {
//         getLocationAndTransmit();
//       }
//     }
//   };
// useEffect(() => { // Location tracking
//   if (employees.length > 0) {
//     getNativePermission();
//     const interval = setInterval(() => {
//       if (!locationRef.current) {
//         getNativePermission();
//       }
//     }, 10 * 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }
//   else{
//     console.log("no Employee Data")
//   }
// }, [email, employees]);

// const getEmployeeData = async () => {
//   const empEmail = await AsyncStorage.getItem('userEmailId') || '';
//   const employeesFromStorage = await AsyncStorage.getItem('employeesFromLocalStorage') as any;
//   const parsedEmployees = await JSON.parse(employeesFromStorage);

//   return parsedEmployees.find((emp: any) => emp.Email === empEmail);
// };


// const startBackgroundLocationTracking = async () => {
//   if (Platform.OS === 'android') {
//     const backgroundGranted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//       {
//         title: 'Background Location Permission',
//         message: 'This app needs access to your location in the background',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       }
//     );
//     if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Background location permission granted');
//       const employeeInfo = await getEmployeeData();
//       console.log(employeeInfo);

      
//       if (employeeInfo) {
//         const username = employeeInfo["Full Name"];
//         const workStartTime = employeeInfo["Work Start Time"];
//         const workEndTime = employeeInfo["Work End Time"];
//         if (isWithinWorkHours(workStartTime, workEndTime)) {
//           BackgroundTimer.runBackgroundTimer(() => {
//           Geolocation.getCurrentPosition(position => {
//             console.log(position);
//             const { latitude, longitude } = position.coords;
//             transmitLocation(latitude, longitude, username);
//           },
//           (error) => {
//             console.error('Error getting background position:', error);
//           },
//           {
//             enableHighAccuracy: true,
//             maximumAge: 30000,
//             distanceFilter: 50,

//           });
//         }, 1000 * 60 * 5)
//         return () => {
//           BackgroundTimer.stopBackgroundTimer();
//         };
//       }
        
//         else {
//           console.log('Out of Work Time');
//           return;
//         }
//     } else {
//       console.log('Background location permission denied');
//     }  
//   }
//   else {
//     // Handle iOS background location tracking
//     console.log('iOS background location tracking');
//   }

// }
// }
// useEffect(() => {
//   const appStateListener = AppState.addEventListener('change', //can be 'background' or 'active'
//       nextAppState => {
//       if(nextAppState == 'background')
//       {
//           console.log("Backround");
//           //configureBackgroundFetch();
//           backGroundTimer();
//          // startBackgroundLocationTracking();
//       }
//   },
//   );
//   return () => {
//     appStateListener?.remove();
//   };
// }, []);
//   const backGroundTimer = () =>{
//       BackgroundTimer.runBackgroundTimer(() => {
//         getLocationAndTransmitForBackground();
//       }, 5 *60 * 1000);
//       return () => {
//         BackgroundTimer.stopBackgroundTimer();
//       };
  
//     }
  
//   const getNativeBackGroundPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           const backgroundGranted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//             {
//               title: 'Background Location Permission',
//               message: 'This app needs access to your location in the background',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             }
//           );

//           if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Location and background location permissions granted');
//             getLocationAndTransmitForBackground();
//           } else {
//             console.log('Background location permission denied');
//           }
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn('Error requesting location permission:', err);
//       }
//     } else {
//       // Handle iOS permissions
//       const fineLocationGranted = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
//       if (fineLocationGranted === RESULTS.GRANTED) {
//         getLocationAndTransmit();
//       }
//     }
//   };
//   const configureBackgroundFetch = async () => {
//     BackgroundFetch.configure(
//       {
//         minimumFetchInterval: 15, 
//         stopOnTerminate: false,
//         startOnBoot: true,
//         requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
//         requiresCharging: false,
//         requiresDeviceIdle: false,
//         requiresBatteryNotLow: false,
//         requiresStorageNotLow: false,
//         enableHeadless: true
//       },
//       async (taskId) => {
//         console.log("Running background Task")
//         await getNativeBackGroundPermission ();
//         BackgroundFetch.finish(taskId);
//       },
//       (error) => {
//         console.log('[BackgroundFetch] configure error:', error);
//       }
//     );

//     const status = await BackgroundFetch.status();
//     console.log('[BackgroundFetch] status:', status);
//   };

//   const getLocationAndTransmitForBackground = () => {
//   Geolocation.getCurrentPosition(
//     async (position) => {
//       try {
//         const { latitude, longitude } = position.coords;
//         const employeeEmail = await AsyncStorage.getItem('userEmailId');
        
//         AsyncStorage.getItem('employeesFromLocalStorage').then(employeesFromLocal => {
//           console.log("dataFrom Local", employeesFromLocal);
//           const currentEmployee = JSON.parse(employeesFromLocal).find(emp => emp.Email === employeeEmail);
//           console.log('is current employee', currentEmployee, employees?.length, email);
//           if (currentEmployee) {
//             const username = currentEmployee["Full Name"];
//             const workStartTime = currentEmployee["Work Start Time"];
//             const workEndTime = currentEmployee["Work End Time"];
//             if (isWithinWorkHours(workStartTime, workEndTime)) {
//               console.log('In Work Time');
//               transmitLocation(latitude, longitude, username);
//             } else {
//               console.log('Out of Work Time');
//               return;
//             }
//           }
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     (error) => {
//       console.error(error);
//     },
//     { enableHighAccuracy: true, forceLocationManager: true, maximumAge: 3000 },
//   );
// };
//   const openSettings = () => {
//     Linking.openSettings();
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Location permission granted');
//         } else {
//           console.log('Location permission denied');
//         }
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn('Error requesting location permission:', err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const initializeLocationTracking = async () => {
//     const permissionGranted = await requestLocationPermission();
//     console.log(permissionGranted, 'go get location and tramsiimt');
//     if (permissionGranted) {
//       getLocationAndTransmit();
//     } else {
//       openSettings();
//     }
//   };

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
//           </Stack.Navigator>
//           <Toast />
//         </NavigationContainer>
//       );
//     };
// export default App;
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, PermissionsAndroid, Platform, Linking, AppState } from 'react-native';
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
import BackgroundTimer from 'react-native-background-timer';
import {RESULTS, PERMISSIONS, request } from 'react-native-permissions';
import NewCustomerProfileScreen from './screens/NewCustomerProfileScreen';
import NewCustomerUpdateScreen from './screens/NewCustomerUpdateScreen';
const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  //const email = 'riktam@test.com';
  const email = useSelector(selectEmail) ;
  console.log("Email", email);
  const [initialLoading, setInitialLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const locationRef = useRef();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => { // employee Data
    const fetchData = async (retryCount = 3, delay = 2000) => {
      try {
        const response = await axios.get('https://backendforpnf.vercel.app/Employees', { timeout: 10000 });
        console.log('EMPLOYEE API', response.data.data?.length);
        await AsyncStorage.setItem('employeesFromLocalStorage', JSON.stringify(response.data.data));
        setEmployees(response.data.data);
      } catch (err:any) {
        if (retryCount === 0 || err.response?.status === 504) {
          console.error('Error fetching data:', err);
        } else {
          console.warn(`Retrying... (${retryCount} attempts left)`);
          setTimeout(() => fetchData(retryCount - 1, delay), delay);
        }
      }
    };

    fetchData();
  }, []);


  useEffect(() => { // Login based navigation
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

  
useEffect(() => { // Location tracking
  if (employees.length > 0) {
    getNativePermission();
    const interval = setInterval(() => {
      if (!locationRef.current) {
        getNativePermission();
      }
    }, 5 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }
  else{
    console.log("no Employee Data")
  }
}, [email, employees]);
const backGroundTimer = () =>{
    BackgroundTimer.runBackgroundTimer(() => {
      //getLocationAndTransmitForBackground();
    }, 300000);
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }
  const startBackgroundLocationTracking = async () => {
    if (Platform.OS === 'android') {
      const backgroundGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message: 'This app needs access to your location in the background',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Background location permission granted');
        Geolocation.watchPosition(
          (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
            const currentEmployee = employees.find((emp) => emp.Email === email);
            //console.log(currentEmployee);
            if (currentEmployee && isWithinWorkHours(currentEmployee['Work Start Time'], currentEmployee['Work End Time'])) {
              //transmitLocation(latitude, longitude, currentEmployee['Full Name']);
            }
          },
          (error) => {
            console.error('Error getting background position:', error);
          },
          {
            enableHighAccuracy: true,
            showLocationDialog: true,
          }
        );
      } else {
        console.log('Background location permission denied');
      }
    } else {
      // Handle iOS background location tracking
      console.log('iOS background location tracking');
    }
  }
useEffect(() => {
  const appStateListener = AppState.addEventListener('change', //can be 'background' or 'active'
      nextAppState => {
      if(nextAppState == 'background')
      {
          console.log("Backround");
          //configureBackgroundFetch();
          //backGroundTimer();
          startBackgroundLocationTracking();
      }
  },
  );
  return () => {
    appStateListener?.remove();
  };
}, []);

  const getNativePermission = async () => {
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
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const backgroundGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            {
              title: 'Background Location Permission',
              message: 'This app needs access to your location in the background',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location and background location permissions granted');
            //getLocationAndTransmit();
          } else {
            console.log('Background location permission denied');
          }
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn('Error requesting location permission:', err);
      }
    } else {
      // Handle iOS permissions
      const fineLocationGranted = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (fineLocationGranted === RESULTS.GRANTED) {
        getLocationAndTransmit();
      }
    }
  };
  const getNativeBackGroundPermission = async () => {
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
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const backgroundGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            {
              title: 'Background Location Permission',
              message: 'This app needs access to your location in the background',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (backgroundGranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location and background location permissions granted');
            getLocationAndTransmitForBackground();
          } else {
            console.log('Background location permission denied');
          }
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn('Error requesting location permission:', err);
      }
    } else {
      // Handle iOS permissions
      const fineLocationGranted = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (fineLocationGranted === RESULTS.GRANTED) {
        getLocationAndTransmit();
      }
    }
  };
  const configureBackgroundFetch = async () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, 
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        requiresCharging: false,
        requiresDeviceIdle: false,
        requiresBatteryNotLow: false,
        requiresStorageNotLow: false,
        enableHeadless: true
      },
      async (taskId) => {
        console.log("Running background Task")
        await getNativeBackGroundPermission ();
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log('[BackgroundFetch] configure error:', error);
      }
    );

    const status = await BackgroundFetch.status();
    console.log('[BackgroundFetch] status:', status);
  };
  


  
  const transmitLocation = async (latitude:any, longitude:any, username:any) => {
    try {
      const appStateStatus = AppState.currentState;
      const data = {
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date().toISOString(),
        username:username,
        appState: appStateStatus
      };
      //console.log('Before Calling API: ',data);
      const response = await axios.post('https://backendforpnf.vercel.app/gps', data);
      //locationRef.current = null;
      console.log("response", response.data);
    } catch (err) {
      console.log("error will uploading co ordinates to backend", err);
    }
  };


  const convertTo24HourFormat = (time:any) => {
    let [hours, minutes] = time.slice(0, -2).split(':').map(Number);
    const period = time.slice(-2);
    if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
    }
    return { hours, minutes };
};

const isWithinWorkHours = (workStartTime:any, workEndTime:any) => {
    const now = new Date();
    const { hours: startHour, minutes: startMinutes } = convertTo24HourFormat(workStartTime);
    const { hours: endHour, minutes: endMinutes } = convertTo24HourFormat(workEndTime);

    const startTime = new Date(now);
    const endTime = new Date(now);

    startTime.setHours(startHour, startMinutes, 0, 0);
    endTime.setHours(endHour, endMinutes, 0, 0);

    // Check if the work hours span midnight
    const spansMidnight = endTime <= startTime;

    //console.log("Current Time:", now);
    //console.log("Start Time:", startTime);
    //console.log("End Time:", endTime);
    //console.log("Spans Midnight:", spansMidnight);

    if (spansMidnight) {
        const endTimeNextDay = new Date(endTime);
        endTimeNextDay.setDate(endTimeNextDay.getDate() + 1);
        console.log("End Time Next Day:", endTimeNextDay);
        return now >= startTime || now <= endTimeNextDay;
    } else {
        return now >= startTime && now <= endTime;
    }
};

  


  const getLocationAndTransmit = async () => {
    //console.log('insided get location');
    Geolocation.getCurrentPosition(
      (position) => {
        //console.log('position', position);
        const { latitude, longitude } = position.coords;
        //console.log(email);
        //console.log(employees);
        const currentEmployee = employees.find(emp => emp.Email === email);
        console.log('is current employee', currentEmployee, employees?.length, email);
        if (currentEmployee) {
          const username = currentEmployee["Full Name"];
          const workStartTime = currentEmployee["Work Start Time"];
          const workEndTime = currentEmployee["Work End Time"];
          if (isWithinWorkHours(workStartTime, workEndTime)) {
            console.log('In Work Time');
            transmitLocation(latitude, longitude,username);
          } else {
            console.log('Out of Work Time');
            return;
          }
        }
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, forceLocationManager: true, maximumAge: 3000 },
    );
  };
  const getLocationAndTransmitForBackground = () => {
  Geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const employeeEmail = await AsyncStorage.getItem('userEmailId');
        
        AsyncStorage.getItem('employeesFromLocalStorage').then(employeesFromLocal => {
          console.log("dataFrom Local", employeesFromLocal);
          const currentEmployee = JSON.parse(employeesFromLocal).find(emp => emp.Email === employeeEmail);
          console.log('is current employee', currentEmployee, employees?.length, email);
          if (currentEmployee) {
            const username = currentEmployee["Full Name"];
            const workStartTime = currentEmployee["Work Start Time"];
            const workEndTime = currentEmployee["Work End Time"];
            if (isWithinWorkHours(workStartTime, workEndTime)) {
              console.log('In Work Time');
              transmitLocation(latitude, longitude, username);
            } else {
              console.log('Out of Work Time');
              return;
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    (error) => {
      console.error(error);
    },
    { enableHighAccuracy: true, forceLocationManager: true, maximumAge: 3000 },
  );
};
  const openSettings = () => {
    Linking.openSettings();
  };

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

  const initializeLocationTracking = async () => {
    const permissionGranted = await requestLocationPermission();
    console.log(permissionGranted, 'go get location and tramsiimt');
    if (permissionGranted) {
      getLocationAndTransmit();
    } else {
      openSettings();
    }
  };

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
            <Stack.Screen name= "NewCustomerProfile" component={NewCustomerProfileScreen} options={{headerShown: false}} />
            <Stack.Screen name = "NewCustomerUpdate" component = {NewCustomerUpdateScreen} options={{headerShown: false}} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      );
    };
    
    
export default App;