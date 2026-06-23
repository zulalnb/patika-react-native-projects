import Icon, { type MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import styles from './IconButton.style';

type Props = {
  icon: MaterialDesignIconsIconName;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export default function IconButton({ icon, onPress, size = 28, style }: Props) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Icon name={icon} size={size} color="#fff" />
    </Pressable>
  );
}
