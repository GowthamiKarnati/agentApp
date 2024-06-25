import { View, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { selectnewCustomerFeild } from '../redux/authSlice';
import { useSelector } from 'react-redux';
import HouseImagesUpdate from '../components/NewCustomerUpdateComponents/HouseImagesUpdate';
import HouseLocationUpdate from '../components/NewCustomerUpdateComponents/HouseLocationUpdate';


const UpdateScreen = () => {
  const fieldName = useSelector(selectnewCustomerFeild);

  // Render the appropriate component based on the fieldToUpdate parameter
  const renderUpdateComponent = () => {
    switch (fieldName) {
      case 'houseImages':
        return <HouseImagesUpdate />
      case 'gps':
        return <HouseLocationUpdate />
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      {renderUpdateComponent()}
    </View>
  );
}

export default UpdateScreen