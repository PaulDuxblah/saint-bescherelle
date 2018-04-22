import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';

import style from '../../style';

import YellowLetter from '../letters/YellowLetter';

const { height, width } = Dimensions.get('window');

class Game extends Component {
  constructor(props) {
    super(props);
    this.resetState();
  }

  resetState = () => {
    this.state = {
      score: 0,
      wordToWrite: 'maison',
      lettersEntered: '',
      hp: 1,
      gameOver: false,
      gameOverAnimated: new Animated.Value(height)
    };
  }

  changeScore = (scoreToAdd) => {
    this.setState({score: this.state.score + scoreToAdd});
  }

  generateWordToWrite = (word) => {
    this.setState({wordToWrite: word});
  }

  enterLetter = (letter) => {
    if (this.state.lettersEntered == '') {
      if (this.state.wordToWrite === letter) {
        this.resetLettersEntered();
      } else {
        this.setState({lettersEntered: letter});
      }
    } else {
      if (this.state.wordToWrite === this.state.lettersEntered + letter) {
        this.resetLettersEntered();
      } else if (this.state.wordToWrite.indexOf(this.state.lettersEntered + letter) === 0) {
        this.setState({lettersEntered: this.state.lettersEntered + letter});
      }
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

  render() {
    let letter = null;
    if (this.state.lettersEntered.length < 1) {
      letter = <YellowLetter 
        letter='m' 
        posX={50} 
        posY={400} 
        enterLetter={this.enterLetter}
        loseHP={this.loseHP}
        changeScore={this.changeScore}
      />
    }

    let gameOver = null;
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
      </View>
    )
  }
}

export default Game;