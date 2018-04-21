import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Background } from 'react-native';

import style from '../../style';

import { loadCommonState } from './LetterCommon';

class YellowLetter extends Component {
  constructor(props) {
    super(props);
    this.state = loadCommonState(props);
    this.state = {
      ...this.state,
      animatedValue: new Animated.Value(50)
    }
  }

  handleClick = () => {
    this.disappear();
    this.props.enterLetter(this.state.letter);
  }

  disappear = () => {
    this.setState({
      ...this.state,
      display: false
    });
  }

  tooLate = () => {
    this.props.loseHP();
    this.disappear();
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
    if (!this.state.display) {
      return (null);
    }

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
            style.yellowLetterBackground, 
            { 
              height: this.state.animatedValue, 
              bottom: 0
            }
          ]} 
        />
        <Text style={[style.letter]}>{ this.state.letter.toUpperCase() }</Text>
      </TouchableOpacity>
    )
  }
}

export default YellowLetter;