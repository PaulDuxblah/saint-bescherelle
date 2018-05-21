import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import style from '../../style';

class GameMenu extends Component {
  constructor(props) {
    super(props);
  }

  backToHome = () => {
    this.props.backToHome();
  }

  continueGame = () => {
    this.props.continueGame();
  }

  render() {
    return (
      <View style={[style.gameMenuContainer]}>
        <View style={[style.gameMenuScreen]}>
          <Text style={[style.gameMenuTitle]}>PAUSE</Text>

          <TouchableOpacity 
            onPress={this.continueGame}
            style={[style.backButtonTouch, style.gameMenuContinue]} 
            activeOpacity={0.8} 
          >
            <Text style={[style.backButtonText, style.gameMenuContinueText]}>CONTINUER</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={this.backToHome}
            style={[style.backButtonTouch]} 
            activeOpacity={0.8} 
          >
            <Text style={[style.backButtonText]}>ARRÊTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default GameMenu;