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
