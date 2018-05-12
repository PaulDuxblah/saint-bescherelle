import React, { Component } from 'react';
import { Text, View } from 'react-native';

import style from '../../style';

class LetterToEnter extends Component {
  updated = false;

  constructor(props) {
    super(props);
    this.state = {
      letter: props.letter,
      entered: props.entered
    };
  }

  shouldComponentUpdate(nextProps, prevState) {
    if (nextProps.forceUpdate) {
      if (this.updated) {
        this.updated = false;
      } else {
        this.updated = true;
        this.setState({
          letter: nextProps.letter,
          entered: nextProps.entered
        });
      }
    } else {
      if (nextProps.letter != prevState.letter) {
        this.setState({
          letter: nextProps.letter,
          entered: false
        });
      } else if (nextProps.entered === true && nextProps.entered && !prevState.entered) {
        this.setState({
          entered: true
        });
      }
    }

    return true;
  }

  toggleEntered() {
    this.setState({
      entered: !this.state.entered
    })
  }

  render() {
    let styleForLetter = [
      style.letterToEnter, 
      style.cambria, 
      {
        fontSize: this.props.fontSize
      }
    ];
    let styleForLetterContainer = [
      style.letterToEnterContainer, 
      {
        height: this.props.height, 
        width: this.props.width,
        marginHorizontal: this.props.marginHorizontal
      }
    ];

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