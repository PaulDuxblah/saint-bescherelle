import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import style from '../../style';

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
      <View style={[style.container, style.home]}>
        <Text style={[style.homeTitle]}>Saint-Bescherelle</Text>

        <View style={[style.homeButtons]}>
          <TouchableHighlight style={[style.homeButtonTouch]} onPress={this.startGame}>
            <Text style={[style.homeButton, style.homeStartGame]}>COMMENCER</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[style.homeButtonTouch]} onPress={this.goToScore}>
            <Text style={[style.homeButton, style.homeScore]}>SCORES</Text>
          </TouchableHighlight>
        </View>

        <View style={[style.homeRules]}>
          <View style={[style.homeRule]}>
            <View style={[style.homeLetterContainer, style.yellowLetterBackground]}>
              <Text style={[style.letter, style.cambria]}>A</Text>
            </View>

            <Text style={[style.homeRuleExplanation]}>10 points</Text>
          </View>

          <View style={[style.homeRule]}>
            <View style={[style.homeLetterContainer, style.redLetterBackground]}>
              <Text style={[style.letter, style.cambria]}>A</Text>
            </View>

            <Text style={[style.homeRuleExplanation]}>-1 PV</Text>
          </View>

          <View style={[style.homeRule]}>
            <View style={[style.homeLetterContainer, style.blueLetterBackground]}>
              <Text style={[style.letter, style.cambria]}>A</Text>
            </View>

            <Text style={[style.homeRuleExplanation]}>10 points / PV</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Home;