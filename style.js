const black     = '#000000';
const blue      = '#0000FF';
const red       = '#FF0000';
const turquoise = '#00E5EE';
const white     = '#FFFFFF';
const yellow    = '#F6AB00';

export default {
  home: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeButton: {
    width: 200,
    padding: 10,
    fontSize: 30,
    textAlign: 'center',

    borderWidth: 2,
    borderColor: red,
    backgroundColor: white,
    // fontFamily: "Cambria"
  },

  homeButtonTouch: {

  },

  gameContainer: {
    flex: 1,
    backgroundColor: turquoise
  },

  letter: {
    color: white,
    fontSize: 25,
  },

  letterContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: black,
  },

  yellowLetter: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  yellowLetterBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: yellow,
    position: 'absolute',
  },

  yellowLetterContainer: {
    position: 'relative'
  }
}