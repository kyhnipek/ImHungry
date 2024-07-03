import {FlatList, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './KitchensCard.style';
import kitchens from './kitchens.json';
import localImages from './localImages';

const KitchensCard = ({restaurant}) => {
  const data = kitchens;
  const [selected, setSelected] = useState('');

  const renderKitchen = item => (
    <View style={item.id === selected ? styles.selected : styles.container}>
      <TouchableOpacity
        onPress={() => {
          restaurant(item.id);
          setSelected(item.id);
          console.log(item.image);
          selected === item.id
            ? (restaurant('restaurant'), setSelected(''))
            : null;
        }}>
        <View style={styles.imageContainer}>
          <Image source={localImages[item.image]} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <Text style={styles.mainTitle}>Kitchens</Text>
      <FlatList
        data={data}
        renderItem={({item}) => renderKitchen(item)}
        horizontal
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default KitchensCard;
