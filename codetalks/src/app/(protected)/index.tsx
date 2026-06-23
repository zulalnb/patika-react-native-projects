import { getAuth } from '@react-native-firebase/auth';
import { getDatabase, onValue, orderByChild, push, query, ref, set } from '@react-native-firebase/database';
import { useIsFocused, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ContentInputModal from '@/components/ContentInputModal';
import EmptyList from '@/components/EmptyList';
import RoomCard from '@/components/RoomCard';
import FloatingButton from '@/components/ui/FloatingButton';
import { NewRoom, Room } from '@/types/room';

export default function RoomsScreen() {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [contentList, setContentList] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const { bottom } = useSafeAreaInsets();

  const router = useRouter();

  useEffect(() => {
    const db = getDatabase();

    const roomsQuery = query(ref(db, 'rooms'), orderByChild('createdAt'));

    const unsubscribe = onValue(roomsQuery, (snapshot) => {
      const rooms: Room[] = [];
      snapshot.forEach((childSnapshot) => {
        rooms.push({
          id: childSnapshot.key ?? '',
          ...(childSnapshot.val() as NewRoom),
        });
      });
      setContentList(rooms);
    });

    return () => unsubscribe();
  }, []);

  const handleSendContent = async (content: string) => {
    const name = content.trim();

    if (!name) {
      showMessage({
        message: 'Oda adı boş olamaz.',
        type: 'warning',
      });
      return;
    }

    const db = getDatabase();
    const userMail = getAuth().currentUser?.email;

    if (!userMail) {
      showMessage({
        message: 'Oda oluşturmak için giriş yapmalısınız.',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);

      const contentObject = {
        name,
        createdBy: userMail.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      const newRoomRef = push(ref(db, '/rooms'));
      await set(newRoomRef, contentObject);

      if (isFocused) {
        router.push(`/rooms/${newRoomRef.key}`);
      }

      showMessage({
        message: 'Oda oluşturuldu.',
        type: 'success',
      });

      setInputModalVisible(false);
    } catch {
      showMessage({
        message: 'Oda oluşturulamadı.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItem: ListRenderItem<Room> = ({ item }) => (
    <RoomCard name={item.name} onPress={() => router.push(`/rooms/${item.id}`)} />
  );

  const handleInputModalOpen = () => setInputModalVisible(true);
  const handleInputModalClose = () => setInputModalVisible(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={contentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
          paddingBottom: bottom,
        }}
        ListEmptyComponent={
          <EmptyList title="Henüz oda yok" description="İlk odayı oluşturmak için sağ alttaki + butonuna dokunun." />
        }
      />
      {!inputModalVisible && <FloatingButton icon="plus" onPress={handleInputModalOpen} />}
      <ContentInputModal
        placeholder="Oda adı..."
        buttonText="Ekle"
        visible={inputModalVisible}
        onClose={handleInputModalClose}
        onSend={handleSendContent}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
