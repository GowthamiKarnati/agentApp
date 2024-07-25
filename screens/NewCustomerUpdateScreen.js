// import { View, ScrollView } from 'react-native'
// import React, { useState } from 'react';
// import { selectnewCustomerFeild } from '../redux/authSlice';
// import { useSelector } from 'react-redux';
// import HouseImagesUpdate from '../components/NewCustomerUpdateComponents/HouseImagesUpdate';
// import HouseLocationUpdate from '../components/NewCustomerUpdateComponents/HouseLocationUpdate';

// const UpdateScreen = () => {
//   const fieldName = useSelector(selectnewCustomerFeild);
//   const renderUpdateComponent = () => {
//     switch (fieldName) {
//       case 'houseImages':
//         return <HouseImagesUpdate />
//       case 'gps':
//         return <HouseLocationUpdate />
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
//       {renderUpdateComponent()}
//     </View>
//   );
// }

// export default UpdateScreen
import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectnewCustomerFeild } from '../redux/authSlice';
import HouseImagesUpdate from '../components/NewCustomerUpdateComponents/HouseImagesUpdate';
import HouseLocationUpdate from '../components/NewCustomerUpdateComponents/HouseLocationUpdate';

const NewCustomerUpdateScreen = () => {
  const fieldName = useSelector(selectnewCustomerFeild);

  const renderUpdateComponent = () => {
    switch (fieldName) {
      case 'houseImages':
        return <HouseImagesUpdate />;
      case 'gps':
        return <HouseLocationUpdate />;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderUpdateComponent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 20, // Add padding if needed
  },
});

export default NewCustomerUpdateScreen;
