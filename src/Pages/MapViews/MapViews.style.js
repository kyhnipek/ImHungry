import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: 400,
  },
  image: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  slider: {
    width: 200,
    height: 40,
  },
});

export default styles;
