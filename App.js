import React from 'react';
import { StatusBar, View, StyleSheet, AsyncStorage } from 'react-native';
import Home from './components/home/Home';
import Game from './components/game/Game';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scores: null,
      componentSelected: 'Home'
    };
  }

  changeComponent = (component) => {
    this.setState({
      componentSelected: component    
    })
  }

  startGame = () => {
    this.changeComponent('Game');
  }

  renderComponent = (component) => {
    if (component == 'Game') {
      return <Game />
    } else {
      return <Home scores={this.state.scores} startGame={this.startGame} />
    }
  }

  async loadScores () {
    try {
      AsyncStorage.getItem('scores')
      .then((value) => {
        this.setState({ 'scores': JSON.parse(value) });
      });
    } catch (error) {
      
    }
  }

  async saveScore (score) {
    let scores = this.state.scores;
    let worstScore = scores[scores.length - 1];

    if (score > worstScore) {
      scores.splice(scores.length - 1);
      scores.push(score);

      scores.sort((a, b) => a - b);

      AsyncStorage.setItem('scores', scores)
      .then(() => {
        this.loadUser();
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderComponent(this.state.componentSelected)}
      </View>
    )
  }
}

//Hide the warning info
console.disableYellowBox = true;