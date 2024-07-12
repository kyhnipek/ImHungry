import {Image} from 'react-native';
import React from 'react';
import {Marker} from 'react-native-maps';
import styles from './RestaurantMarker.style';

const RestaurantMarker = ({lat, lng, restaurantImage, onPress, keys}) => {
  return (
    <Marker
      coordinate={{latitude: lat, longitude: lng}}
      onPress={onPress}
      key={keys}>
      {restaurantImage !== null && restaurantImage !== undefined ? (
        <Image style={styles.image} source={{uri: restaurantImage}} />
      ) : (
        <Image style={styles.image} source={require('../../assets/pin.png')} />
      )}
    </Marker>
  );
};

export default RestaurantMarker;
