import { Text, View } from 'react-native';

import styles from './ListHeader.style';

type Props = {
  title: string;
};

export default function ListHeader({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
