import React, { Component } from 'react';
import { Text, View } from 'react-native';

import style from '../../style';

import { loadCommonState } from './LetterCommon';

class GhostLetter extends Component {
  constructor(props) {
    super(props);
    this.state = loadCommonState(props);
  }

  render() {
    return (
      <View        
        onPress={this.handleClick}
        style={[
          style.letterContainer,
          style.ghostLetterContainer,
          { 
            left: this.state.posX,
            top: this.state.posY
          }
        ]}
      >
        <Text style={[style.letter, style.ghostLetter, style.cambria]}>?</Text>
      </View>
    )
  }
}

export default GhostLetter;