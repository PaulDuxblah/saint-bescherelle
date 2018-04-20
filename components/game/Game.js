import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

import style from '../../style';

import YellowLetter from '../letters/YellowLetter';

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
        <YellowLetter letter='a' posX={50} posY={400} />
      </View>
    )
  }
}

export default Game;