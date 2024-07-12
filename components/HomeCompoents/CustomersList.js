
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { selectSearchValue } from '../../redux/authSlice';
// import { setCustomerData } from '../../redux/authSlice';
// import { useSelector } from 'react-redux';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import { useDispatch} from 'react-redux';
// import { setSearchValue } from '../../redux/authSlice';
// const CustomersList = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const searchValue = useSelector(selectSearchValue);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`https://backendforpnf.vercel.app/Allcustomers`);
//       setCustomers(response.data.data);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchData();
//   };
//   const handleCustomer = item => {
//     dispatch(setCustomerData(item));
//     navigation.navigate('Customer');
//   };
  
//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
//     customer['mobile number'].toLowerCase().includes(searchValue.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//       </View>
//     );
//   }
//   useFocusEffect(
//     React.useCallback(() => {
//       dispatch(setSearchValue(''));
//     }, [dispatch])
//   );
//   return (
//     <View style={styles.container}>
//       {filteredCustomers.length === 0 ? (
//         <View style={styles.centered}>
//           <Text style={{ color: 'red' }}>No customers found with the search value "{searchValue}".</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={filteredCustomers}
//           keyExtractor={item => item.record_id}
//           renderItem={({ item, index }) => (
//             <TouchableOpacity 
//             style={[styles.cardWrapper, index !== 0 && styles.cardWrapperWithMargin]}
//             onPress={() => handleCustomer(item)}
//             >
//               <View style={styles.cardContainer}>
//                 <View style={styles.cardContent}>
//                   <View style={styles.textContainer}>
//                     <Text style={styles.cardName}>{item.name.toUpperCase()}</Text>
//                     <Text style={styles.cardPhone}>{item['mobile number'].toUpperCase()}</Text>
//                   </View>
//                   <View style={styles.iconContainer}>
//                     <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//           refreshing={refreshing}
//           onRefresh={handleRefresh}
//           contentContainerStyle={styles.contentContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//   },
//   cardWrapper: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
//   cardWrapperWithMargin: {
//     marginTop: 10,
//   },
//   cardContainer: {
//     backgroundColor: 'white',
//     marginVertical: 0,
//     padding: 15,
//     borderRadius: 10,
//     minHeight: 110,
//     elevation: 4,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   textContainer: {
//     flex: 1,
//   },
//   cardName: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   cardPhone: {
//     color: 'gray',
//     fontSize: 16,
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   icon: {
//     marginTop: 10,
//   },
//   contentContainer: {
//     paddingTop: 20,  // Add space at the top of the FlatList
//   },
// });

// export default CustomersList;
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import {useSelector, useDispatch} from 'react-redux';
// import {
//   selectMobileNumber,
//   selectSearchValue,
//   setSearchValue,
// } from '../../redux/authSlice';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {setCustomerData} from '../../redux/authSlice';
// //import { useTranslation } from 'react-i18next';



// const MainContent = () => {
//   //const {t} = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const userMobileNumber = useSelector(selectMobileNumber);
//   const searchValue = useSelector(selectSearchValue);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
  
  
  
//   useEffect(() => {
//     fetchData();
//     //getToken();
//   }, [userMobileNumber]);


//   const fetchData = async () => {
//     try {
//         //setLoading(true);
//         const response = await axios.get(
//           `https://backendforpnf.vercel.app/Allcustomers`,
//         );
//         //console.log(response.data.data);
//         setData(response.data.data || []);
//         setLoading(false);
      
//     } catch (error) {
//       console.error('Error fetching data Customer Data :', error);
//       setData([]);
      
//     }finally {
      
//       setRefreshing(false); 
//     }
//   };
  
//   useEffect(() => {
//     // Apply local filtering based on searchValue
//     const filtered = data.filter(item => {
//       const fullName = item.name || '';
//       const phoneNumber = item['mobile number'] || '';
//       const lowerCaseQuery = searchValue.toLowerCase();
//       return (
//         fullName.toLowerCase().includes(lowerCaseQuery) ||
//         phoneNumber.includes(searchValue)
//       );
//     });

//     setFilteredData(filtered);
//   }, [searchValue, data]);

//   const handleCustomer = item => {
//     dispatch(setCustomerData(item));
//     navigation.navigate('Customer');
//   };
  
//   useFocusEffect(
//     React.useCallback(() => {
//       dispatch(setSearchValue(''));
//     }, [dispatch])
//   );
//   const handleRefresh = () => {
//     setRefreshing(true); // Set refreshing to true when refresh action starts
//     fetchData(); // Call the fetchData function again to fetch updated data
//   };




//   const renderCard = ({ item }) => {
//     // Convert item.name and item['mobile number'] to uppercase
//     const name = item.name ? item.name.toUpperCase() : 'N/A';
//     const mobileNumber = item['mobile number'] ? item['mobile number'].toUpperCase() : 'N/A';
  
//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => handleCustomer(item)}
//       >
//         <View style={styles.cardContent}>
//           <View style={styles.textContainer}>
//             <Text style={styles.cardName}>{name}</Text>
//             <Text style={styles.cardPhone}>{mobileNumber}</Text>
//           </View>
//           <View style={styles.iconContainer}>
//             <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       {/* <Text>Search Value: {searchValue}</Text> */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : data.length === 0 ? (
//         <Text style={{color:'red'}}>noCustomersFound</Text>
//       ): filteredData.length === 0 ? (
//         <Text style={{color:'red'}}>noCustomersFound, { searchValue }</Text>
//       ) : (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderCard}
//           showsVerticalScrollIndicator={true} 
//           contentContainerStyle={{ paddingBottom: 20 }}
//           scrollIndicatorInsets={{ right: 10 }} 
//           refreshing={refreshing} // Set refreshing prop to control refresh state
//           onRefresh={handleRefresh}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop:20,
//     marginHorizontal: 10,
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


// export default MainContent;

// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { setCustomerData } from '../../redux/authSlice';

// const MainContent = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false); // Add loadingMore state
//   const [page, setPage] = useState(1);
//   const [hasMoreData, setHasMoreData] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true); // Set loading to true when fetching data
//       const response = await axios.get(`https://01ff-183-82-4-110.ngrok-free.app/Allcustomers?page=${page}`);
//       const newData = response.data.data;

//       if (newData.length === 0) {
//         setHasMoreData(false);
//       } else {
//         setData(prevData => [...prevData, ...newData]);
//         setPage(prevPage => prevPage + 1);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false); // Set loading to false when data fetching is complete
//       setLoadingMore(false); // Set loadingMore to false when data fetching is complete
//     }
//   };

//   const handleCustomer = item => {
//     dispatch(setCustomerData(item));
//     navigation.navigate('Customer');
//   };

//   const renderCard = ({ item }) => {
//     const name = item.name ? item.name.toUpperCase() : 'N/A';
//     const mobileNumber = item['mobile number'] ? item['mobile number'].toUpperCase() : 'N/A';

//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => handleCustomer(item)}
//       >
//         <View style={styles.cardContent}>
//           <View style={styles.textContainer}>
//             <Text style={styles.cardName}>{name}</Text>
//             <Text style={styles.cardPhone}>{mobileNumber}</Text>
//           </View>
//           <View style={styles.iconContainer}>
//             <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleEndReached = () => {
//     if (!loadingMore && hasMoreData) {
//       setLoadingMore(true); // Set loadingMore to true when reaching end of list
//       fetchData(); // Fetch more data when end of list is reached
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading && data.length === 0 ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderCard}
//           onEndReached={handleEndReached}
//           onEndReachedThreshold={0.1}
//         />
//       )}
//       {loadingMore && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="black" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     marginHorizontal: 10,
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
//   loaderContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
// });

