import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: STATUSBAR_HEIGHT,
    flex: 1,
    backgroundColor: '#ff0',
  },
});
