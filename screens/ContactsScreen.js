import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import ContactList from '../components/Contacts'

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ContactList />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 8,
  },
});
