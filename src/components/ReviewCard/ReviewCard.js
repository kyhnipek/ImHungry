import {Text, View, Image} from 'react-native';
import React from 'react';
import styles from './ReviewCard.style';
import {Rating} from 'react-native-ratings';

const ReviewCard = ({review}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          src={review.item.authorAttribution.photoUri}
          style={styles.image}
        />
        <View style={styles.headerDetails}>
          <Text style={styles.name}>
            {review.item.authorAttribution.displayName}
          </Text>
          <View style={styles.ratingContainer}>
            <Rating
              type="star"
              startingValue={review.item.rating}
              ratingCount={5}
              imageSize={20}
              readonly={true}
            />
            <Text>{review.item.relativePublishTimeDescription}</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.reviewText}>{review.item.originalText.text}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
