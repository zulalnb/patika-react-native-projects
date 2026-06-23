import { getAuth } from '@react-native-firebase/auth';
import { getDatabase, onValue, push, ref, set } from '@react-native-firebase/database';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ContentInputModal from '@/components/ContentInputModal';
import ListHeader from '@/components/ListHeader';
import MessageCard from '@/components/MessageCard';
import ScrollToEndButton from '@/components/ScrollToEndButton';
import FloatingButton from '@/components/ui/FloatingButton';
import colors from '@/styles/colors';
import { Message, NewMessage } from '@/types/message';
import { NewRoom, Room } from '@/types/room';

type ScrollState = {
  shouldScrollToEnd: boolean;
  showScrollToEndButton: boolean;
  isListScrollable: boolean;
};
export default function RoomDetailsScreen() {
  const { id: roomId } = useLocalSearchParams<{ id: string }>();
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [contentList, setContentList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [listHeight, setListHeight] = useState(0);

  const [scrollState, setScrollState] = useState<ScrollState>({
    shouldScrollToEnd: false,
    showScrollToEndButton: false,
    isListScrollable: false,
  });

  const { bottom } = useSafeAreaInsets();

  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const db = getDatabase();

    if (!roomId) return;

    const roomUnsubscribe = onValue(ref(db, `rooms/${roomId}`), (snapshot) => {
      const value = snapshot.val() as NewRoom | null;

      if (!value) {
        setRoom(null);
        return;
      }

      setRoom({ id: roomId, ...value });
    });

    const messagesUnsubscribe = onValue(
      ref(db, `messages/${roomId}`),

      (snapshot) => {
        const messages: Message[] = [];

        snapshot.forEach((childSnapshot) => {
          messages.push({
            id: childSnapshot.key ?? '',
            ...(childSnapshot.val() as NewMessage),
          });
        });

        const currentUsername = getAuth().currentUser?.email?.split('@')[0];

        const lastMessage = messages[messages.length - 1];

        setContentList((prev) => {
          const hasNewMessage = messages.length > prev.length;
          const isOwnMessage = lastMessage?.username === currentUsername;

          if (hasNewMessage && isOwnMessage) {
            setScrollState((prev) => ({
              ...prev,
              shouldScrollToEnd: true,
              showScrollToEndButton: false,
            }));
          }

          if (hasNewMessage && !isOwnMessage) {
            setScrollState((prev) => ({
              ...prev,
              shouldScrollToEnd: false,
              showScrollToEndButton: true,
            }));
          }
          return messages;
        });
      }
    );

    return () => {
      roomUnsubscribe();
      messagesUnsubscribe();
    };
  }, [roomId]);

  const handleSendContent = async (content: string) => {
    const text = content.trim();

    if (!text) {
      showMessage({
        message: 'Mesaj içeriği boş olamaz.',
        type: 'warning',
      });
      return;
    }

    const db = getDatabase();
    const userMail = getAuth().currentUser?.email;

    if (!userMail) {
      showMessage({
        message: 'Mesaj oluşturmak için giriş yapmalısınız.',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);

      const contentObject = {
        username: userMail.split('@')[0],
        text,
        createdAt: new Date().toISOString(),
      };

      const newMessageRef = push(ref(db, `messages/${roomId}`));

      set(newMessageRef, contentObject);
      showMessage({
        message: 'Mesaj gönderildi.',
        type: 'success',
      });
      setInputModalVisible(false);
    } catch {
      showMessage({
        message: 'Mesaj gönderilemedi.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => <MessageCard message={item} />;

  const handleInputModalOpen = () => setInputModalVisible(true);
  const handleInputModalClose = () => setInputModalVisible(false);

  return (
    <>
      <Stack.Screen options={{ title: room?.name ?? 'Oda' }} />
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={contentList}
          renderItem={renderItem}
          ListHeaderComponent={<ListHeader title={`${room?.name} odası kuruldu!`} />}
          ListFooterComponent={<View style={{ height: bottom }} />}
          contentContainerStyle={{
            padding: 16,
          }}
          onLayout={(event) => {
            setListHeight(event.nativeEvent.layout.height);
          }}
          onContentSizeChange={(_, contentHeight) => {
            const isScrollable = contentHeight > listHeight;

            setScrollState((prev) => {
              if (prev.shouldScrollToEnd) {
                requestAnimationFrame(() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                });

                return {
                  ...prev,
                  isListScrollable: isScrollable,
                  shouldScrollToEnd: false,
                };
              }

              return {
                ...prev,
                isListScrollable: isScrollable,
              };
            });
          }}
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

            const isScrollable = contentSize.height > layoutMeasurement.height;
            const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 24;

            setScrollState((prev) => ({
              ...prev,
              isListScrollable: isScrollable,
              showScrollToEndButton: isScrollable && !isAtBottom,
            }));
          }}
          scrollEventThrottle={16}
        />
        {!inputModalVisible && <FloatingButton icon="plus" onPress={handleInputModalOpen} />}
        {scrollState.isListScrollable && scrollState.showScrollToEndButton && (
          <ScrollToEndButton
            onPress={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
              setScrollState((prev) => ({
                ...prev,
                showScrollToEndButton: false,
              }));
            }}
          />
        )}
        <ContentInputModal
          placeholder="Mesajın..."
          buttonText="Gönder"
          visible={inputModalVisible}
          loading={loading}
          onClose={handleInputModalClose}
          onSend={handleSendContent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
  },
});
