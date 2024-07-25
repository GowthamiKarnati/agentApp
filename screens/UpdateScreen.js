import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { selectFieldToUpdate } from '../redux/authSlice';
import { useSelector } from 'react-redux';
import HouseImagesUpdate from '../components/UpdateComponents/HouseImagesUpdate';
import HouseLocationUpdate from '../components/UpdateComponents/HouseLocationUpdate';
const UpdateScreen = () => {
  const fieldName = useSelector(selectFieldToUpdate);
  const renderUpdateComponent = () => {
    switch (fieldName) {
      case 'houseimage':
        return <HouseImagesUpdate />
      case 'houselocation':
        return <HouseLocationUpdate />
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderUpdateComponent()}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 20, // Add padding if needed
  },
});

export default UpdateScreen