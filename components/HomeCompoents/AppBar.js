import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput ,TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { setEmail, setSearchValue } from '../../redux/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppBar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
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

  useFocusEffect(
    React.useCallback(() => {
      setSearchText('');
    }, [])
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
          <Icon name="sign-out-alt" size={23} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.appBarTitle}>My Customers</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={'black'}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
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
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    marginLeft: 30,
    paddingLeft: 10,
    borderRadius: 8,
    flex: 1,
    color: 'black',
  },
});

export default AppBar;
