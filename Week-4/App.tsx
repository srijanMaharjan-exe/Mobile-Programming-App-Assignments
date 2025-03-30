import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  TouchableOpacity, 
  Alert, 
  TextInput, 
  FlatList, 
  Modal, 
  Switch, 
  ScrollView 
} from 'react-native';

const App = () => {
  // State hooks for various interactions
  const [name] = useState("Srijan");
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [search, setSearch] = useState('');
  
  // Data for FlatList demonstration
  const topics = [
    { id: '1', title: 'Components & Layout' },
    { id: '2', title: 'User Interaction' },
    { id: '3', title: 'State Management (Hooks)' },
    { id: '4', title: 'Lists & Data Rendering' },
    { id: '5', title: 'Modals & Advanced UI' },
  ];
  
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with highlighted name */}
      <Text style={styles.header}>
        Welcome, <Text style={styles.highlight}>{name}</Text>!
      </Text>
      
      {/* TextInput for search functionality */}
      <TextInput
        style={styles.input}
        placeholder="Search topics..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Switch for demonstration */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Notifications:</Text>
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>

      {/* FlatList to display topics */}
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.title}</Text>
          </View>
        )}
      />

      {/* Button to open the modal */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>

      {/* Modal to display additional information */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>About {name}</Text>
            <Text style={styles.modalText}>
              This is a simple mobile home page built with React Native that covers key topics such as component layout, event handling, state management with hooks, and list rendering.
            </Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  highlight: {
    color: 'blue',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  listText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;




