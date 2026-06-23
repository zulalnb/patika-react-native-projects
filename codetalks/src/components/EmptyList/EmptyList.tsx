import { Text, View } from 'react-native';

import colors from '@/styles/colors';
import Icon from '@react-native-vector-icons/material-design-icons';
import styles from './EmptyList.style';

type Props = {
  title: string;
  description: string;
};

export default function EmptyList({ title, description }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="chat-plus-outline" size={64} color={colors.darkOrange} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