// export default MainContent;
// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { setCustomerData, selectSearchValue, setSearchValue } from '../../redux/authSlice';

// const MainContent = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const searchValue = useSelector(selectSearchValue);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMoreData, setHasMoreData] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, [searchValue]);  // Fetch data whenever the search value changes

//   useEffect(() => {
//     if (page > 1) {
//       fetchData();
//     }
//   }, [page]);  // Fetch data whenever the page changes, but not on initial render

//   const fetchData = async () => {
//     try {
//       if (page === 1) {
//         setLoading(true);
//       } else {
//         setLoadingMore(true);
//       }

//       const response = await axios.get(`https://01ff-183-82-4-110.ngrok-free.app/Allcustomers`, {
//         params: { page, search: searchValue }
//       });
//       const newData = response.data.data;

//       if (newData.length === 0) {
//         setHasMoreData(false);
//       } else {
//         if (page === 1) {
//           setData(newData);
//         } else {
//           setData(prevData => [...prevData, ...newData]);
//         }
//         setPage(prevPage => prevPage + 1);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   const handleCustomer = item => {
//     dispatch(setCustomerData(item));
//     navigation.navigate('Customer');
//   };

//   const renderCard = ({ item }) => {
//     const name = item.name ? item.name.toUpperCase() : 'N/A';
//     const mobileNumber = item['mobile number'] ? item['mobile number'].toUpperCase() : 'N/A';

