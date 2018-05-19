import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import style from '../../style';

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: this.props.scores
    }
  }

  backToHome = () => {
    this.props.backToHome();
  }

  render() {
    let scores;

    if (this.state.scores) {
      scores = new Array(10);

      for (let i = 0; i < 10; i++) {
        scores[i] = (
          <View style={[style.scoreRow]} key={i}>
            <View style={[style.scoreRank]}>
              <Text style={[style.scoreRankText]}>{i+1}.</Text>
            </View>
            
            <View style={[style.score]}>
              <Text style={[style.scoreText]}>{this.state.scores[i] ? this.state.scores[i].toString() : 0}</Text>
            </View>
          </View>
        );
      }
    }

    return (
      <View style={[style.container, style.scoreContainer]}>
        <Text style={[style.scoreTitle]}>VOS MEILLEURS SCORES</Text>

        <View style={[style.scoresList]}>
          {scores}
        </View>

        <TouchableHighlight style={[style.scoreBackToHome]} onPress={this.backToHome}>
          <Text style={[style.scoreBackToHomeText]}>RETOUR AU MENU</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Score;