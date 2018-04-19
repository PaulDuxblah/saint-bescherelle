import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, TouchableHighlight } from 'react-native';

import style from '../../style';

import Background from '../BackgroundGeneral';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    }
  }

  changeScore = (scoreToAdd) => {
    this.setState({
      score: this.state.score + scoreToAdd
    });
  }

  render() {
    return (
      <View style={[style.gameContainer]}>
        
      </View>
    )
  }
}

export default Game;