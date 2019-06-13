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
import { NavigationEvents } from 'react-navigation';
import {Header, Avatar, List, ListItem } from 'react-native-elements'

class Contact extends React.Component {

  render() {
    return (
      <ListItem
        style={styles.contact}
        key={this.props.phone}
        title={this.props.name}
        subtitle={this.props.phone}
        leftAvatar={<Avatar rounded title="MD" />}
      />
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

    Contacts.getAll((err, data) => {
      let contacts = []
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

      this.state.contacts = contacts;
      console.log("setting state")
      this.setState(this.state)
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Contacts', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <FlatList style={styles.container}
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
    alignSelf: 'stretch',
  },
  header: {
    flex: 0,
    color: '#fff',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  contact: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    //alignSelf: 'stretch',
    flex: 1
  }
});
export default ContactList
