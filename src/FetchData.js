import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXX'; // Enter your Google Places API_KEY here

const FetchPhotos = async photoUri => {
  try {
    const fetchedPhotos = await Promise.all(
      photoUri.map(async photo => {
        const url = `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=250&skipHttpRedirect=true&key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.photoUri;
      }),
    );
    return fetchedPhotos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

const FetchRestaurants = async (lat, lng, type) => {
  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': '*',
          // 'places.displayName,places.formattedAddress,places.id,places.googleMapsUri,places.location,places.photos,places.rating,places.currentOpeningHours,places.priceLevel,places.nationalPhoneNumber,places.websiteUri,places.internationalPhoneNumber',
        },
        body: JSON.stringify({
          includedTypes: [type],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng,
              },
              radius: 7500.0,
            },
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data.places);
    return data.places;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

const checkFav = async item => {
  try {
    const keys = await AsyncStorage.getItem(item);
    if (keys !== null) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

const removeValue = async item => {
  try {
    await AsyncStorage.removeItem(item);
  } catch (e) {}
  console.log('removed.');
};

const getFavorites = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const response = await Promise.all(
      keys.map(async key => {
        const item = await AsyncStorage.getItem(key);
        return JSON.parse(item);
      }),
    );

    return response;
  } catch (e) {
    console.error('Error in getFavorites:', e);
    return [];
  }
};

export {FetchPhotos, FetchRestaurants, checkFav, removeValue, getFavorites};
