import { useState } from 'react';
import { TextInput, useWindowDimensions, View } from 'react-native';
import Modal from 'react-native-modal';

import Button from '@/components/ui/Button';
import styles from './ContentInputModal.style';

// TODO:
// react-native-modal occasionally flickers on first presentation.
// Investigate later or migrate to native formSheet/bottom sheet.

type Props = {
  visible: boolean;
  loading?: boolean;
  placeholder?: string;
  buttonText?: string;
  onClose: () => void;
  onSend: (text: string) => void;
};

const ContentInputModal = ({ visible, loading = false, placeholder = '', buttonText, onClose, onSend }: Props) => {
  const [text, setText] = useState<string>('');
  const { height: HEIGHT } = useWindowDimensions();

  const handleSend = () => {
    if (!text) {
      return;
    }

    onSend(text);
    setText('');
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      avoidKeyboard
      statusBarTranslucent
    >
      <View
        style={[
          styles.container,
          {
            height: HEIGHT / 3,
          },
        ]}
      >
        <View style={styles.input_container}>
          <TextInput
            value={text}
            placeholder={placeholder}
            onChangeText={setText}
            multiline
            placeholderTextColor="#b3acac"
            autoFocus
          />
        </View>
        <Button text={buttonText || 'Ekle'} loading={loading} onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default ContentInputModal;
