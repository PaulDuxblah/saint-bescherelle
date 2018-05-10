import React from 'react';
import { StatusBar, View, StyleSheet, AsyncStorage } from 'react-native';
import { Font, AppLoading } from 'expo';
import Cambria from './assets/fonts/Cambria.ttf';
import Home from './components/home/Home';
import Game from './components/game/Game';
import Score from './components/score/Score';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scores: null,
      componentSelected: 'Home',
      loadingCompleted: false
    };
    this.loadScores();
    this._loadResourcesAsync();
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'cambria': Cambria
      })
    ]);
  };

  changeComponent = (component) => {
    this.setState({
      componentSelected: component    
    });
  }

  renderComponent = (component) => {
    if (component == 'Game') {
      return <Game checkScore={this.checkScore} restartGame={this.restartGame} backToHome={this.backToHome} />
    } else if (component == 'Score') {
      return <Score scores={this.state.scores} backToHome={this.backToHome} />
    } else {
      return <Home startGame={this.startGame} goToScore={this.goToScore} />
    }
  }

  startGame = () => {
    this.changeComponent('Game');
  }

  goToScore = () => {
    this.changeComponent('Score');
  }

  backToHome = () => {
    this.changeComponent('Home');
  }

  async loadScores () {
    try {
      AsyncStorage.getItem('scores')
      .then((value) => {
        if (value === null) {
          AsyncStorage
            .setItem('scores', JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
            .then(() => { this.loadScores() });
        } else {
          this.setState({ ...this.state, 'scores': JSON.parse(value) });
        }
      });
    } catch (error) {
      
    }
  }

  checkScore = (score) => {
    let scores = this.state.scores;
    let worstScore = scores[scores.length - 1];

    if (score > worstScore) {
      this.saveScore(scores, score);
      this.loadScores();
    }
  }

  async saveScore (scores, score) {
    scores.splice(scores.length - 1);
    scores.push(score);

    scores.sort((a, b) => b - a);

    AsyncStorage.setItem('scores', JSON.stringify(scores));
  }

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loadingCompleted: true });
  };

  render() {
  }

  render() {
    if (!this.state.loadingCompleted && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />
          {this.renderComponent(this.state.componentSelected)}
        </View>
      )
    }
  }
}

//Hide the warning info
console.disableYellowBox = true;