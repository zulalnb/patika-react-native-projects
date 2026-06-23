import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './RoomCard.style';

type Props = {
  name: string;
  onPress: () => void;
};

export default function RoomCard({ name, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{name}</Text>
    </Pressable>
  );
}
