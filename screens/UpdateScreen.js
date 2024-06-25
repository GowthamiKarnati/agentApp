import { View, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { selectFieldToUpdate } from '../redux/authSlice';
// import DobUpdate from '../components/UpdateComponents/DobUpdate';
import { useSelector } from 'react-redux';
// import PanUpdate from '../components/UpdateComponents/PanUpdate';
// import NoofChildren from '../components/UpdateComponents/NoofChildren';
// import MontlyEmi from '../components/UpdateComponents/MontlyEmi';
// import HouseType from '../components/UpdateComponents/HouseType';
// import NumberofBusiness from '../components/UpdateComponents/NumberofBusiness';
// import NoofTrucks from '../components/UpdateComponents/NoofTrucks';
// import CityUpdate from '../components/UpdateComponents/CityUpdate';
// import PhoneUpdate from '../components/UpdateComponents/PhoneUpdate';
// import TruckNumber from '../components/UpdateComponents/TruckNumber';
// import PanCardUpdate from '../components/UpdateComponents/PanCardUpdate';
// import AadharCardUpdate from '../components/UpdateComponents/AadharCardUpdate';
import HouseImagesUpdate from '../components/UpdateComponents/HouseImagesUpdate';
import HouseLocationUpdate from '../components/UpdateComponents/HouseLocationUpdate';



const UpdateScreen = () => {
  const fieldName = useSelector(selectFieldToUpdate);

  // Render the appropriate component based on the fieldToUpdate parameter
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      {renderUpdateComponent()}
    </View>
  );
}

export default UpdateScreen