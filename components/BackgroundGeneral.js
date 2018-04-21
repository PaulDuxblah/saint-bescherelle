import React, { Component } from 'react'
import { Image, StyleSheet, ImageBackground, View } from 'react-native'

class BackgroundGeneral extends Component {
  render() {
    return (
     <ImageBackground source={require('../assets/images/bg.png')} style={styles.backgroundImage}>
       {this.props.children}
     </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
    backgroundImage:{
        flex: 1,
        width: '100%'
    }
});

export default BackgroundGeneral