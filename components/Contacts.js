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
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

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

	async requestContactsPermission() {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
				{
					title: 'Tim needs to see contacts',
					message:
						'Tim needs to read contacts' +
						'so that you can send them clock',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can read contacts');
				return true
			} else {
				console.log('Contacts permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
		return false
	}

  async componentDidMount(){
    // load contacts once component loads, and set props
    // correctly
    const success = await this.requestContactsPermission()
    if (!success) {
      throw new Error('Contacts permission not granted');
    }

    let contacts = []
    Contacts.getAll((err, data) => {
      if (err === 'denied'){
        throw new Error('Contacts can not be read');
      } else {
        // contacts returned in Array
        data.forEach((contact)=>{
          console.log(contact)
          contact.phoneNumbers.forEach((phone)=>{
            contacts.push({
              id: `${contact.id}-${phone.id}`,
              name: contact.givenName+' '+contact.familyName,
              phone: phone.number,
              label: phone.label,
            })
          })
        })
      }
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
