import React from 'react';
import { StatusBar, View, StyleSheet, AsyncStorage } from 'react-native';
// import Dashboard from './components/dashboard/Dashboard';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scores: null
    };
  }

  render() {
    return (
      <View style= {{flex: 1}} >
        <StatusBar hidden={true} />
      </View>
    )
  }
}

//Hide the warning info
console.disableYellowBox = true; 