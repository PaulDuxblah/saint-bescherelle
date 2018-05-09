import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

import style from '../../style';

import Background from '../BackgroundGeneral';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: this.props.scores
    }
  }

  startGame = () => {
    this.props.startGame();
  }

  render() {
    return (
      <Background>
        <View style={[style.container, style.home]}>
          <TouchableHighlight style={[style.homeButtonTouch]} onPress={this.startGame}>
            <Text style={[style.homeButton, style.cambria]}>START</Text>
          </TouchableHighlight>
        </View>
      </Background>
    )
  }
}

export default Home;