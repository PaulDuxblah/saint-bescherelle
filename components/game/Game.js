import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, Footer } from 'react-native';

import style from '../../style';

import YellowLetter from '../letters/YellowLetter';
import LetterToEnter from '../letters/LetterToEnter';

const { height, width } = Dimensions.get('window');

class Game extends Component {
  wordsToWrite = [];

  constructor(props) {
    super(props);
    this.resetState();
  }

  resetState = () => {
    this.state = {
      score: 0,
      sentenceIndex: 0,
      wordIndex: 0,
      wordToWrite: this.wordsToWrite[0],
      lettersEntered: '',
      hp: 5,
      gameOver: false,
      gameOverAnimated: new Animated.Value(height)
    };
    this.loadNewSentence();
  }

  loadNewSentence = () => {
    switch (this.state.sentenceIndex + 1) {
      case 1: 
        this.wordsToWrite = require('../../assets/words/1.json');
        break;
    }

    this.state = {
      ...this.state,
      sentenceIndex: this.state.sentenceIndex + 1,
      wordIndex: 0,
      wordToWrite: this.wordsToWrite[0],
    };
  }

  changeScore = (scoreToAdd) => {
    this.setState({score: this.state.score + scoreToAdd});
  }

  enterLetter = (letter) => {
    if (this.state.lettersEntered == '') {
      if (this.state.wordToWrite === letter) {
        this.goToNextWord();
      } else {
        this.goToNextLetter(letter);
      }
    } else {
      if (this.state.wordToWrite === this.state.lettersEntered + letter) {
        this.goToNextWord();
      } else if (this.state.wordToWrite.indexOf(this.state.lettersEntered + letter) === 0) {
        this.goToNextLetter(this.state.lettersEntered + letter);
      }
    }
  }

  goToNextLetter = (lettersEntered) => {
    this.setState({
      lettersEntered: lettersEntered,
      wordIndex: this.state.wordIndex + 1
    });
  }

  goToNextWord = () => {
    this.resetLettersEntered();

    let newIndex = this.state.wordIndex + 1;

    if (this.wordsToWrite[newIndex] !== undefined) {
      this.setState({
        wordIndex: newIndex,
        wordToWrite: this.wordsToWrite[newIndex],
      });
    } else {
      this.loadNewSentence();
    }
  }

  resetLettersEntered = () => {
    this.setState({lettersEntered: ''});
  }

  loseHP = () => {
    this.setState({hp: this.state.hp - 1});

    if (this.state.hp <= 0) {
      this.gameOver();
    }
  }

  gameOver = () => {
    this.setState({gameOver: true});

    if (this.state.score > 0) {
      this.props.checkScore(this.state.score);
    }

    Animated.timing(this.state.gameOverAnimated, {
      toValue: 0,
      duration: 1000
    }).start();
  }

  back = () => {
    this.props.backToHome();
  }

  createLetter = (letterOfComponent, posX, posY, color = 'yellow') => {
    let letterComponent = '';
    switch(color) {
      case 'yellow':
        letterComponent = <YellowLetter 
          letter={letterOfComponent} 
          posX={posX} 
          posY={posY} 
          enterLetter={this.enterLetter}
          loseHP={this.loseHP}
          changeScore={this.changeScore}
        />
        break;
    }

    return letterComponent;
  }

  render() {
    let gameOver = null;
    let letter = null;
    let wordToWrite = [];
    if (this.state.gameOver) {
      gameOver = <View style={[style.gameOverContainer]}>
        <Animated.View
          style={[
            style.gameOverScreen,
            {
              top: this.state.gameOverAnimated
            }
          ]}
        >
          <Text style={[style.gameOverTitle]}>GAME OVER</Text>
          <Text style={[style.gameOverScore]}>Score: {this.state.score}</Text>

          <TouchableOpacity 
            onPress={this.back}
            style={[style.backButtonTouch]} 
            activeOpacity={0.8} 
          >
            <Text style={[style.backButtonText]}>RETOUR AU MENU</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>;
    } else {
      if (this.state.wordToWrite.length > 0) {
        letter = this.createLetter(this.state.wordToWrite[this.state.wordIndex], 100, 100);

        for (let i = 0; i < this.state.wordToWrite.length; i++) {
          wordToWrite.push(<LetterToEnter 
            letter={this.state.wordToWrite.charAt(i)}
            entered={i < this.state.wordIndex}
            key={i}
          />);
        }
      }
    }

    return (
      <View style={[style.gameContainer]}>
        {gameOver}

        <View style={[style.hud]}>
          <View style={[style.hpContainer]}>
            <Image source={require("../../assets/images/heart.png")} style={[style.heart]} />
            <Text style={[style.hp]}>{this.state.hp}</Text>
          </View>

          <View style={[style.scoreContainer]}>
            <Text style={[style.gameScore]}>{this.state.score}</Text>
          </View>
        </View>

        {letter}

        <View style={[style.wordToWrite]}>
          {wordToWrite}
        </View>
      </View>
    )
  }
}

export default Game;