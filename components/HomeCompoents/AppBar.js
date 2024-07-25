import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Dimensions, NativeModules } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation,useRoute } from '@react-navigation/native';
import { setEmail, setSearchValue } from '../../redux/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewCustomerList from './NewCustomerList';
import CustomersList from './CustomersList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { LocationModule } = NativeModules;
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
      console.log("AsyncStorage cleared.");
      const keys = await AsyncStorage.getAllKeys();
      console.log("Keys after clear:", keys); // Should be an empty array

      LocationModule.stopLocationService();
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
