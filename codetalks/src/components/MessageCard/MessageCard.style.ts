import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  inner_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  user: {
    fontSize: 13,
  },
  date: {
    fontStyle: 'italic',
    fontSize: 13,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    alignItems: 'flex-end',
  },
});
