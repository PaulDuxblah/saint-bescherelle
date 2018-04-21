import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

import style from '../../style';

import YellowLetter from '../letters/YellowLetter';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      wordToWrite: 'maison',
      lettersEntered: '',
      hp: 5
    }
  }

  addInState = (key, object) => {
    let newState = {
      ...this.state
    };
    newState[key] = object;
    this.setState(newState);
  }

  changeScore = (scoreToAdd) => {
    this.addInState('score', this.state.score + scoreToAdd);
  }

  generateWordToWrite = (word) => {
    this.addInState('wordToWrite', word);
  }

  enterLetter = (letter) => {
    if (this.state.lettersEntered == '') {
      if (this.state.wordToWrite === letter) {
        this.resetLettersEntered();
      } else {
        this.addInState('lettersEntered', letter);
      }
    } else {
      if (this.state.wordToWrite === this.state.lettersEntered + letter) {
        this.resetLettersEntered();
      } else if (this.state.wordToWrite.indexOf(this.state.lettersEntered + letter) === 0) {
        this.addInState('lettersEntered', this.state.lettersEntered + letter);
      }
    }
  }

  resetLettersEntered = () => {
    this.addInState('lettersEntered', '');
  }

  loseHP = () => {
    this.addInState('hp', this.state.hp - 1);
  }

  render() {
    let letter = null;

    if (this.state.lettersEntered.length < 1) {
      letter = <YellowLetter 
        letter='m' 
        posX={50} 
        posY={400} 
        enterLetter={this.enterLetter}
        loseHP={this.loseHP}
      />
    }

    return (
      <View style={[style.gameContainer]}>
        <View style={[style.hpContainer]}>
          <Image source={require("../../assets/images/heart.png")} style={[style.heart]} />
          <Text style={[style.hp]}>{this.state.hp}</Text>
        </View>

        {letter}
      </View>
    )
  }
}

export default Game;