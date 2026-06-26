import { useState } from 'react';
import { View, TextInput, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';

import Button from '@/components/Button';
import styles from './ContentInputModal.style';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
};

const ContentInputModal = ({ visible, onClose, onSend }: Props) => {
  const [text, setText] = useState<null | string>(null);
  const { height } = useWindowDimensions();

  const handleSend = () => {
    if (!text) {
      return;
    }

    onSend(text);
    setText(null);
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={[styles.container, { height: height / 3 }]}>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Darla hadi milleti..."
            onChangeText={setText}
            multiline
            placeholderTextColor="#b3acac"
          />
        </View>
        <Button text="Gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default ContentInputModal;
