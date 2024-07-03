import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'flex-end',
    margin: 10,
    marginTop: 35,
  },
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  innerHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#ffffffe3',
    padding: 10,
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  details: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-evenly',
    borderRadius: 10,
    marginBottom: 10,
  },
  favorite: {
    backgroundColor: 'red',
    padding: 10,
    justifyContent: 'space-evenly',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    margin: 10,
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  photos: {
    width: 250,
    height: 250,
    margin: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
    margin: 5,
  },
  open: {
    color: 'green',
    marginLeft: 5,
    margin: 5,
  },
  closed: {
    color: 'red',
    marginLeft: 5,
    margin: 5,
  },
  mainTitles: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subTitles: {
    color: 'gray',
  },
  buttonTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonTitleFavorite: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
export default styles;
