import {Text, SafeAreaView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './Favorites.style';
import RestaurandCard from '../../components/RestaurantCard/RestaurandCard';
import RestaurantDetailsModal from '../../components/RestaurantDetailsModal';
import {getFavorites} from '../../FetchData';

const Favorites = () => {
  const [data, setData] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getFavorites().then(response => {
      setData(response);
    });
  }, []);

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const renderRestaurant = ({item}) => (
    <RestaurandCard
      restaurant={item}
      onPress={() => {
        setRestaurantData(item);
        modalToggle();
      }}
    />
  );

  return (
    <SafeAreaView>
      <Text style={styles.title}>Favorites</Text>
      {data ? <FlatList data={data} renderItem={renderRestaurant} /> : null}
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

export default Favorites;
