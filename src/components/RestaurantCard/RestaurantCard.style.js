import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  open: {
    color: 'green',
    marginLeft: 10,
  },
  closed: {
    color: 'red',
    marginLeft: 10,
  },
});
export default styles;
