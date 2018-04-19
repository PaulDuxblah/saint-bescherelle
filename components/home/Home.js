import React, { Component } from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';

//STYLESHEET
import style from '../../style';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BackgroundDash>
        <View style={style.activityBlock}>
        </View>
      </BackgroundDash>
    )
  }
}
