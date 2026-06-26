/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './components/Button';

function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState<string[]>([]);

  const renderElements = ({ item }: { item: string }) => <Text>{item}</Text>;

  function addToList() {
    if (!text) {
      return;
    }
    setList([...list, text]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        testID="list"
        data={list}
        renderItem={renderElements}
      />

      <TextInput
        testID="input-area"
        placeholder="Add .."
        onChangeText={setText}
        style={styles.input}
      />

      <Button title="Add" onClick={addToList} />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'gray',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});
