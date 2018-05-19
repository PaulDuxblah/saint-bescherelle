import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';

import style from '../../style';

const { height, width } = Dimensions.get('window');

class BeforeStart extends Component {
  constructor(props) {
    super(props);
    this.resetState();
    this.animateText();
    this.animateContainer();
  }

  resetState = () => {
    this.resetLetterSizeAnimated();
    this.state = {
      ...this.state,
      toWrite: '3',
      backgroundOpacityAnimated: new Animated.Value(0)
    }
  }

  resetLetterSizeAnimated = () => {
    this.state = {
      ...this.state,
      letterSizeAnimated: new Animated.Value(0)
    }
  }

  animateText = () => {
    Animated.timing(this.state.letterSizeAnimated, {
      toValue: 100,
      duration: 1000
    }).start((animation) => { 
      if (animation.finished) {
        let futureToWrite = '';
        switch (this.state.toWrite) {
          case '3':
            futureToWrite = '2';
            break;
          case '2':
            futureToWrite = '1';
            break;
          case '1':
            futureToWrite = 'GO !';
            break;
          case 'GO !':
            return this.gameStarted();
            break
        }
        this.setState({
          toWrite: futureToWrite
        });

        this.resetLetterSizeAnimated();
        this.animateText();
      }
    });
  }

  animateContainer = () => {
    Animated.timing(this.state.backgroundOpacityAnimated, {
      toValue: 0,
      duration: 2500
    }).start((animation) => { 
      if (animation.finished) {
        Animated.timing(this.state.backgroundOpacityAnimated, {
          toValue: 100,
          duration: 500
        }).start();
      }
    });
  }

  gameStarted = () => {
    this.props.gameStarted();
  }

  render() {
    const backgroundColor = this.state.backgroundOpacityAnimated.interpolate({
        inputRange: [0, 100],
        outputRange: ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']
    });

    return (
      <View style={[style.gameContainer]}>
        <Animated.View
          style={[
            style.beforeStartContainer,
            {
              backgroundColor: backgroundColor
            }
          ]}
        >
          <Animated.Text
            style={[
              style.beforeStartText,
              {
                fontSize: this.state.letterSizeAnimated
              }
            ]}
          >
            {this.state.toWrite}
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }
}

export default BeforeStart;