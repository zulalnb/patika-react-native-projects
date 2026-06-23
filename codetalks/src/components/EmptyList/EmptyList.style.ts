import { StyleSheet } from 'react-native';

import colors from '@/styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 350,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.extraLightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#807878',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 260,
  },
});
