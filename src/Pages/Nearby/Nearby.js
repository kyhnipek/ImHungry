import {SafeAreaView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';

import Geolocation from 'react-native-geolocation-service';
import RestaurandCard from '../../components/RestaurantCard';
import styles from './Nearby.style';
import RestaurantDetailsModal from '../../components/RestaurantDetailsModal';
import {FetchRestaurants} from '../../FetchData';
import KitchensCard from '../../components/KitchensCard';

navigator.geolocation = require('react-native-geolocation-service');

const App = ({navigation}) => {
  const lat = '40.39126785562374';
  const lng = '27.850470906539105';
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [restType, setRestType] = useState('restaurant');

  const [data, setData] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const getLoc = () => {
      Geolocation.requestAuthorization('whenInUse');
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    getLoc();

    const fetchAllRestaurants = async () => {
      const fetchedRestaurants = await FetchRestaurants(
        latitude,
        longitude,
        restType,
      );
      setData(fetchedRestaurants);
    };
    fetchAllRestaurants();
  }, [latitude, longitude, restType]);

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <KitchensCard
        restaurant={item => {
          setRestType(item);
        }}
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <RestaurandCard
            restaurant={item}
            onPress={() => {
              setRestaurantData(item);
              modalToggle();
            }}
          />
        )}
      />
      {restaurantData == null ? null : (
        <RestaurantDetailsModal
          restaurant={restaurantData}
          isVisible={modalVisible}
          onClose={onClose}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
