import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    paddingHorizontal: 20,
  },
  paddingView: {
    paddingBottom: 10,
  },
  menuPopupLine: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTxt: {
    fontFamily: 'Roboto-Regular',
    paddingLeft: 10,
    fontSize: 14,
  },
});

export default styles;
