import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet,LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setNewCustomerFeilds } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation  } from '@react-navigation/native';
const NewCustomerProfile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <View style={styles.container}>        
        <TouchableOpacity onPress={() =>{
            dispatch(setNewCustomerFeilds('houseImages')),
            navigation.navigate('NewCustomerUpdate')
            }}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>House Images</Text>
                    <View style={styles.valueContainer}>  
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                dispatch(setNewCustomerFeilds('gps')),
                navigation.navigate('NewCustomerUpdate')
                }}>
            <View style={styles.kycItem}>
                <Text style={styles.keyText}>Gps</Text>
                <View style={styles.valueContainer}>
                
                
                    <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                
                </View>
            </View>
            </TouchableOpacity>
    </View>
  ) 
}
const styles = StyleSheet.create({
    
    container: {
        marginTop: 50,
        borderRadius: 10,
        elevation: 4,
        width: '90%',
        backgroundColor: 'white',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        },
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
})
export default NewCustomerProfile