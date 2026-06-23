import colors from '@/styles/colors';
import { StyleSheet } from 'react-native';

const base_style = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: colors.orange,
    },
    title: {
      ...base_style.title,
      color: 'white',
    },
  }),
  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: 'white',
      borderColor: colors.orange,
      borderWidth: 1,
    },
    title: {
      ...base_style.title,
      color: colors.orange,
    },
  }),
};
