import { Text, TouchableOpacity } from 'react-native';
import styles from './Button.style';

const Button = ({
  title = 'Button',
  onClick,
  theme = 'primary',
}: {
  title?: string;
  onClick?: () => void;
  theme?: 'primary' | 'secondary';
}) => {
  return (
    <TouchableOpacity
      testID="button-touchable"
      style={styles[theme].container}
      onPress={onClick}
    >
      <Text testID="button-title" style={styles[theme].title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
