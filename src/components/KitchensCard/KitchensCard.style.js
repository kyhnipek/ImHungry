import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 110,
    height: 150,
    backgroundColor: 'white',
    padding: 5,
  },
  selected: {
    flex: 1,
    alignItems: 'center',
    width: 110,
    height: 150,
    backgroundColor: 'yellow',
    padding: 5,
    borderRadius: 5,
  },
  imageContainer: {
    backgroundColor: '#e4e2e2cc',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    alignSelf: 'center',
    margin: 5,
    color: '#000',
    fontWeight: '500',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  mainTitle: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default styles;
