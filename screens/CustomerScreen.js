import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react'
import AppBar from '../components/CustomerDetailsCompoents/AppBar';
import CustomerEmis from '../components/CustomerDetailsCompoents/CustomerEmis';
import CustomerKyc from '../components/CustomerDetailsCompoents/CustomerKyc';
import Details from '../components/CustomerDetailsCompoents/Details';
const CustomerScreen = () => {
  //const route = useRoute();
  //const { customerData } = route.params || {};
  return (
    <SafeAreaView style={styles.container}>
      
      <AppBar   />
      <ScrollView >
        <Details />
        <CustomerKyc />
        <CustomerEmis />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:'#f3f4f6'
    }
  });
export default CustomerScreen