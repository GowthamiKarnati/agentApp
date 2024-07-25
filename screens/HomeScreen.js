import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppBar from '../components/HomeCompoents/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  console.log(navigation,"navigation in home screen")

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (userLoggedIn !== 'true') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    checkUserLoggedIn();
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <AppBar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});

export default HomeScreen;
