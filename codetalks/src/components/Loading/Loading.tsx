import colors from '@/styles/colors';
import { ActivityIndicator, View } from 'react-native';
import styles from './Loading.style';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.orange} />
    </View>
  );
}
