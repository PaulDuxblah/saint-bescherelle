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
    this.resetState();
  }

  componentDidMount() {
    if (!this.state.lettersEntered) {
      this.setLettersEntered();
    }
  }

  resetState = () => {
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
      lettersEntered: this.generateLettersEnteredFromWordToWrite(),
      letterIndex: 0
    };
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
      lettersEntered[i] = this.createLetterToEnter(word, false, i);
    }

    return lettersEntered;
  }

  createLetterToEnter = (word, entered, letterIndex) => {
    return <LetterToEnter 
      letter={word.charAt(letterIndex)}
      entered={entered}
      key={'LetterToEnter-' + letterIndex}
    />
  }

  setLettersEntered = (newIndex = 0) => {
    this.setState({
      lettersEntered: this.generateLettersEnteredFromWordToWrite(newIndex)
    });
  }

  generateLettersEnteredFromWordToWrite = (newLetterIndex = 0) => {
    if (!this.state.wordToWrite) return;

    let lettersEntered = new Array(this.state.wordToWrite.length);
    for (let i = 0; i < this.state.wordToWrite.length; i++) {
      lettersEntered[i] = this.createLetterToEnter(
        this.state.wordToWrite, 
        i < this.state.letterIndex || i < newLetterIndex, 
        i
      );
      <LetterToEnter 
        letter={this.state.wordToWrite.charAt(i)}
        entered={i < this.state.letterIndex || i < newLetterIndex}
        key={'LetterToEnter-' + i}
      />
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
        letter = this.createLetter(this.state.wordToWrite[this.state.letterIndex], 100, 100);
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
          {this.state.lettersEntered}
        </View>
      </View>
    )
  }
}

export default Game;