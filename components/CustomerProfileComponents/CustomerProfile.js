import React, { useEffect, useRef, useState,useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacityComponent, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper'; // Import Card from react-native-paper
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { selectCustomerKYCData, setCustomerKYCData } from '../../redux/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { selectCustomerData } from '../../redux/authSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { setFieldToUpdate } from '../../redux/authSlice';
//import { useTranslation } from 'react-i18next';
import KYCCard from './KYCCard';



const CustomerProfile = () => {
  //const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const imageUrl = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg';
  const customerKYCData = useSelector(selectCustomerKYCData);
  //console.log("incustomerProfile", customerKYCData)
  const record_id = customerKYCData.record_id;
  //olconsole.log(record_id);
  const actionSheetRef = useRef();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null); 
  

  

  const handlePress=(feildname)=>{
    dispatch(setFieldToUpdate(feildname));
    navigation.navigate('Update')
  }
  
  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  };

  const handleTakePhoto = async() => {
    setLoading(true);
    console.log("Take a photo clicked");
    const options = {
      mediaType: 'photo', 
      selectionLimit: 1,
      includeBase64: true
    };
  try {
    const result = await launchCamera(options);
    //console.log('ImagePicker response:', result); // Log the response for debugging
    const base64Data = result.assets[0].base64;
      console.log("response", result.assets[0].base64);
      const imageUri = result.assets[0];
      setImage(imageUri); 
      actionSheetRef.current?.hide()
      await uploadBase64ToBackend(base64Data);
  } catch (error) {
    console.log('Error in handleChooseFromGallery:', error);
  }finally {
    // Set loading to false when finished
    setLoading(false);
  }
};
  const handleChooseFromGallery = async () => {
    setLoading(true);
    const options = {
      mediaType: 'photo', 
      selectionLimit: 1,
      includeBase64: true
    };
  
    try {
      const result = await launchImageLibrary(options); 
      const base64Data = result.assets[0].base64;
      //console.log("response", result.assets[0].base64);
      const imageUri = result.assets[0];
      setImage(imageUri); 
      actionSheetRef.current?.hide()
      await uploadBase64ToBackend(base64Data);
    } catch (error) {
      console.log('Error in handleChooseFromGallery:', error);
    }finally {
      setLoading(false);
    }
  };
 
  const uploadBase64ToBackend = async (base64Data) => {
    try {
      const response = await axios.post('https://backendforpnf.vercel.app/fileUpload', { base64Data }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Server response:', response.data);
      const { msg: { files, success } } = response.data;
      const data = {
        record_id,
        files
      };
  
      // Send files object to the backend /updatePhoto endpoint
      const updateResponse = await axios.post('https://backendforpnf.vercel.app/updatePhoto', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

  
      console.log('Update response:', updateResponse.data);
      const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
            const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
            const apiData = Kresponse.data.data[0] || {};
            //console.log("kycData",apiData)
            dispatch(setCustomerKYCData(apiData)); 
    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      {customerKYCData && customerKYCData?.Photo && customerKYCData.Photo.length > 0 && JSON.parse(customerKYCData.Photo)[0] && JSON.parse(customerKYCData.Photo)[0].fullpath ? (
        <Image 
          source={{ 
            uri: JSON.parse(customerKYCData.Photo)[0].fullpath ,
            headers: {
              Accept: '*/*',
            },
          }} 
          style={styles.image} 
          resizeMode={'cover'}
        />
      ) : (
        <Image 
          source={{ 
            uri: imageUrl,
            headers: {
              Accept: '*/*',
            },
          }} 
          style={styles.image}
          resizeMode={'cover'}
        />
      )}


        {/* <TouchableOpacity style={styles.editIconContainer} onPress={openActionSheet}>
          <FontAwesomeIcon name="edit" style={styles.editIcon} size={25} color="white" />
        </TouchableOpacity> */}
      </View>

      <Card style={[styles.customerKYCContainer]}>
      <KYCCard customerKYCData={customerKYCData} handlePress={handlePress}  />
      </Card>
      <ActionSheet ref={actionSheetRef}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChooseFromGallery}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => actionSheetRef.current?.hide()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ActionSheet>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:20,
    marginTop:20,
  },
  imageContainer: {
    position: 'relative',
    
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIconContainer: {
    ...StyleSheet.absoluteFillObject, // Position the icon container absolutely within its parent
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    
  },
  editIcon: {
    padding: 10,
  },
  customerKYCContainer: {
    marginTop: 20,
    borderRadius: 10,
    elevation: 4,
    width:'100%',
    backgroundColor: 'white',
    marginBottom:20,
  },
  lastKycItem: {
    borderBottomWidth: 0,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color:'black'
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999 // Ensure the loader is above other components
  }
});

export default CustomerProfile;
