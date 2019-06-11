import React from 'react'
import { Platform, View, Button, StyleSheet, Text } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import ContactsScreen from '../screens/ContactsScreen'

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
  Contacts: {screen: ContactsScreen}
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

export default createBottomTabNavigator({
  HomeStack,
})
