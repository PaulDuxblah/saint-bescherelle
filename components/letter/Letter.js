import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import style from '../../style';

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: this.props.letter,
      posX: this.props.posX,
      posY: this.props.posY
    }
  }

  handleClick = () => {
    console.log('click');
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
        <Text style={[style.letter]}>{this.state.letter.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}

export default Letter;