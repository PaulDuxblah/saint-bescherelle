import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import style from '../../style';

import Background from '../BackgroundGeneral';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  startGame = () => {
    this.props.startGame();
  }

  goToScore = () => {
    this.props.goToScore();
  }

  render() {
    return (
      <Background>
        <View style={[style.container, style.home]}>
          <TouchableHighlight style={[style.homeButtonTouch]} onPress={this.startGame}>
            <Text style={[style.homeButton, style.homeStartGame, style.cambria]}>START</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[style.homeButtonTouch]} onPress={this.goToScore}>
            <Text style={[style.homeButton, style.homeScore, style.cambria]}>SCORES</Text>
          </TouchableHighlight>
        </View>
      </Background>
    )
  }
}

export default Home;