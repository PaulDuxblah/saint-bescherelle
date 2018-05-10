import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';

import style from '../../style';

const { height, width } = Dimensions.get('window');

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOverAnimated: new Animated.Value(height)
    }

    Animated.timing(this.state.gameOverAnimated, {
      toValue: 0,
      duration: 1000
    }).start();
  }

  backToHome = () => {
    this.props.backToHome();
  }

  render() {
    return (
      <View style={[style.gameContainer]}>
        <View style={[style.gameOverContainer]}>
          <Animated.View
            style={[
              style.gameOverScreen,
              {
                top: this.state.gameOverAnimated
              }
            ]}
          >
            <Text style={[style.gameOverTitle, style.cambria]}>GAME OVER</Text>
            <Text style={[style.gameOverScore, style.cambria]}>Score: {this.props.score}</Text>

            <TouchableOpacity 
              onPress={this.backToHome}
              style={[style.backButtonTouch]} 
              activeOpacity={0.8} 
            >
              <Text style={[style.backButtonText, style.cambria]}>RETOUR AU MENU</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    )
  }
}

export default GameOver;