import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import {Contacts as ExpoContacts} from 'expo';
import {Permissions} from 'expo';

class Contact extends React.Component {

  render() {
    return (
      <View style={styles.contact}>
        <Text style={{color: '#09f'}}>
          {this.props.name}
        </Text>
        <Text >
        <Text style={{fontWeight: 'bold'}}>
          {this.props.label} {' '}
        </Text>
        <Text>
          {this.props.phone}
        </Text>
        </Text>
      </View>
    )
  }
}

class ContactList extends React.Component {

  state = {
    loaded: false,
    contacts: []
  }
  _keyExtractor = (item, index) => item.id;

  _renderContact = (obj) => {
    return (
    <Contact
      {...obj.item}
    />
  )}

  componentDidMount(){
    // load contacts once component loads, and set props
    // correctly
    //const { status, permissions } = await Permissions.askAsync(Permissions.CONTACTS);
    /*if (status != 'granted') {
      throw new Error('Contacts permission not granted');
    }
    const { data } = await ExpoContacts.getContactsAsync({
        fields: [ExpoContacts.Fields.PhoneNumbers],
    });*/
    let data = [];

    let contacts = []
        contacts.push({
          id: 'uuid',
          name: 'dummy',
          phone: '0',
          label: 'dumdum',
        })
    data.forEach((contact)=>{
        contacts.push({
          id: `${contact.id}`,
          name: contact.name,
          phone: '0',
          label: 'contact',
        })
      contact.phoneNumbers.forEach((phone)=>{
        contacts.push({
          id: `${contact.id}-${phone.id}`,
          name: contact.name,
          phone: phone.number,
          label: phone.label,
        })
      })
    })
    this.state.contacts = contacts;
    this.setState(this.state.contacts)
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.header}>{`${this.state.contacts.length} Contacts`}</Text>
      <FlatList
        data={this.state.contacts}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderContact}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  header: {
    flex: 0,
    backgroundColor: '#05f',
    color: '#fff',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  contact: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    flex: 1
  }
});
export default ContactList
