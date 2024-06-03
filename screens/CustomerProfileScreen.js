import React, { useEffect, useState } from 'react';  // Import useState
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AppBar from '../components/CustomerProfileComponents/AppBar';
import CustomerProfile from '../components/CustomerProfileComponents/CustomerProfile';

const CustomerProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      
       <AppBar />
       <ScrollView >
       <CustomerProfile /> 
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



export default CustomerProfileScreen