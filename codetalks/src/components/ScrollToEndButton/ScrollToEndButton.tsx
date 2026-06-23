import { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import IconButton from '../ui/IconButton';
import styles from './ScrollToEndButton.style';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function ScrollToEndButton({ onPress }: Props) {
  return (
    <Animated.View entering={FadeInDown.duration(180)} exiting={FadeOutDown.duration(180)} style={styles.container}>
      <IconButton icon="message-badge-outline" onPress={onPress} />
    </Animated.View>
  );
}
