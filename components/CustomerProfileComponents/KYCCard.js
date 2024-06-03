import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Collapsible from 'react-native-collapsible';
import { selectCustomerData, selectAddingTruck } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
const KYCCard = ({ customerKYCData, handlePress }) => {
    
    ///console.log("inKyccard", customerKYCData);
    const customerData= useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';


    return (
        <View>   
            
                
            <TouchableOpacity onPress={() => handlePress('houseimage')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>House Images</Text>
                        <View style={styles.valueContainer}>
                            
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('houselocation')} >
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>Gps</Text>
                    <View style={styles.valueContainer}>
                    
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        marginLeft: 10,
    },
    kycItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 70,
        alignItems: 'center',
    },
    keyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    valueText: {
        fontSize: 18,
        color: '#4b5563',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default KYCCard;
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useSelector } from 'react-redux';
// import { selectCustomerData } from '../../redux/authSlice';

// const KYCCard = ({ customerKYCData }) => {
//     const [isHouseImagesExpanded, setHouseImagesExpanded] = useState(false);
//     const customerData = useSelector(selectCustomerData);
//     const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';

//     const toggleHouseImages = () => {
//         setHouseImagesExpanded(!isHouseImagesExpanded);
//     };

//     const houseImages = customerKYCData['House Images'];
//     const customerHouseImagesArray = JSON.parse(houseImages);

//     return (
//         <View>
//             <TouchableOpacity onPress={toggleHouseImages}>
//                 <View style={styles.kycItem}>
//                     <Text style={styles.keyText}>House Images</Text>
//                     <View style={styles.valueContainer}>
//                         <Icon name={isHouseImagesExpanded ? "chevron-down" : "chevron-right"} size={20} color="#9ca3af" style={styles.icon} />
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             {isHouseImagesExpanded ? (
//                 <ScrollView horizontal style={styles.imagesContainer}>
//                     {customerHouseImagesArray.length > 0 ? (
//                         customerHouseImagesArray
//                             .filter(imageData => imageData.fullpath) // Filter out entries without a fullpath
//                             .map((imageData, index) => (
//                                 <Image
//                                     key={index}
//                                     source={{ uri: imageData.fullpath }}
//                                     style={styles.imagePreview}
//                                     resizeMode="cover"
//                                 />
//                             ))
//                     ) : (
//                         <View style={{ alignItems: 'center', marginTop: 20, marginLeft:100 }}>
//                             <Text style={{ color: 'red' }}>No house images available</Text>
//                         </View>
//                     )}
//                 </ScrollView>
//             ) : null}
    
//             {/* Add some space */}
//             <View style={{ marginTop: 0 }}>
//                 <TouchableOpacity>
//                     <View style={[styles.kycItem]}>
//                         <Text style={styles.keyText}>Google Map URL</Text>
//                         <View style={styles.valueContainer}>
//                             <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
    
// };

// const styles = StyleSheet.create({
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//         padding: 15,
//     },
//     headerText: {
//         fontSize: 23,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     icon: {
//         marginLeft: 10,
//     },
//     kycItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         // borderBottomWidth: 1,
//         // borderBottomColor: '#ccc',
//         height: 70,
//         alignItems: 'center',
//     },
//     keyText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     valueContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//     },
//     imagePreview: {
//         width: 100,
//         height: 100,
//         margin: 5
//     },
// });

//export default KYCCard;
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Linking , Button, Modal,ActivityIndicator, TextInput} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useSelector } from 'react-redux';
// import { selectCustomerData } from '../../redux/authSlice';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import Toast from 'react-native-toast-message';
// import axios from 'axios';
// import { setCustomerKYCData } from '../../redux/authSlice';
// import { selectCustomerKYCData } from '../../redux/authSlice';
// const KYCCard = () => {
//     const [isHouseImagesExpanded, setHouseImagesExpanded] = useState(false);
//     const [isGpsExpanded, setGpsExpanded] = useState(false);
//     const customerData = useSelector(selectCustomerData);
//     const customerKYCData = useSelector(selectCustomerKYCData);
//     console.log("CustomerKycData", setCustomerKYCData);
//     const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//     const record_id = customerKYCData.record_id;
//     const [googleMapUrl, setGoogleMapUrl] = useState('');
//     //const [loading, setLoading] = useState(false);
//     const [files, setFiles] = useState([]); 
//     //console.log("Files", files);
//     const [houseImage, setHouseImage] = useState([]);
//     const [loading, setLoading] = useState(false);
//     console.log("Hosue iMage", houseImage);
//     const toggleHouseImages = () => {
//         setHouseImagesExpanded(!isHouseImagesExpanded);
//     };

