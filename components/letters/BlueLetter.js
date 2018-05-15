import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Background } from 'react-native';

import style from '../../style';

import { loadCommonState } from './LetterCommon';

class BlueLetter extends Component {
  value = 20;
  duration = 1200;

  constructor(props) {
    super(props);
    this.state = loadCommonState(props);
    this.state = {
      ...this.state,
      animatedValue: new Animated.Value(50)
    };

    if (this.props.hps) {
      this.state = {
        ...this.state,
        hps: this.props.hps
      };
      this.value = 10 * this.props.hps;
      this.duration = 900 + (100 * this.props.hps);
    }
  }

  handleClick = () => {
    const newHps = this.state.hps - 1;

    if (newHps === 0) {
      this.props.enterLetter(this.state.letter);
      this.props.changeScore(this.value);
    } else {
      this.setState({
        hps: newHps
      })
    }
  }

  tooLate = () => {
    this.props.loseHP();
  }

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: this.duration
    }).start((animation) => { 
      if(animation.finished) {
        this.tooLate();
      }
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handleClick}
        style={[
          style.letterContainer,
          { 
            left: this.state.posX,
            top: this.state.posY
          }
        ]}
        activeOpacity={1}
      >
        <Animated.View 
          style={[
            style.letterBackground,
            style.blueLetterBackground,
            { 
              height: this.state.animatedValue, 
              bottom: 0
            }
          ]}
        />
        <Text style={[style.letter, style.cambria]}>{ this.state.letter.toUpperCase() }</Text>
        <View style={[style.blueLetterHpsContainer]}>
          <Text style={[style.cambria, style.blueLetterHps]}>{ this.state.hps }</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default BlueLetter;