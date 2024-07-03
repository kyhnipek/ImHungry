import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './RestaurantCard.style';
import {Rating} from 'react-native-ratings';

const RestaurandCard = ({restaurant, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          src={'https:' + restaurant.photos[0].authorAttributions[0].photoUri}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{restaurant.displayName.text}</Text>
          <Rating
            type="star"
            startingValue={restaurant.rating}
            ratingCount={5}
            imageSize={20}
            readonly={true}
          />
          {restaurant.currentOpeningHours ? (
            restaurant.currentOpeningHours.openNow ? (
              <Text style={styles.open}>Open </Text>
            ) : (
              <Text style={styles.closed}>Closed</Text>
            )
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurandCard;
