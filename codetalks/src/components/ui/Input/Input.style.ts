import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    padding: Platform.OS === 'android' ? 4 : 12,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  inputError: {
    borderBottomColor: '#fff1f1',
  },
  error: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fff1f1',
    color: '#9f1239',
    fontSize: 12,
    fontWeight: '600',
  },
});
