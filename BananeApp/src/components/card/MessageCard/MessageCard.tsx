import { View, Text, TouchableOpacity } from 'react-native';

import styles from './MessageCard.style';

import { tr } from 'date-fns/locale';
import { formatDistance, parseISO } from 'date-fns';
import { Message } from '@/types/message';

type Props = { message: Message; onBanane: () => void };

const MessageCard = ({ message, onBanane }: Props) => {
  const formattedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>{message.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.title}>{message.text}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.dislike_container} onPress={onBanane}>
          {!!message.dislike && (
            <View style={styles.dislike_count_container}>
              <Text style={styles.dislike_count_text}>{message.dislike}</Text>
            </View>
          )}
          <Text style={styles.dislike_text}>bana ne?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageCard;
