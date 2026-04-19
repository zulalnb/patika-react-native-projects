import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.darkGreen,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  inner_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  user: {
    color: 'white',
    fontSize: 13,
  },
  date: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 13,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    alignItems: 'flex-end',
  },
  dislike_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  dislike_count_container: {
    backgroundColor: colors.darkGreen,
    padding: 3,
    borderRadius: 20,
    marginRight: 3,
  },
  dislike_count_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  dislike_text: {
    color: colors.darkGreen,
    fontWeight: 'bold',
  },
});
