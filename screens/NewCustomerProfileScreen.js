import React, { useEffect, useState } from 'react';  // Import useState
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AppBar from '../components/NewCustomerProfileComponents/AppBar';
import NewCustomerProfile from '../components/NewCustomerProfileComponents/NewCustomerProfile';
const CustomerProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      
       <AppBar />
       <NewCustomerProfile />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});



export default CustomerProfileScreen