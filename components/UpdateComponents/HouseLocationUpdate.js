
import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectCustomerKYCData, setCustomerKYCData } from '../../redux/authSlice';
import { selectCustomerData } from '../../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; 
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const HouseLocationUpdate = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const customerKYCData = useSelector(selectCustomerKYCData);
    const customerData = useSelector(selectCustomerData);
    const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
    const record_id = customerKYCData.record_id;
    const [loading, setLoading] = useState(false);
    const [houseUrl, setHouseUrl] = useState(customerKYCData['gps'] ?? '');
    console.log("gps", houseUrl);
    const [validUrl, setValidUrl] = useState(true);
    const [instructionsVisible, setInstructionsVisible] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleHouseUrlChange = (text) => {
        setHouseUrl(text);
        const isValidUrl = isValidGoogleMapsUrl(text);
        setValidUrl(isValidUrl);
    };

    const isValidGoogleMapsUrl = (url) => {
        const googleMapsUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return googleMapsUrlRegex.test(url);
    };

    const showInstructions = () => {
        setInstructionsVisible(!instructionsVisible);
    };

    const handleUpdateChildren = async () => {
        try {
            if (!validUrl) {
                return;
            }
            setUploading(true);

            let data = {
                record_id,
                houseUrl,
                noofchildren: customerKYCData['Number of Children'],
                marital: customerKYCData['Marital Status'],
                dob: customerKYCData['Date of Birth'],
                pan: customerKYCData['PAN Number'],
                monthlyemioutflow: customerKYCData['Monthly EMI Outflow'],
                housetype: customerKYCData['House Owned or Rented'],
                noofyearsinbusiness: customerKYCData['Number of years in business'],
                nooftrucks: customerKYCData['Number of Trucks'],
                city: customerKYCData['City'],
                houseaddress: customerKYCData['House Address'],
                phone: customerKYCData['Phone Number'],
                altphone: customerKYCData['Alternate Phone Number'],
                status: "Updated"
            };

            const response = await axios.post(`https://backendforpnf.vercel.app/updatedob`, data);
            console.log('Server response:', response.data);
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Updated Successfully',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
            });
            navigation.navigate('CustomerProfile');

            const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
            const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
            const apiData = Kresponse.data.data[0] || {};
            dispatch(setCustomerKYCData(apiData)); 
        } catch (err) {
            console.log("Error in updating:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleBack = () => {
        navigation.navigate('CustomerProfile');
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
            <View style={{flexDirection:'row',alignItems: 'center', width: '100%',textAlignVertical: 'center',}}>
            <TouchableOpacity style={{marginLeft:0, marginRight:50,marginTop:-12}}onPress={handleBack}>
                <Icon name="arrow-left" size={23} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Update House Location</Text>
            </View>
            
            <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>House Location URL</Text>
                    <TextInput
                        style={[styles.inputField, !validUrl && styles.invalidInput]}
                        placeholder={houseUrl ? houseUrl : " Please provide URL here"}
                        placeholderTextColor="gray"
                        keyboardType="default"
                        value={houseUrl}
                        onChangeText={handleHouseUrlChange}
                        editable
                         multiline
                        numberOfLines={3}
                    />
                    {!validUrl && <Text style={styles.errorText}>Invalid URL</Text>}
                    {houseUrl && (
                        <Text style={styles.editableText}>You can update the URL above</Text>
                    )}
                    <TouchableOpacity onPress={showInstructions}>
                        <Text style={styles.instructionsLink}>How to get Google Maps URL?</Text>
                    </TouchableOpacity>
                    
                </View>
                {instructionsVisible && (
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsText}>
                            1. Open Google Maps{"\n"}
                            2. Search for your location{"\n"}
                            3. Click on the location marker{"\n"}
                            4. Select "Share"{"\n"}
                            5. Choose "Copy Link"{"\n"}
                            6. Paste the URL here
                        </Text>
                    </View>
                )}
                
                <TouchableOpacity style={[styles.uploadButton, {backgroundColor:'#1084fe'}]} onPress={handleUpdateChildren}>
                    {uploading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={styles.uploadButtonText}>Upload</Text>
                    )}
                </TouchableOpacity>
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
        width:'100%'
    },
    arrowContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        color: 'black',
        textAlignVertical: 'center',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        width: '100%',
        //marginTop: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        marginBottom: 8,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: 'black',
        backgroundColor: '#f8f8f8'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    invalidInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    instructionsLink: {
        color: 'blue',
        marginTop: 10,
    },
    instructionsContainer: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    instructionsText: {
        fontSize: 16,
        color: 'black'
    },
    editableText: {
        color: 'gray',
        fontSize: 14,
        marginTop: 5,
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

export default HouseLocationUpdate;
