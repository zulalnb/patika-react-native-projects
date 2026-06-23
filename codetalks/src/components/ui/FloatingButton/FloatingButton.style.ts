import { StyleSheet } from 'react-native';

import colors from '@/styles/colors';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.mediumOrange,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
  },
});
