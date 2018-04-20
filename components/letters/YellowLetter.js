import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Background } from 'react-native';

import style from '../../style';

class YellowLetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: this.props.letter,
      posX: this.props.posX,
      posY: this.props.posY,
      animatedValue: new Animated.Value(50)
    }
  }

  handleClick = () => {
    
  }

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: 1000
    }).start();
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