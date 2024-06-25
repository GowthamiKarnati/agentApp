
import React, { useEffect, useState } from 'react';  // Import useState
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AppBar from '../components/HomeCompoents/AppBar';
import CustomersList from '../components/HomeCompoents/CustomersList';
import NewCustomerTrigger from '../components/HomeCompoents/NewCustomerList';
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView stickyHeaderIndices={[0]}> */}
        <AppBar />
        {/* <NewCustomerTrigger />
        <CustomersList /> */}
      {/* </ScrollView> */}
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
