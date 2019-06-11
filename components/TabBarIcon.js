import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? '#ccc' : '#c00'}
      />
    );
  }
}
