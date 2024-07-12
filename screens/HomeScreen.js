
import React, { useEffect, useState } from 'react';  // Import useState
import { SafeAreaView, ScrollView, StyleSheet, View,BackHandler } from 'react-native';
import AppBar from '../components/HomeCompoents/AppBar';
import CustomersList from '../components/HomeCompoents/CustomersList';
import NewCustomerTrigger from '../components/HomeCompoents/NewCustomerList';
const HomeScreen = () => {
  useEffect(() => {
        const backAction = () => {
          // Exit the app when the back button is pressed
          BackHandler.exitApp();
          return true; // Prevent default behavior
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <AppBar />
        {/* <NewCustomerTrigger />
        <CustomersList /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});

export default HomeScreen;
