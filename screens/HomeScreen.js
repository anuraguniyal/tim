import React from 'react';
import {
  Image,
  Platform,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ContactList from '../components/Contacts'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _goToContacts(){
    this.props.navigation.navigate('Contacts')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Time is Money! </Text>
        <Button
          title="View Contacts"
          onPress={()=>this._goToContacts()}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
