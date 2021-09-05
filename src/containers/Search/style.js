import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  textInputWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    height: 50,
    width: '90%',
    marginVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    //shadow
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginHorizontal: '3%',
    width: '80%',
  },
  flatlistWrapper: {
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  flatlistContainer: {
    paddingTop: 90,
    paddingBottom: 200,
    // justifyContent: 'space-between',
  },
});

export default styles;
