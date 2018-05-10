import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, Footer } from 'react-native';

import style from '../../style';

import YellowLetter from '../letters/YellowLetter';
import LetterToEnter from '../letters/LetterToEnter';

const { height, width } = Dimensions.get('window');

class Game extends Component {
  wordsToWrite = [];
  letterIndex = 1;

  constructor(props) {
    super(props);
    this.resetState(true);
  }

  componentDidMount() {
    if (!this.state.lettersEntered) {
      this.setLettersEntered();
    }
  }

  resetState = (constructing = false) => {
    this.state = {
      score: 0,
      sentenceIndex: 0,
      wordIndex: 0,
      wordToWrite: this.wordsToWrite[0],
      lettersEntered: [],
      letterIndex: 0,
      hp: 5,
      gameOver: false,
      gameOverAnimated: new Animated.Value(height)
    };
    this.loadNewSentence(constructing);
  }

  loadNewSentence = (constructing = false) => {
    let reset = false;
    let newSentenceIndex = this.state.sentenceIndex + 1;
    switch (newSentenceIndex) {
      case 1: 
        this.wordsToWrite = require('../../assets/words/1.json');
        break;
      case 2: 
        this.wordsToWrite = require('../../assets/words/2.json');
        break;
      case 3: 
        this.wordsToWrite = require('../../assets/words/3.json');
        break;
      default:
        newSentenceIndex = 1;
        this.wordsToWrite = require('../../assets/words/1.json');
        break;
    }

    if (constructing) {
      this.state = {
        ...this.state,
        sentenceIndex: newSentenceIndex,
        wordIndex: 0,
        wordToWrite: this.wordsToWrite[0],
        lettersEntered: this.generateLettersEnteredFromWordToWrite(),
        letterIndex: 0
      };
    } else {
      this.setState({
        ...this.state,
        sentenceIndex: newSentenceIndex,
        wordIndex: 0,
        wordToWrite: this.wordsToWrite[0],
        letterIndex: 0
      });
      this.setLettersEnteredForWord(this.wordsToWrite[0]);
    }
  }

  changeScore = (scoreToAdd) => {
    this.setState({score: this.state.score + scoreToAdd});
  }

  enterLetter = (letter) => {
    if (!this.state.lettersEntered[0].props.entered) {
      // Word of single letter?
      if (this.state.wordToWrite === letter) {
        this.goToNextWord();
      } else {
        this.goToNextLetter();
      }
    } else {
      const lettersEntered = this.writeLettersEntered();

      // Word finalized?
      if (this.state.wordToWrite === lettersEntered + letter) {
        this.goToNextWord();
      } else if (this.state.wordToWrite.indexOf(lettersEntered + letter) === 0) {
        this.goToNextLetter();
      }
    }
  }

  writeLettersEntered = () => {
    let word = '';
    this.state.lettersEntered.forEach((letterEntered) => {
      if (letterEntered.props.entered) {
        word += letterEntered.props.letter;
      }
    });

    return word;
  }

  goToNextLetter = () => {
    this.setState({
      letterIndex: this.state.letterIndex + 1
    });
    this.setLettersEntered(this.state.letterIndex + 1);
  }

  goToNextWord = () => {
    this.resetLettersEntered();

    const newWordIndex = this.state.wordIndex + 1;

    if (this.wordsToWrite[newWordIndex] !== undefined) {
      this.setState({
        wordIndex: newWordIndex,
        letterIndex: 0,
        wordToWrite: this.wordsToWrite[newWordIndex],
      });
      this.setLettersEnteredForWord(this.wordsToWrite[newWordIndex]);
    } else {
      this.loadNewSentence();
    }
  }

  setLettersEnteredForWord = (word) => {
    this.setState({
      lettersEntered: this.generateLettersEnteredForWord(word)
    });
  }

  generateLettersEnteredForWord = (word) => {
    let lettersEntered = new Array(word.length);
    for (let i = 0; i < word.length; i++) {
      lettersEntered[i] = this.createLetterToEnter(word, false, i, true);
    }

    return lettersEntered;
  }

  createLetterToEnter = (word, entered, letterIndex, forceUpdate = false) => {
    return <LetterToEnter 
      letter={word.charAt(letterIndex)}
      entered={entered}
      key={'LetterToEnter-' + letterIndex}
      forceUpdate={forceUpdate}
    />
  }

  setLettersEntered = (newIndex = 0) => {
    this.setState({
      lettersEntered: this.generateLettersEnteredFromWordToWrite(newIndex)
    });
  }

  generateLettersEnteredFromWordToWrite = (newLetterIndex = 0, forceUpdate = false) => {
    if (!this.state.wordToWrite) return;

    let lettersEntered = new Array(this.state.wordToWrite.length);
    for (let i = 0; i < this.state.wordToWrite.length; i++) {
      lettersEntered[i] = this.createLetterToEnter(
        this.state.wordToWrite, 
        i < this.state.letterIndex || i < newLetterIndex, 
        i,
        forceUpdate
      );
    }

    return lettersEntered;
  }

  resetLettersEntered = () => {
    this.setState({
      lettersEntered: []
    });
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
    if (posX == 'random') {
      posX = Math.floor(Math.random() * (width - 50));
    }

    if (posY == 'random') {
      posY = Math.floor(Math.random() * (height - 140));
    }

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
          key={'YellowLetter-' + this.letterIndex}
        />
        break;
    }

    this.letterIndex = this.letterIndex + 1;

    return letterComponent;
  }

  render() {
    if (this.state.gameOver) {
      return (
      <View style={[style.gameContainer]}>
        <View style={[style.gameOverContainer]}>
          <Animated.View
            style={[
              style.gameOverScreen,
              {
                top: this.state.gameOverAnimated
              }
            ]}
          >
            <Text style={[style.gameOverTitle, style.cambria]}>GAME OVER</Text>
            <Text style={[style.gameOverScore, style.cambria]}>Score: {this.state.score}</Text>

            <TouchableOpacity 
              onPress={this.back}
              style={[style.backButtonTouch]} 
              activeOpacity={0.8} 
            >
              <Text style={[style.backButtonText, style.cambria]}>RETOUR AU MENU</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      );
    }

    let letter = null;
    let wordToWrite = [];

    if (this.state.wordToWrite.length > 0) {
      letter = this.createLetter(this.state.wordToWrite[this.state.letterIndex], 'random', 'random');
    }

    return (
      <View style={[style.gameContainer]}>
        <View style={[style.hud]}>
          <View style={[style.hpContainer]}>
            <Image source={require("../../assets/images/heart.png")} style={[style.heart]} />
            <Text style={[style.hp, style.cambria]}>{this.state.hp}</Text>
          </View>

          <View style={[style.scoreContainer]}>
            <Text style={[style.gameScore, style.cambria]}>{this.state.score}</Text>
          </View>
        </View>

        {letter}

        <View style={[style.wordToWrite]}>
          {this.state.lettersEntered}
        </View>
      </View>
    )
  }
}

export default Game;