//     const toggleGps = () => {
//         setGpsExpanded(!isGpsExpanded);
//     };

//     const houseImages = customerKYCData['House Images'] || '';
//     const customerHouseImagesArray = JSON.parse(houseImages);
//     console.log("House Images:", houseImages);
// console.log("Customer House Images Array:", customerHouseImagesArray);

//     const gpsUrl = customerKYCData?.gps;
//     const handleGalleryLaunch = async () => {
//         setLoading(true);
//         const options = {
//           mediaType: 'photo',
//           selectionLimit: 5, // Adjust the selection limit as needed
//           includeBase64: true,
//         };
      
//         try {
//           const result = await launchImageLibrary(options);
//           const selectedImages = result.assets.map((asset) => asset.uri);
//           setHouseImage(selectedImages);
      
//           const uploadedFiles = [];
//           for (const asset of result.assets) {
//             const base64Data = asset.base64;
//             const uploadedFile = await uploadBase64ToBackend(base64Data);
//             uploadedFiles.push(uploadedFile);
//           }
      
//           // Set all uploaded files
//           setFiles(uploadedFiles.flat()); // Flatten the array and update files state
//         } catch (error) {
//           console.log('Error in handleGalleryLaunch:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
    
//       const uploadBase64ToBackend = async (base64Data) => {
//         try {
//           const response = await axios.post('https://backendforpnf.vercel.app/fileUpload', { base64Data }, {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
    
//           console.log('Server response:', response.data);
//           const { msg: { files: uploadedFiles, success } } = response.data;
//           return uploadedFiles;// Update files state
    
//         } catch (error) {
//           console.log('Error in uploadBase64ToBackend:', error);
//         }
//       };
//       const handleUpload = async () => {
//         try {
//           const data = {
//             record_id,
//             files
//           };
    
//           const updateResponse = await axios.post('https://edfd-2409-40f0-115a-ea3b-5812-e4f0-72ca-f6b6.ngrok-free.app/updatehouseimages', data, {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
    
