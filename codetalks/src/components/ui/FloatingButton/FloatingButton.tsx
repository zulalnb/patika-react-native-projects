import Icon, { type MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { TouchableOpacity } from 'react-native';

import styles from './FloatingButton.style';

type Props = {
  onPress: () => void;
  icon: MaterialDesignIconsIconName;
};

const FloatingButton = ({ onPress, icon }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={icon} color="white" size={30} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
