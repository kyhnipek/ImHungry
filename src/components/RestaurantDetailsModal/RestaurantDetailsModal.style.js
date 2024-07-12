import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
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
  reviews: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-evenly',
    borderRadius: 10,
    marginBottom: 10,
    height: Dimensions.get('window').height / 2,
    overflow: 'hidden',
    elevation: 5,
  },
  reviewContainer: {},
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  reviewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 10,
    left: Dimensions.get('window').width / 3 - 20,
  },
  topMenuText: {
    margin: 5,
  },
  selectedTab: {
    fontWeight: 'bold',
  },
});
export default styles;