//           console.log('Update response:', updateResponse.data);
//           Toast.show({
//             type: 'success',
//             position:'bottom',
//             text1:' uploadsuccessfully', 
//             visibilityTime: 3000,
//             autoHide: true,
//             topOffset: 30,
//           });
//           //navigation.navigate('CustomerProfile');
//           const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//           const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
//           const apiData = Kresponse.data.data[0] || {};
//           dispatch(setCustomerKYCData(apiData)); 
//         } catch (error) {
//           console.log('Error in handleUpload:', error);
//         }
//       };
//       const handleGoogleMapUrlChange = (url) => {
//         setGoogleMapUrl(url);
//     };
//     return (
//         <View>
//             {loading && (
//         <Modal transparent={true} animationType='fade'>
//           <View style={styles.modalContainer}>
//             <ActivityIndicator size="large" color="blue" />
//           </View>
//         </Modal>
//       )}
//             <TouchableOpacity onPress={toggleHouseImages}>
//                 <View style={styles.kycItem}>
//                     <Text style={styles.keyText}>House Images</Text>
//                     <View style={styles.valueContainer}>
//                         <Icon name={isHouseImagesExpanded ? "chevron-down" : "chevron-right"} size={20} color="#9ca3af" style={styles.icon} />
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             {isHouseImagesExpanded ? (
               
//                 <View>
//                     {customerHouseImagesArray.length > 0 ? (
//                         <View>
//                         <ScrollView horizontal style={styles.imagesContainer}>
//                         {customerHouseImagesArray
//                             .filter(imageData => imageData.fullpath) // Filter out entries without a fullpath
//                             .map((imageData, index) => (
//                                 <Image
//                                     key={index}
//                                     source={{ uri: imageData.fullpath }}
//                                     style={styles.imagePreview}
//                                     resizeMode="cover"
//                                 />
//                             ))}
//                             </ScrollView>

//                             <View style={{  marginLeft: 20, flexDirection:'row', gap:20 }}>
//                             <TouchableOpacity style={styles.addButton}onPress={handleGalleryLaunch} >
//                                 <Text style={styles.addButtonText}>Edit House Images</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.addButton}onPress={handleUpload} >
//                                 <Text style={styles.addButtonText}>Upload</Text>
//                             </TouchableOpacity>
//                             </View>
//                             </View>
//                     ) : (
//                         houseImage.length > 0 ? (
//                             <View>
//                             <ScrollView horizontal style={styles.imagesContainer}>
//                               {houseImage.map((imageUri, index) => (
//                                 <Image
//                                   key={index}
//                                   source={{ uri: imageUri }}
//                                   style={styles.imagePreview}
//                                   resizeMode={'stretch'}
//                                 />
//                               ))}
//                             </ScrollView>
//                             <View style={{  marginLeft: 20, flexDirection:'row' }}>
//                             <TouchableOpacity style={styles.addButton}onPress={handleGalleryLaunch} >
//                                 <Text style={styles.addButtonText}>Edit House Images</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.addButton}onPress={handleUpload} >
//                                 <Text style={styles.addButtonText}>Upload</Text>
//                             </TouchableOpacity>
//                             </View>
//                             </View>
//                           ) :(
//                         <View style={{ alignItems: 'center', marginLeft: 0 }}>
//                             <Text style={{ color: 'red' }}> House Images are not available</Text>
//                             <TouchableOpacity style={styles.addButton} onPress={handleGalleryLaunch} >
//                                 <Text style={styles.addButtonText}>Add House Images</Text>
//                             </TouchableOpacity>
//                         </View>
//                           )
                          
//                     )}
//                 </View>
//             ) : null}

//             <View style={{ marginTop: 0 }}>
//                 <TouchableOpacity onPress={toggleGps}>
//                     <View style={[styles.kycItem]}>
//                         <Text style={styles.keyText}>Google Map URL</Text>
//                         <View style={styles.valueContainer}>
//                             <Icon name={isGpsExpanded ? "chevron-down" : "chevron-right"} size={20} color="#9ca3af" style={styles.icon} />
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//                 {isGpsExpanded ? (
//                     gpsUrl ? (
//                         <View style={styles.gpsContainer}>
//                             <Text style={styles.gpsUrl} onPress={() => Linking.openURL(gpsUrl)}>
//                                 {gpsUrl}
//                             </Text>
//                         </View>
//                     ) : (
//                         <View style={{ alignItems: 'center', marginTop:0, marginLeft: 10, marginBottom:15 }}>
//                             <Text style={{color:'red'}}>Google Map URL is not available. Enter below</Text>
//                             <View style={styles.formContainer}>
//                             <View style={styles.formGroup}>
//                             <View style={{flexDirection:'row'}}>
//                             <TextInput 
//                                style={styles.input}
//                                placeholder='Enter the Google Map Url'
//                                onChangeText={handleGoogleMapUrlChange}
//                                value={googleMapUrl}
//                                multiline
//                                //numberOfLines={4}
//                             />
//                             <TouchableOpacity style={styles.addButton}onPress={handleUpload} >
//                                 <Text style={styles.addButtonText}>update</Text>
//                             </TouchableOpacity>
//                             </View>
//                             </View>
//                         </View>
//                         </View>
//                     )
//                 ) : null}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//         padding: 15,
//     },
//     headerText: {
//         fontSize: 23,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     icon: {
//         marginLeft: 10,
//     },
//     kycItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         height: 70,
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         marginBottom: 10,
//         elevation: 0,
//         shadowColor: 'transparent',
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0,
//         shadowRadius: 0,
//     },
//     keyText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     valueContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     imagesContainer: {
//         // marginTop: 15,
//     },
//     imagePreview: {
//         width: 100,
//         height: 100,
//         // marginRight: 10,
//         borderRadius: 8,
//         margin:5
//     },
//     gpsContainer: {
//         paddingHorizontal: 10,
//         paddingBottom:10
//         // paddingVertical: 10,
//         // // backgroundColor: '#f0f0f0',
//         // borderRadius: 8,
//     },
//     gpsUrl: {
//         fontSize: 16,
//         color: '#1E90FF',
//         // textDecorationLine: 'underline',
//     },
//     addButton: {
//         marginTop: 10,
//         backgroundColor: '#12b981',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 8,
//         marginLeft:20
//     },
//     addButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       },
//       input: {
//         borderWidth: 1,
//         borderColor: '#cccccc',
//         borderRadius: 8,
//         padding: 12,
//         fontSize: 18,
//         color: 'black',
//         marginTop:5
//       },
//       formGroup: {
//         marginBottom: 20,
//       },
// });

// export default KYCCard;