//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => handleCustomer(item)}
//       >
//         <View style={styles.cardContent}>
//           <View style={styles.textContainer}>
//             <Text style={styles.cardName}>{name}</Text>
//             <Text style={styles.cardPhone}>{mobileNumber}</Text>
//           </View>
//           <View style={styles.iconContainer}>
//             <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleEndReached = () => {
//     if (!loadingMore && hasMoreData) {
//       fetchData();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         value={searchValue}
//         onChangeText={text => {
//           dispatch(setSearchValue(text));
//           setPage(1);  // Reset page number to 1 when search value changes
//         }}
//         placeholder="Search..."
//       />
//       {loading && data.length === 0 ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderCard}
//           onEndReached={handleEndReached}
//           onEndReachedThreshold={0.1}
//         />
//       )}
//       {loadingMore && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="black" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     marginHorizontal: 10,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 8,
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
//   loaderContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
// });

// export default MainContent;
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setCustomerData, selectSearchValue ,selectCustomerData } from '../../redux/authSlice';
import { setSearchValue } from '../../redux/authSlice';

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchValue = useSelector(selectSearchValue);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setPage(1);
    setHasMoreData(true);
    setData([]);
    fetchData(1); 
  }, [searchValue]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(setSearchValue(''));
  //   }, [dispatch])
  // );
  
  const fetchData = async (pageNumber) => {
    try {
      if (pageNumber === 1) {
        setLoading(true);
      } else if (data.length >= 20) {
        setLoadingMore(true);
      }

      const response = await axios.get(`https://backendforpnf.vercel.app/Allcustomers`, {
        params: { page: pageNumber, search: searchValue }
      });
      let newData = response.data.data;
      newData = newData.sort((a, b) => {
        const nameA = a.name ? a.name.toUpperCase() : ''; 
        const nameB = b.name ? b.name.toUpperCase() : ''; 
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      if (newData.length === 0) {
        setHasMoreData(false);
        if (pageNumber === 1) {
          setNoResults(true);
        }
      } else {
        setNoResults(false);
        if (pageNumber === 1) {
          setData(newData);
        } else {
          setData(prevData => [...prevData, ...newData]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false); 
    }
  };

  const handleCustomer = (item) => {
    dispatch(setCustomerData(item));
    navigation.navigate('Customer');
    console.log("jhvdyuieduewfu........")
  };

  const renderCard = ({ item }) => {
    const name = item.name ? item.name.toUpperCase() : '';
    const mobileNumber = item['mobile number'] ? item['mobile number'].toUpperCase() : '';

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCustomer(item)}
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.cardPhone}>{mobileNumber}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleEndReached = () => {
    if (!loadingMore && hasMoreData) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const handleRefresh = () => {
        setRefreshing(true);
        fetchData(); 
      };
  return (
    <View style={styles.container}>
      {loading && data.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : noResults ? (
        <Text style={{color:'red'}}>No customers found with the search value "{searchValue}"</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
      {loadingMore && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginHorizontal: 10,
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
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default CustomerList;
