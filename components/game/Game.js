import Expo from 'expo';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, Footer } from 'react-native';

import style from '../../style';

import YellowLetter from '../letters/YellowLetter';
import RedLetter from '../letters/RedLetter';
import GhostLetter from '../letters/GhostLetter';

import LetterToEnter from '../letters/LetterToEnter';

import GameOver from './GameOver';

const { height, width } = Dimensions.get('window');
const letterHeight = 50;
const gameAreaHeightMargin = 90;
const letterWidth = 50;

const music = new Expo.Audio.Sound();

let nextLetterX = null;
let nextLetterY = null;

class Game extends Component {
  wordsToWrite = [];
  letterIndex = 1;

  constructor(props) {
    super(props);
    this.loadMusic().then(() => {
      this.startMusic();
    });
    this.resetState(true);
  }

  componentDidMount() {
    if (!this.state.lettersEntered) {
      this.setLettersEntered();
    }
  }

  loadMusic = async () => {
    try {
      await music.loadAsync(require('../../assets/audio/maatoi.mp3'));
      await music.setIsLoopingAsync(true);
    } catch (error) {
      
    }
  }

  startMusic = async () => {
    try {
      await music.playAsync();
    } catch (error) {
      
    }
  }

  stopMusic = async () => {
    try {
      await music.stopAsync();
    } catch (error) {
      
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
      gameOver: false
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
    let newHp = this.state.hp - 1;
    this.setState({hp: newHp});

    if (newHp <= 0) {
      this.gameOver();
    }
  }

  gameOver = () => {
    this.setState({gameOver: true});
    this.stopMusic();

    if (this.state.score > 0) {
      this.props.checkScore(this.state.score);
    }
  }

  backToHome = () => {
    this.props.backToHome();
  }

  getPosX = (posX) => {
    if (posX == 'random') {
      posX = Math.floor(Math.random() * (width - letterWidth));
    }

    return posX;
  }

  getPosY = (posY) => {
    if (posY == 'random') {
      posY = Math.floor(Math.random() * (height - (letterHeight + gameAreaHeightMargin)));
    }

    return posY;
  }

  createGhostLetter = (posX, posY) => {
    posX = this.getPosX(posX);
    posY = this.getPosY(posY);

    let ghostLetter = <GhostLetter 
      posX={posX}
      posY={posY}
      key={'GhostLetter-' + this.letterIndex}
    />

    this.letterIndex = this.letterIndex + 1;
    nextLetterX = posX;
    nextLetterY = posY;

    return ghostLetter;
  }

  createLetter = (letterOfComponent, posX = 'random', posY = 'random', color = 'yellow') => {
    posX = this.getPosX(posX);
    posY = this.getPosY(posY);

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
      case 'red':
        letterComponent = <RedLetter 
          letter={letterOfComponent} 
          posX={posX} 
          posY={posY} 
          enterLetter={this.enterLetter}
          loseHP={this.loseHP}
          changeScore={this.changeScore}
          key={'RedLetter-' + this.letterIndex}
        />
        break;
    }

    this.letterIndex = this.letterIndex + 1;

    return letterComponent;
  }

  // A GhostLetter must not be on another letter
  getGhostLetterPositionDependingOfCurrentLetterPosition = (posX, posY, nextPosX, nextPosY) => {
    const tooCloseX = (
      nextPosX == posX
      || (
        nextPosX < posX 
        && nextPosX + letterWidth >= posX
      )
      || (
        nextPosX > posX
        && nextPosX - letterWidth <= posX
      )
    );
    const tooCloseY = (
      nextPosY == posY
      || (
        nextPosY < posY 
        && nextPosY + letterHeight >= posY
      )
      || (
        nextPosY > posY
        && nextPosY - letterHeight <= posY
      )
    );

    // If X or Y or both are far enough (more than the component width or height)
    // We keep the coordinates 
    if (!tooCloseX || !tooCloseY) {
      return [nextPosX, nextPosY];
    }

    // We change the closest coordonate
    if (Math.abs(nextPosX - posX) > Math.abs(nextPosY - posY)) {
      // Y is the closest
      if (nextPosY >= posY) {
        if (posY + letterHeight < height - (letterHeight + gameAreaHeightMargin)) {
          nextPosY = posY + letterHeight;
        } else {
          nextPosY = posY - letterHeight;
        }
      } else {
        if (posY < letterHeight) {
          nextPosY = posY + letterHeight;
        } else {
          nextPosY = posY - letterHeight;
        }
      }
    } else {
      // X is the closest (or X and Y have the same difference)
      if (nextPosX >= posX) {
        if (posX + letterWidth < width - letterWidth) {
          nextPosX = posX + letterWidth;
        } else {
          nextPosX = posX - letterWidth;
        }
      } else {
        if (posX < letterWidth) {
          nextPosX = posX + letterWidth;
        } else {
          nextPosX = posX - letterWidth;
        }
      }
    }

    return [nextPosX, nextPosY];
  }

  createLetterAndNext = (letterOfComponent, posX = 'random', posY = 'random', color = 'yellow', nextPosX = 'random', nextPosY = 'random') => {
    if (nextLetterX) {
      posX = nextLetterX;
    }
    if (nextLetterY) {
      posY = nextLetterY;
    }

    posX = this.getPosX(posX);
    posY = this.getPosY(posY);
    nextPosX = this.getPosX(nextPosX);
    nextPosY = this.getPosY(nextPosY);

    [nextPosX, nextPosY] = this.getGhostLetterPositionDependingOfCurrentLetterPosition(posX, posY, nextPosX, nextPosY);

    return [
      this.createLetter(letterOfComponent, posX, posY, color), 
      this.createGhostLetter(nextPosX, nextPosY)
    ];
  }

  render() {
    if (this.state.gameOver) {
      return (
        <GameOver
          backToHome={this.backToHome}
          gameOverAnimated={this.state.gameOverAnimated}
          score={this.state.score}
        />
      );
    }

    let letter = null;
    let nextLetter = null;
    let wordToWrite = [];

    if (this.state.wordToWrite.length > 0) {
      let color = Math.floor(Math.random() * 100);
      switch (true) {
        case color < 40:
          color = 'red';
          break;
        default:
          color = 'yellow';
      }

      [letter, nextLetter] = this.createLetterAndNext(this.state.wordToWrite[this.state.letterIndex], 'random', 'random', color);
    }

    return (
      <View style={[style.gameContainer]}>
        <View style={[style.hud]}>
          <View style={[style.hpContainer]}>
            <Image source={require("../../assets/images/heart.png")} style={[style.heart]} />
            <Text style={[style.hp, style.cambria]}>{this.state.hp}</Text>
          </View>

          <View style={[style.gameScoreContainer]}>
            <Text style={[style.gameScore, style.cambria]}>{this.state.score}</Text>
          </View>
        </View>

        <View style={[style.gameArea]}>
          {letter}
          {nextLetter}
        </View>

        <View style={[style.wordToWrite]}>
          {this.state.lettersEntered}
        </View>
      </View>
    )
  }
}

export default Game;