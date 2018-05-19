import React from 'react';
import { StatusBar, View, StyleSheet, AsyncStorage } from 'react-native';
import { Font, AppLoading } from 'expo';
import Cambria from './assets/fonts/Cambria.ttf';
import Home from './components/home/Home';
import Game from './components/game/Game';
import Score from './components/score/Score';
import Options from './components/options/Options';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scores: null,
      componentSelected: 'Home',
      loadingCompleted: false,
    };
    this.loadScores();
    this.loadOptions();
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

  changeMusicVolume = (volume) => {
    if (volume >= 0 && volume <= 100) {
      this.setState({musicVolume: volume});
      this.changeOptions('musicVolume', volume);
    }
  }

  changeSoundEffectsVolume = (volume) => {
    if (volume >= 0 && volume <= 100) {
      this.setState({soundEffectsVolume: volume});
      this.changeOptions('soundEffectsVolume', volume);
    }
  }

  renderComponent = (component) => {
    if (component == 'Game') {
      return <Game 
        checkScore={this.checkScore} 
        restartGame={this.restartGame} 
        backToHome={this.backToHome} 
        musicVolume={this.state.musicVolume} 
        soundEffectsVolume={this.state.soundEffectsVolume} 
      />
    } else if (component == 'Score') {
      return <Score 
        scores={this.state.scores} 
        backToHome={this.backToHome}
      />
    } else if (component == 'Options') {
      return <Options 
        backToHome={this.backToHome} 
        musicVolume={this.state.musicVolume} 
        soundEffectsVolume={this.state.soundEffectsVolume} 
        changeMusicVolume={this.changeMusicVolume} 
        changeSoundEffectsVolume={this.changeSoundEffectsVolume} 
      />
    } else {
      return <Home 
        startGame={this.startGame} 
        goToScore={this.goToScore} 
        goToOptions={this.goToOptions} 
      />
    }
  }

  startGame = () => {
    this.changeComponent('Game');
  }

  goToScore = () => {
    this.changeComponent('Score');
  }

  goToOptions = () => {
    this.changeComponent('Options');
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

  async loadOptions () {
    try {
      AsyncStorage.getItem('options')
      .then((value) => {
        if (value === null) {
          AsyncStorage
            .setItem('options', JSON.stringify({
              musicVolume: 100,
              soundEffectsVolume: 100,
            }))
            .then(() => { this.loadOptions() });
        } else {
          const options = JSON.parse(value);
          this.setState({ 
            ...this.state, 
            musicVolume: options.musicVolume,
            soundEffectsVolume: options.soundEffectsVolume
          });
        }
      });
    } catch (error) {
      
    }
  }

  async changeOptions (parameterToChange, newValue) {
    let newOptions = {
      musicVolume: this.state.musicVolume,
      soundEffectsVolume: this.state.soundEffectsVolume
    }
    newOptions[parameterToChange] = newValue;

    AsyncStorage.setItem('options', JSON.stringify(newOptions));
  }

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loadingCompleted: true });
  };

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