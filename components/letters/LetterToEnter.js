import React, { Component } from 'react';
import { Text, View } from 'react-native';

import style from '../../style';

class LetterToEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: props.letter,
      entered: props.entered
    };
  }

  render() {
    let styleForLetter = [style.letterToEnter];
    let styleForLetterContainer = [style.letterToEnterContainer];
    if (this.state.entered) {
      styleForLetter.push(style.letterEntered);
      styleForLetterContainer.push(style.letterEnteredContainer);
    } else {
      styleForLetter.push(style.letterNotEntered);
      styleForLetterContainer.push(style.letterNotEnteredContainer);
    }

    return (
      <View style={styleForLetterContainer}>
        <Text style={styleForLetter}>{ this.state.letter.toUpperCase() }</Text>
      </View>
    )
  }
}

export default LetterToEnter;