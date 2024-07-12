import {View, SafeAreaView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './MapViews.style';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_DEFAULT} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {FetchRestaurants} from '../../FetchData';
import RestaurantMarker from '../../components/RestaurantMarker';
import RestaurantDetailsModal from '../../components/RestaurantDetailsModal';
import Slider from '@react-native-community/slider';

const MapViews = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [restaurantData, setRestaurantData] = useState();
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [range, setRange] = useState(300.0);

  useEffect(() => {
    const getLoc = () => {
      Geolocation.requestAuthorization('whenInUse');
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          FetchRestaurants(
            position.coords.latitude,
            position.coords.longitude,
            'restaurant',
            range,
          ).then(response => {
            setData(response);
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    getLoc();
  }, [latitude, longitude, range]);

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text>Range: {range} meter </Text>
        <Slider
          style={styles.slider}
          minimumValue={100.0}
          maximumValue={10000.0}
          step={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="blue"
          onSlidingComplete={value => {
            setRange(value);
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: range / 50000,
          longitudeDelta: range / 50000,
        }}>
        {data &&
          data.map((item, index) => (
            <RestaurantMarker
              key={index}
              lat={item.location.latitude}
              lng={item.location.longitude}
              restaurantImage={
                item.photos[0].authorAttributions[0]
                  ? 'https:' + item.photos[0].authorAttributions[0].photoUri
                  : null
              }
              onPress={() => {
                setRestaurantData(item);
                modalToggle();
              }}
            />
          ))}
      </MapView>
      {restaurantData && (
        <RestaurantDetailsModal
          restaurant={restaurantData}
          isVisible={modalVisible}
          onClose={onClose}
        />
      )}
    </SafeAreaView>
  );
};

export default MapViews;
