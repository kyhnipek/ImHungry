import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Modal from 'react-native-modal';
import styles from './RestaurantDetailsModal.style';
import {Rating} from 'react-native-ratings';
import {FetchPhotos, checkFav, removeValue} from '../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RestaurantDetailsModal = ({isVisible, onClose, restaurant}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef(null);
  const [photos, setPhotos] = useState('');
  const [favStatus, setFavStatus] = useState(false);

  useEffect(() => {
    const fetchRestaurantPhotos = async () => {
      const fetchedPhotos = await FetchPhotos(restaurant.photos);
      setPhotos(fetchedPhotos);
    };

    checkFav(restaurant.id.toString()).then(response => {
      setFavStatus(response);
    });
    fetchRestaurantPhotos();
  }, [restaurant.photos, restaurant.id]);

  const handleFav = async () => {
    if (favStatus === false) {
      try {
        const value = JSON.stringify(restaurant);
        await AsyncStorage.setItem(restaurant.id, value);
        console.log('added');
      } catch (e) {}
      setFavStatus(!favStatus);
    } else {
      removeValue(restaurant.id);
      setFavStatus(!favStatus);
    }
  };

  const renderPhotoItem = ({item}) => (
    <Image source={{uri: item}} style={styles.photos} />
  );

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  const formatHours = () => {
    const convert = number => {
      if (number < 10) {
        return `0${number}`;
      } else {
        return number;
      }
    };

    if (restaurant.currentOpeningHours) {
      const date = restaurant.currentOpeningHours.periods[0];
      const open = convert(date.open.hour) + ':' + convert(date.open.minute);
      const closed =
        convert(date.close.hour) + ':' + convert(date.close.minute);
      return '(' + open + ' - ' + closed + ')';
    } else {
      return null;
    }
  };

  const dialCall = number => {
    Linking.openURL(`tel://${number}`).catch(err =>
      console.error('An error occurred', err),
    );
  };
  const goNav = (lat, lng, lbl) => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const label = lbl;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const renderModal = () => (
    <SafeAreaView>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        style={styles.container}
        avoidKeyboard
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection={['down']}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        propagateSwipe={true}
        scrollHorizontal={true}
        scrollOffsetMax={1500 - 1200}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
          <View style={styles.header}>
            <Image
              src={
                'https:' + restaurant.photos[0].authorAttributions[0].photoUri
              }
              style={styles.image}
            />
            <View style={styles.innerHeader}>
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
                  <Text style={styles.open}>Open</Text>
                ) : (
                  <Text style={styles.closed}>Closed</Text>
                )
              ) : null}
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.details}>
              <FlatList
                data={photos}
                renderItem={renderPhotoItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.mainTitles}>Rating & Reviews</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.mainTitles}>Opening Hours</Text>
              <Text style={styles.subTitles}>Today</Text>
              {restaurant.currentOpeningHours ? (
                restaurant.currentOpeningHours.openNow ? (
                  <Text style={styles.open}>Open {formatHours()}</Text>
                ) : (
                  <Text style={styles.closed}>Closed {formatHours()}</Text>
                )
              ) : null}
            </View>
            <View style={styles.details}>
              <Text style={styles.mainTitles}>Details</Text>
              <Text style={styles.subTitles}>Phone</Text>
              <TouchableOpacity
                onPress={() => {
                  dialCall(restaurant.internationalPhoneNumber);
                }}>
                <Text style={styles.phone}>
                  {restaurant.internationalPhoneNumber}
                </Text>
              </TouchableOpacity>
              <Text style={styles.subTitles}>Web Site</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`${restaurant.websiteUri}`)}>
                <Text style={styles.webUri}>{restaurant.websiteUri}</Text>
              </TouchableOpacity>

              <Text style={styles.subTitles}>Address</Text>
              <TouchableOpacity
                onPress={() => {
                  goNav(
                    restaurant.location.latitude,
                    restaurant.location.longitude,
                    restaurant.displayName.text,
                  );
                }}>
                <Text style={styles.address}>
                  {restaurant.formattedAddress}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleFav}>
              <View style={favStatus ? styles.favorite : styles.details}>
                <Text
                  style={
                    favStatus ? styles.buttonTitleFavorite : styles.buttonTitle
                  }>
                  {favStatus ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                goNav(
                  restaurant.location.latitude,
                  restaurant.location.longitude,
                  restaurant.displayName.text,
                );
              }}>
              <View style={styles.details}>
                <Text style={styles.buttonTitle}>Show on Map</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
  return renderModal();
};

export default RestaurantDetailsModal;
