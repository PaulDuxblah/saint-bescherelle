import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Background } from 'react-native';

import style from '../../style';

import { loadCommonState } from './LetterCommon';

class RedLetter extends Component {
  value = 0;

  constructor(props) {
    super(props);
    this.state = loadCommonState(props);
    this.state = {
      ...this.state,
      animatedValue: new Animated.Value(50)
    };
  }

  handleClick = () => {
    this.props.loseHP();
  }

  tooLate = () => {
    this.props.changeScore(this.value);
  }

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: 1000
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
            marginLeft: this.state.posX,
            marginTop: this.state.posY
          }
        ]}
        activeOpacity={1}
      >
        <Animated.View 
          style={[
            style.letterBackground,
            style.redLetterBackground, 
            { 
              height: this.state.animatedValue, 
              bottom: 0
            }
          ]} 
        />
        <Text style={[style.letter, style.cambria]}>{ this.state.letter.toUpperCase() }</Text>
      </TouchableOpacity>
    )
  }
}

export default RedLetter;