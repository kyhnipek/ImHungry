import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerDetails: {
    flexDirection: 'column',
    gap: 5,
  },
  body: {
    Margin: 10,
    width: Dimensions.get('window').width - 65,
  },
  reviewText: {
    margin: 5,
    width: Dimensions.get('window').width - 70,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default styles;
