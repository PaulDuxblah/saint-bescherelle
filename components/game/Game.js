import Expo from 'expo';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, Footer } from 'react-native';

import style from '../../style';

import YellowLetter from '../letters/YellowLetter';
import RedLetter from '../letters/RedLetter';
import BlueLetter from '../letters/BlueLetter';
import GhostLetter from '../letters/GhostLetter';

import LetterToEnter from '../letters/LetterToEnter';

import GameOver from './GameOver';

const { height, width } = Dimensions.get('window');
const letterHeight = 50;
const gameAreaHeightMargin = 90;
const letterWidth = 50;

const music = new Expo.Audio.Sound();
const loseHpSoundEffect = new Expo.Audio.Sound();

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

    this.loadSoundEffects();

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

  resetMusic = async () => {
    try {
      await music.setPositionAsync(0);
    } catch (error) {
      
    }
  }

  stopMusic = async () => {
    try {
      await music.stopAsync().then(() => {
        this.resetMusic();
      });
    } catch (error) {
      
    }
  }

  loadSoundEffects = async () => {
    try {
      await loseHpSoundEffect.loadAsync(require('../../assets/audio/loseHpSound.mp3'));
    } catch (error) {
      
    }
  }

  playLoseHpSoundEffect = async () => {
    try {
      loseHpSoundEffect.playAsync().then(() => {
        this.resetLoseHpSoundEffect();
      });
    } catch (error) {
      
    }
  }

  resetLoseHpSoundEffect = async () => {
    try {
      await loseHpSoundEffect.setPositionAsync(0);
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
      case 4: 
        this.wordsToWrite = require('../../assets/words/4.json');
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

  createLettersToEnter = (word, forceUpdate = false, newLetterIndex = 0) => {
    let height = 50;
    let width = 50;
    let fontSize = 40;
    let marginHorizontal = 5;

    if (word.length > 6) {
      height = 6 * height / word.length;
      width = 6 * width / word.length;
      fontSize = 6 * fontSize / word.length;
      marginHorizontal = 6 * marginHorizontal / word.length;
    }
    
    let lettersEntered = new Array(word.length);
    for (let i = 0; i < word.length; i++) {
      lettersEntered[i] = this.createLetterToEnter(
        word.charAt(i), 
        forceUpdate ? false : i < this.state.letterIndex || i < newLetterIndex,
        i,
        forceUpdate, 
        height, 
        width, 
        fontSize, 
        marginHorizontal
      );
    }

    return lettersEntered;
  }

  createLetterToEnter = (letter, entered, letterIndex, forceUpdate = false, height = 50, width = 50, fontSize = 40, marginHorizontal = 5) => {
    return <LetterToEnter 
      letter={letter}
      entered={entered}
      key={'LetterToEnter-' + letterIndex}
      forceUpdate={forceUpdate}
      height={height}
      width={width}
      fontSize={fontSize}
      marginHorizontal={marginHorizontal}
    />
  }

  generateLettersEnteredForWord = (word) => {
    return this.createLettersToEnter(word, true);
  }

  generateLettersEnteredFromWordToWrite = (newLetterIndex = 0, forceUpdate = false) => {
    if (this.state.wordToWrite == null || this.state.wordToWrite == undefined) return;

    return this.createLettersToEnter(this.state.wordToWrite, forceUpdate, newLetterIndex);
  }

  setLettersEntered = (newIndex = 0) => {
    this.setState({
      lettersEntered: this.generateLettersEnteredFromWordToWrite(newIndex)
    });
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
    } else {
      this.playLoseHpSoundEffect();
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

  createLetter = (letterOfComponent, posX = 'random', posY = 'random', color = 'yellow', hps = undefined) => {
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
      case 'blue':
        letterComponent = <BlueLetter 
          letter={letterOfComponent} 
          posX={posX} 
          posY={posY} 
          enterLetter={this.enterLetter}
          loseHP={this.loseHP}
          changeScore={this.changeScore}
          key={'BlueLetter-' + this.letterIndex}
          hps={hps}
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

  createLetterAndNext = (letterOfComponent, posX = 'random', posY = 'random', color = 'yellow', hps = undefined, nextPosX = 'random', nextPosY = 'random') => {
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
      this.createLetter(letterOfComponent, posX, posY, color, hps), 
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

    // For BlueLetter
    let hps = undefined;

    if (this.state.wordToWrite.length > 0) {
      let color = Math.floor(Math.random() * 100);
      switch (true) {
        case color < 30:
          color = 'red';
          break;
        case color < 55:
          color = 'blue';
          hps = Math.floor(Math.random() * 7);
          if (hps < 2) {
            hps = 2;
          }
          break;
        default:
          color = 'yellow';
      }

      [letter, nextLetter] = this.createLetterAndNext(this.state.wordToWrite[this.state.letterIndex], 'random', 'random', color, hps);
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