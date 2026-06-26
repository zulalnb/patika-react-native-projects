import { useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAuth } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import FloatingButton from '@/components/FloatingButton';
import ContentInputModal from '@/components/modal/ContentInputModal';
import MessageCard from '@/components/card/MessageCard';

import styles from './Messages.style';
import parseContentData from '@/utils/parseContentData';
import { Message, MessageRecord } from '@/types/message';

const Messages = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState<Message[]>([]);

  useEffect(() => {
    database()
      .ref('messages/')
      .on('value', snapshot => {
        const contentData = snapshot.val() as MessageRecord | null;

        const parsedData = parseContentData(contentData ?? {});
        setContentList(parsedData);
      });
  }, []);

  const handleInputModalToggle = () => {
    setInputModalVisible(!inputModalVisible);
  };

  const handleSendContent = (content: string) => {
    handleInputModalToggle();
    sendContent(content);
  };

  const sendContent = (content: string) => {
    const userMail = getAuth().currentUser?.email;
    if (!userMail) {
      return;
    }

    const contentObject = {
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      dislike: 0,
    };
    database().ref('messages/').push(contentObject);
  };

  const handleBanane = (item: Message) => {
    database()
      .ref(`messages/${item.id}/`)
      .update({ dislike: item.dislike + 1 });
  };

  const renderContent: ListRenderItem<Message> = ({ item }) => (
    <MessageCard message={item} onBanane={() => handleBanane(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={contentList} renderItem={renderContent} />
      <FloatingButton icon="plus" onPress={handleInputModalToggle} />

      <ContentInputModal
        visible={inputModalVisible}
        onClose={handleInputModalToggle}
        onSend={handleSendContent}
      />
    </SafeAreaView>
  );
};

export default Messages;
