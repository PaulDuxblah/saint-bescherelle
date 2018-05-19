import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import style from '../../style';

class Options extends Component {
  constructor(props) {
    super(props);
  }

  backToHome = () => {
    this.props.backToHome();
  }

  putMusicVolumeUp = () => {
    return this.props.changeMusicVolume(this.props.musicVolume + 5);
  }

  putMusicVolumeDown = () => {
    return this.props.changeMusicVolume(this.props.musicVolume - 5);
  }

  putSoundEffectsVolumeUp = () => {
    return this.props.changeSoundEffectsVolume(this.props.soundEffectsVolume + 5);
  }

  putSoundEffectsVolumeDown = () => {
    return this.props.changeSoundEffectsVolume(this.props.soundEffectsVolume - 5);
  }

  render() {
    return (
      <View style={[style.container, style.options]}>
        <Text style={[style.optionsTitle]}>Options</Text>

        <View style={[style.optionsParameters]}>
          <Text style={[style.optionsParametersTitle]}>Son</Text>

          <View style={[style.optionsGroup]}>
            <Text style={[style.optionsParameter]}>Musique</Text>

            <View style={[style.optionsGroupEditable]}>
              <TouchableHighlight
                style={[style.optionsTouchable]} 
                onPress={this.putMusicVolumeDown}
                disabled={this.props.musicVolume === 0}
              >
                <Text style={[style.optionsTouchableText]}>-</Text>
              </TouchableHighlight>

              <Text style={[style.optionsValue]}>{this.props.musicVolume}%</Text>

              <TouchableHighlight 
                style={[style.optionsTouchable]} 
                onPress={this.putMusicVolumeUp}
                disabled={this.props.musicVolume === 100}
              >
                <Text style={[style.optionsTouchableText]}>+</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[style.optionsGroup]}>
            <Text style={[style.optionsParameter]}>Bruitages</Text>

            <View style={[style.optionsGroupEditable]}>
              <TouchableHighlight 
                style={[style.optionsTouchable]} 
                onPress={this.putSoundEffectsVolumeDown}
                disabled={this.props.soundEffectsVolume === 0}
              >
                <Text style={[style.optionsTouchableText]}>-</Text>
              </TouchableHighlight>

              <Text style={[style.optionsValue]}>{this.props.soundEffectsVolume}%</Text>

              <TouchableHighlight 
                style={[style.optionsTouchable]} 
                onPress={this.putSoundEffectsVolumeUp}
                disabled={this.props.soundEffectsVolume === 100}
              >
                <Text style={[style.optionsTouchableText]}>+</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <TouchableHighlight style={[style.optionsBackToHome]} onPress={this.backToHome}>
          <Text style={[style.optionsBackToHomeText]}>RETOUR AU MENU</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Options;