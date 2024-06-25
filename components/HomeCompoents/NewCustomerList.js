// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import React from 'react';
// import axios from 'axios'; // Import Axios

// const NewCustomerTrigger = () => {
//   const handlePress = async () => {
//     try {
//       const response = await axios.get('https://backendforpnf.vercel.app/loanapplication');
//       const data = response.data.data; 
//       //console.log('API Response:', data);
//       const filteredData = data.filter(application => 
//         application['Workflow Status'] !== 'canceled' && 
//         (application['Workflow Status'] === 'escalate' || application['Workflow Status'] === 'requested')
//       );

//       // Count the filtered data
//       const filteredDataCount = filteredData.length;

//       console.log('Filtered API Response:', filteredData);
//       console.log('Number of filtered applications:', filteredDataCount);
      
//     } catch (error) {
//       console.error('Error calling API:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.buttonTyre} onPress={handlePress}>
//         <Text style={styles.buttonText}>New Customer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   buttonTyre: {
//     backgroundColor: '#3c82f6',
//     borderRadius: 8,
//     paddingVertical: 25,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
// });

// export default NewCustomerTrigger;
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const NewCustomerTrigger = () => {
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://backendforpnf.vercel.app/loanapplication');
//         const data = response.data.data;
//         const filteredData = data.filter(
//           (application) =>
//             application['Workflow Status'] !== 'canceled' &&
//             (application['Workflow Status'] === 'escalate' ||
//               application['Workflow Status'] === 'requested')
//         );
//         setApplications(filteredData);
//       } catch (error) {
//         console.error('Error calling API:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures it runs once on component mount

//   const handleCustomer = (item) => {
//     // Handle customer click action
//     console.log('Selected customer:', item);
//     // Navigate or perform further actions as needed
//   };

//   return (
//     <View style={styles.container}>
//       {applications.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.cardContainer}
//           onPress={() => handleCustomer(item)}
//         >
//           <View style={styles.cardContent}>
//             <View style={styles.textContainer}>
//               <Text style={styles.cardName}>{item.name}</Text>
//               <Text style={styles.cardPhone}>{item.mobileNumber}</Text>
//             </View>
//             <View style={styles.iconContainer}>
//               <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
//             </View>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   cardContainer: {
//     backgroundColor: 'white',
//     marginVertical: 5,
//     padding: 15,
//     borderRadius: 10,
//     minHeight: 110,
//     elevation: 4,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   cardName: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   cardPhone: {
//     color: 'gray',
//     fontSize: 20,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   icon: {
//     marginTop: 10,
//   },
// });

// export default NewCustomerTrigger;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setNew, setNewCustomerData } from '../../redux/authSlice';
const NewCustomerList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backendforpnf.vercel.app/loanapplication');
        const data = response.data.data;
        const filteredData = data.filter(
          (application) =>
            application['Workflow Status'] !== 'canceled' &&
            (application['Workflow Status'] === 'escalate' || application['Workflow Status'] === 'requested')&&
            application['Old or New Pratibha Finance Customer'] === 'New'
        );
        setApplications(filteredData);
      } catch (error) {
        console.error('Error calling API:', error);
      }
    };

    fetchData();
  }, []);

  const handleCustomer = (item) => {
    //dispatch(setNew(true))
    dispatch(setNewCustomerData(item))
    navigation.navigate('NewCustomerProfile')
    console.log(item);

  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => handleCustomer(item)}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.cardName}>{item['Full Name']}</Text>
          <Text style={styles.cardPhone}>{item['Mobile number']}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && applications.length === 0 ? 
      (
        <ActivityIndicator size="large" color="#0000ff" />
      ):
      (
      <FlatList
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
      />)}
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    marginHorizontal:10
  },
  cardContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    minHeight: 110,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPhone: {
    color: 'gray',
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 10,
  },
});

export default NewCustomerList;
