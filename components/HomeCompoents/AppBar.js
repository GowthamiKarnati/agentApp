// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, StyleSheet, TextInput ,TouchableOpacity,Dimensions} from 'react-native';
// import { useDispatch } from 'react-redux';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { setEmail, setSearchValue } from '../../redux/authSlice';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import NewCustomerTrigger from './NewCustomerTrigger';
// import CustomersList from './CustomersList';

// const AppBar = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState('');
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'newCustomers', title: 'New Customers' },
//     { key: 'oldCustomers', title: 'Old Customers' },
//   ]);
//   const renderScene = SceneMap({
//     newCustomers: NewCustomerTrigger,
//     oldCustomers: CustomersList,
//   });
//   const renderTabBar = props => (
//     <TabBar
//       {...props}
//       indicatorStyle={{ backgroundColor: 'white' }}
//       style={{ backgroundColor: '#12b981' }}
//       labelStyle={{ color: 'white' }}
//     />
//   );

//   const handleLogout = async () => {
//     try {
//       dispatch(setEmail(''));
//       await AsyncStorage.clear();
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };
//   const handleSearch = (text) => {
//     setSearchText(text);
//     dispatch(setSearchValue(text));
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       setSearchText('');
//     }, [])
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//       <TouchableOpacity onPress={handleLogout}>
//           <Icon name="sign-out-alt" size={23} color="white" />
//         </TouchableOpacity>
//         <View style={styles.titleContainer}>
//           <Text style={styles.appBarTitle}>My Customers</Text>
//         </View>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           placeholderTextColor={'black'}
//           value={searchText}
//           onChangeText={handleSearch}
//         />
//       </View>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width: Dimensions.get('window').width }}
//         renderTabBar={renderTabBar}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 70,
//     backgroundColor: '#12b981',
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   titleContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   appBarTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   searchInput: {
//     height: 40,
//     backgroundColor: 'white',
//     marginLeft: 30,
//     paddingLeft: 10,
//     borderRadius: 8,
//     flex: 1,
//     color: 'black',
//   },
// });

// export default AppBar;
  // import React, { useState } from 'react';
  // import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
  // import { useDispatch } from 'react-redux';
  // import { useNavigation, useFocusEffect } from '@react-navigation/native';
  // import { setEmail, setSearchValue } from '../../redux/authSlice';
  // import Icon from 'react-native-vector-icons/FontAwesome5';
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  // import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
  // import NewCustomerList from './NewCustomerList';
  // import CustomersList from './CustomersList';

  // const AppBar = () => {
  //   const dispatch = useDispatch();
  //   const navigation = useNavigation();
  //   const [searchText, setSearchText] = useState('');
  //   const [index, setIndex] = useState(0);
  //   const [routes] = useState([
  //     { key: 'oldCustomers', title: 'Old Customers' },
  //     { key: 'newCustomers', title: 'New Customers' },
  //   ]);
  
  //   const renderScene = ({ route }) => {
  //     //console.log(route);
  //     switch (route.key) {
  //       case 'oldCustomers':
  //         return <CustomersList />;
  //       case 'newCustomers':
  //         return <NewCustomerList />;
  //       default:
  //         return null;
  //     }
  //   };

  //   const renderTabBar = (props) => {
  //     // console.log('', props);
  //     return (<TabBar
  //       {...props}
  //       renderLabel={({ route, focused, color }) => (
  //         <Text key={route.key} style={{ color, margin: 8 }}>
  //           {route.title}
  //         </Text>
  //       )}
  //       indicatorStyle={{ backgroundColor: 'white' }}
  //       style={{ backgroundColor: '#12b981' }}
  //     />)
  //     };

  //   const handleLogout = async () => {
  //     try {
  //       dispatch(setEmail(''));
  //       await AsyncStorage.clear();
  //       navigation.navigate('Login');
  //     } catch (error) {
  //       console.error('Error during logout:', error);
  //     }
  //   };

  //   const handleSearch = (text) => {
  //     setSearchText(text);
  //     dispatch(setSearchValue(text));
  //   };

  //   // useFocusEffect(
  //   //   React.useCallback(() => {
  //   //     setSearchText('');
  //   //   }, [])
  //   // );

  //   return (
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <View style={styles.container}>
  //         <TouchableOpacity onPress={handleLogout}>
  //           <Icon name="sign-out-alt" size={23} color="white" />
  //         </TouchableOpacity>
  //         <View style={styles.titleContainer}>
  //           <Text style={styles.appBarTitle}>My Customers</Text>
  //         </View>
  //         <TextInput
  //           style={styles.searchInput}
  //           placeholder="Search..."
  //           placeholderTextColor={'black'}
  //           value={searchText}
  //           onChangeText={handleSearch}
  //         />
  //       </View>
  //       <TabView
  //         navigationState={{ index, routes }}
  //         renderScene={renderScene}
  //         onIndexChange={setIndex}
  //         initialLayout={{ width: Dimensions.get('window').width }}
  //         renderTabBar={renderTabBar}
  //       />
  //     </SafeAreaView>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     height: 70,
  //     backgroundColor: '#12b981',
  //     padding: 16,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   titleContainer: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   appBarTitle: {
  //     fontSize: 20,
  //     color: 'white',
  //     fontWeight: '500',
  //     textAlign: 'center',
  //   },
  //   searchInput: {
  //     height: 40,
  //     backgroundColor: 'white',
  //     marginLeft: 30,
  //     paddingLeft: 10,
  //     borderRadius: 8,
  //     flex: 1,
  //     color: 'black',
  //   },
  // });

  // export default AppBar;

  // import React, { useState } from 'react';
  // import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
  // import { useDispatch } from 'react-redux';
  // import { useNavigation } from '@react-navigation/native';
  // import { setEmail, setSearchValue } from '../../redux/authSlice';
  // import Icon from 'react-native-vector-icons/FontAwesome5';
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  // import NewCustomerList from './NewCustomerList';
  // import CustomersList from './CustomersList';
  // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  // const Tab = createBottomTabNavigator();

  // //const Tab = createMaterialTopTabNavigator();
  // const AppBar = () => {
  //   const dispatch = useDispatch();
  //   const navigation = useNavigation();
  //   const [searchText, setSearchText] = useState('');
  //   const handleLogout = async () => {
  //     try {
  //       dispatch(setEmail(''));
  //       await AsyncStorage.clear();
  //       navigation.navigate('Login');
  //     } catch (error) {
  //       console.error('Error during logout:', error);
  //     }
  //   };
  
  //   const handleSearch = (text) => {
  //     setSearchText(text);
  //     dispatch(setSearchValue(text));
  //   };
  
  //   const clearSearch = () => {
  //     setSearchText('');
  //     dispatch(setSearchValue(''));
  //   };
  
  //   return (
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <View style={styles.container}>
  //         <TouchableOpacity onPress={handleLogout}>
  //           <Icon name="sign-out-alt" size={23} color="white" />
  //         </TouchableOpacity>
  //         <View style={styles.titleContainer}>
  //           <Text style={styles.appBarTitle}>My Customers</Text>
  //         </View>
  //         <View style={styles.searchContainer}>
  //           <TextInput
  //             style={styles.searchInput}
  //             placeholder="Search..."
  //             placeholderTextColor={'gray'}
  //             value={searchText}
  //             onChangeText={handleSearch}
  //           />
  //           {searchText.length > 0 && (
  //             <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
  //               <Icon name="times" size={15} color="black" />
  //             </TouchableOpacity>
  //           )}
  //         </View>
  //       </View>
  //       <Tab.Navigator
  //       screenOptions={{
  //         tabBarActiveTintColor: 'white',
  //         tabBarLabelStyle: { fontSize: 12 },
  //         tabBarStyle: { backgroundColor: '#12b981' },

  //       }}
  //       >
  //         <Tab.Screen name="Old" component={CustomersList} options={{ tabBarLabel: 'Old Customers' }}/>
  //         <Tab.Screen name="New" component={NewCustomerList} options={{ tabBarLabel: 'New Customers' }}/>
  //       </Tab.Navigator>
  //     </SafeAreaView>
  //   );
  // };
  
  // const styles = StyleSheet.create({
  //   container: {
  //     height: 70,
  //     backgroundColor: '#12b981',
  //     padding: 16,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   titleContainer: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   appBarTitle: {
  //     fontSize: 20,
  //     color: 'white',
  //     fontWeight: '500',
  //     textAlign: 'center',
  //   },
  //   searchContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     backgroundColor: 'white',
  //     borderRadius: 8,
  //     flex: 1,
  //     height: 40,
  //     paddingLeft: 10,
  //   },
  //   searchInput: {
  //     flex: 1,
  //     color: 'black',
  //   },
  //   clearButton: {
  //     padding: 5,
  //     marginRight:10
  //   },
  // });
  
  // export default AppBar;
  import React, { useState } from 'react';
  import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
  import { useDispatch } from 'react-redux';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { setEmail, setSearchValue } from '../../redux/authSlice';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import NewCustomerList from './NewCustomerList';
  import CustomersList from './CustomersList';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  
  const Tab = createBottomTabNavigator();


  const AppBar = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const route = useRoute();
    const [activeTab, setActiveTab] = useState('Old');

    //console.log(route)
    const handleLogout = async () => {
      try {
        dispatch(setEmail(''));
        await AsyncStorage.clear();
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
  
    const handleSearch = (text) => {
      setSearchText(text);
      dispatch(setSearchValue(text));
    };
  
    const clearSearch = () => {
      setSearchText('');
      dispatch(setSearchValue(''));
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="sign-out-alt" size={23} color="white" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.appBarTitle}>Customers</Text>
          </View>
          {activeTab !== 'New' && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={'gray'}
              value={searchText}
              onChangeText={handleSearch}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Icon name="times" size={15} color="black" />
              </TouchableOpacity>
            )}
          </View>
          )}
        </View>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'white',
            tabBarLabelStyle: { fontSize: 13, marginBottom:4 },
            tabBarStyle: { backgroundColor: '#12b981',height:55 },
            tabBarIcon: ({ color, size }) => {
              let iconName;
  
              if (route.name === 'Old') {
                iconName = 'user-alt';
              } else if (route.name === 'New') {
                iconName = 'user-plus';
              }
  
              return <Icon name={iconName} size={size} color={color} />;
            },
            
          })}
          screenListeners={({ route }) => ({
            tabPress: () => {
              setActiveTab(route.name);
            },
          })}
        >
          <Tab.Screen name="Old" component={CustomersList} options={{ tabBarLabel: 'Existing Customers', headerShown:false }} />
          <Tab.Screen name="New" component={NewCustomerList} options={{ tabBarLabel: 'New Customers', headerShown:false }} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      height: 70,
      backgroundColor: '#12b981',
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appBarTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: '500',
      textAlign: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      flex: 1,
      height: 40,
      paddingLeft: 10,
    },
    searchInput: {
      flex: 1,
      color: 'black',
    },
    clearButton: {
      padding: 5,
      marginRight: 10,
    },
  });
  
  export default AppBar;
  