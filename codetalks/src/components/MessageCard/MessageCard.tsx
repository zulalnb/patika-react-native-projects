import { Text, View } from 'react-native';

import { formatDistance, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

import { Message } from '@/types/message';
import styles from './MessageCard.style';

type Props = { message: Message };

const MessageCard = ({ message }: Props) => {
  const formattedDate = formatDistance(parseISO(message.createdAt), new Date(), {
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
    </View>
  );
};

export default MessageCard;
