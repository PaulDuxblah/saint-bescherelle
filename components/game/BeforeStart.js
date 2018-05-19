import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';

import style from '../../style';

class BeforeStart extends Component {
  constructor(props) {
    super(props);
    this.resetState(true);
    this.animateText();
    this.animateContainer();
  }

  resetState = (constructing = false) => {
    this.resetLetterSizeAnimated(constructing);
    this.state = {
      ...this.state,
      toWrite: '3',
      backgroundOpacityAnimated: new Animated.Value(0)
    }
  }

  resetLetterSizeAnimated = (constructing = false) => {
    if (constructing) {
      this.state = {
        ...this.state,
        letterSizeAnimated: new Animated.Value(0)
      }
    } else {
      this.setState({
        letterSizeAnimated: new Animated.Value(0)
      })
    }
  }

  animateText = () => {
    Animated.timing(this.state.letterSizeAnimated, {
      toValue: 120,
      duration: 300,
      easing: Easing.linear
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
            futureToWrite = 'GO';
            break;
          case 'GO':
            break
        }

        Animated.timing(this.state.letterSizeAnimated, {
          toValue: 160,
          duration: 700,
          easing: Easing.linear
        }).start((a) => {
          if (a.finished) {
            if (this.state.toWrite === 'GO') {
              return this.gameStarted();
            }

            this.setState({
              toWrite: futureToWrite
            });
            this.resetLetterSizeAnimated();
            this.animateText();
          }
        });
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