import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const AppBar = () => {
 
//   const customerData = useSelector(selectCustomerData);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home');
  };
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={23} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.appBarTitle}>Customer Details</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#12b981',
    padding: 16,
    alignItems: 'center',
    
  },
  appBarTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: '600',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pdfIcon: {
    marginLeft: 20, // Adjust the spacing as needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  pdfLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: 'red',
  },
});

export default AppBar;
