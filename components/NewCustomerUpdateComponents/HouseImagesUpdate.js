import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Modal, ActivityIndicator, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectCustomerKYCData, setCustomerKYCData } from '../../redux/authSlice';
import Toast from 'react-native-toast-message';
import { selectCustomerData } from '../../redux/authSlice';
import { selectNewCustomerData } from '../../redux/authSlice';
import { setNewCustomerData } from '../../redux/authSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { Buffer } from 'buffer';

const HouseImagesUpdate = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const customerKYCData = useSelector(selectNewCustomerData);
    //console.log(customerKYCData);
    const customerData = useSelector(selectCustomerData);
    const customerPhoneNumber = customerKYCData?.['Mobile number'] || 'N/A';
    //console.log(customerPhoneNumber);
    const customerHouseImagesString = customerKYCData['House Images'] || '';
    //console.log(customerHouseImagesArray);
    const record_id = customerKYCData.record_id;
    //console.log(record_id);
    const imageUrl = 'https://www.shutterstock.com/image-vector/home-vector-image-be-used-600nw-255682306.jpg';
    const [houseImages, setHouseImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [editOptions, setEditOptions] = useState(false);
    const [uploading, setUploading] = useState(false);
    const customerHouseImagesArray = customerHouseImagesString ? JSON.parse(customerHouseImagesString) : [];
    const handleBack = () => {
        navigation.navigate('NewCustomerProfile');
    };
    const handleGalleryLaunch = async () => {
        
        const options = {
            mediaType: 'photo',
            selectionLimit: 5, // Adjust the selection limit as needed
            includeBase64: true,
            maxWidth: 1080,
            maxHeight: 1080,
        };
    
        try {
            const result = await launchImageLibrary(options);
            if (result && result.assets && result.assets.length > 0) {
                const selectedImages = result.assets.map((asset) => asset.uri);
    
                setHouseImages(selectedImages);
                setLoading(true);
                const uploadedFiles = [];
                for (const asset of result.assets) {
                    const base64Data = asset.base64;
                    const uploadedFile = await uploadBase64ToBackend(base64Data);
                    uploadedFiles.push(uploadedFile);
                }
                setLoading(false);
                // Set all uploaded files
                setFiles(uploadedFiles.flat()); // Flatten the array and update files state
            } else {
                console.log('No images selected');
            }
        } catch (error) {
            console.log('Error in handleGalleryLaunch:', error);
        } finally {
            setLoading(false);
        }
    };
    
    

    const uploadBase64ToBackend = async (base64Data) => { 
       
        try {
            const buffer = Buffer.from(base64Data, 'base64');
            const maxBase64Size = 10 * 1024 * 1024; // 10MB
        if (base64Data.length > maxBase64Size) {
            Alert.alert('Image size exceeds the maximum allowed size try to upload another image');
            setLoading(false);
            return;
        }

            const response = await axios.post('https://backendforpnf.vercel.app/fileUploadb', buffer, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            });
            console.log('Server response:', response.data);
            if (response.data && response.data.msg) {
                const { msg: { files: uploadedFiles, success } } = response.data;
                if (success) {
                    return uploadedFiles; // Update files state
                } else {
                    Alert.alert('File upload failed.');
                }
            } else {
                Alert.alert('Unexpected server response.');
            }
    
        } catch (error) {
            console.log('Error in uploadBase64ToBackend:', error);
            Alert.alert('File is Big try to please upload another image.');
        } 
    };

    const handleUpload = async() =>{
        if (!customerPhoneNumber || customerPhoneNumber === 'N/A') {
            Alert.alert(
                'Missing Information',
            );
            return; // Exit the function if mobile number is not available
        }
        if(files.length === 0){
            Alert.alert("Please upload the image");
        }
        setUploading(true);
        try{
            const data = {
                record_id,
                files,
            };
            const response = await axios.post('https://backendforpnf.vercel.app/updateloanapplicationhouseimages', data,{
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log('Update response:', response.data);
            navigation.navigate('NewCustomerProfile');
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Uploaded successfully',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
            });
            
            const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
            const Kresponse = await axios.get(`https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_203%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
            const records = Kresponse.data.data;
            console.log(records);
            const compareDates = (dateStr1, dateStr2) => {
                const date1 = new Date(dateStr1);
                const date2 = new Date(dateStr2);
                return date2 - date1;
            };
            records.sort((a, b) => compareDates(a["updated_at"], b["updated_at"]));
            const latestRecord = records[0];
            //console.log("Latest Updated Record:", latestRecord);
            console.log("Last Status Updated At:", latestRecord["updated_at"]);
            dispatch(setNewCustomerData(latestRecord));
            


        }catch(err){
            console.log("Error in updating loan application", err)
        }finally{
            setUploading(false);
        }

    }

    const handleshowEditOptions = () => {
        setEditOptions(!editOptions);
    };

    return (
        <View style={styles.container}>
            {loading && (
                <Modal transparent={true} animationType='fade'>
                    <View style={styles.modalContainer}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                </Modal>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', textAlignVertical: 'center' }}>
                <TouchableOpacity style={{ marginLeft: 0, marginRight: 50, marginTop: -12 }} onPress={handleBack}>
                    <Icon name="arrow-left" size={23} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Update House Images</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.label}>House Images</Text>
                    {customerHouseImagesArray.length > 0 && (
                        <TouchableOpacity style={styles.editButton} onPress={handleshowEditOptions}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView>
                {houseImages.length > 0 || customerHouseImagesArray.length > 0 ? (
                    <View style={styles.imagePreviewContainer}>
                        {houseImages.length > 0
                            ? houseImages.map((imageUri, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: imageUri }}
                                    style={styles.imagePreview}
                                    resizeMode={'stretch'}
                                />
                            ))
                            : customerHouseImagesArray
                                .filter(imageData => imageData.fullpath) // Filter out entries without a fullpath
                                .map((imageData, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: imageData.fullpath }}
                                        style={styles.imagePreview}
                                        resizeMode="cover"
                                    />
                                ))
                        }
                    </View>
                    
                ) : (
                    <View style={styles.noImagesContainer}>
                        <Text style={styles.noImagesText}>House images are not available. Click below to add.</Text>
                        <TouchableOpacity style={styles.addButton} onPress={handleshowEditOptions}>
                            <Text style={styles.addButtonText}>Add Images</Text>
                        </TouchableOpacity>
                    </View>
                )}
                </ScrollView>

                {editOptions && (
                    <>
                        <View style={styles.uploadButtonsContainer}>
                            <TouchableOpacity style={styles.uploadButton} onPress={handleGalleryLaunch}>
                                <Icon name="image" size={20} color="white" />
                                <Text style={styles.uploadButtonText}>Choose Images</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={[styles.uploadButton, {backgroundColor:'#1084fe'}]} onPress={handleUpload}>
                            {uploading ? (
                                <ActivityIndicator size="small" color="#ffffff" />
                            ) : (
                                <Text style={styles.uploadButtonText}>Upload</Text>
                            )}
                        </TouchableOpacity>
                        
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    arrowContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 24,
        elevation: 8,
        width: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
    editButton: {
        backgroundColor: '#12b981',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
    },
    uploadButton: {
        backgroundColor: '#1084fe',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        width:'100%'
    },
    uploadButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 10,
    },
    imagePreviewContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imagePreview: {
        width: 200,
        height: 100,
        borderRadius: 8,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 18,
        color: 'black',
    },
    uploadButtonsContainer: {
        //flexDirection: 'row',
        width:'100%'
    },
    noImagesContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    noImagesText: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#12b981',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom:10
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    },
    uploadButton: {
        backgroundColor: '#12b981',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default HouseImagesUpdate;
