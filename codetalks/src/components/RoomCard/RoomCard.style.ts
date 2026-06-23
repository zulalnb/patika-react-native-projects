import colors from '@/styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#cbcbcb',
    borderRadius: 8,
    height: 200,
  },
  title: { fontSize: 22, fontWeight: 'semibold', textAlign: 'center', color: colors.orange },
});
