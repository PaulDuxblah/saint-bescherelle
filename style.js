const black                       = '#000000';
const blackR                      = '0';
const blackG                      = '0';
const blackB                      = '0';
const blue                        = '#0000FF';
const red                         = '#FF0000';
const gameBackground              = '#00E5EE';
const white                       = '#FFFFFF';
const yellow                      = '#F6AB00';
const letterEnteredBackground     = '#F0E2A6';
const letterNotEnteredBackground  = '#423f31';

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
    fontFamily: "cambria"
  },

  homeButtonTouch: {

  },

  gameContainer: {
    flex: 1,
    backgroundColor: gameBackground
  },

  hud: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },

  hpContainer: {
    flexDirection: 'row'
  },

  hp: {
    marginTop: 2,
    fontSize: 20
  },

  gameScoreContainer: {
    alignSelf: 'flex-end',
  },

  gameScore: {
    fontSize: 20,
    marginRight: 5
  },

  heart: {
    width: 30,
    height: 30
  },

  letter: {
    color: white,
    fontSize: 25,
    fontFamily: "cambria"
  },

  letterToEnter: {
    fontSize: 40,
    alignSelf: 'center',
    fontFamily: "cambria"
  },

  letterToEnterContainer: {
    height: 50,
    width: 50,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  letterEntered: {
    color: white,
    fontFamily: "cambria"
  },

  letterEnteredContainer: {
    backgroundColor: letterEnteredBackground,
  },

  letterNotEntered: {
    color: black,
    fontFamily: "cambria"
  },

  letterNotEnteredContainer: {
    backgroundColor: letterNotEnteredBackground
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
    fontFamily: "cambria"
  },

  yellowLetterBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: yellow,
    position: 'absolute',
  },

  yellowLetterContainer: {
    position: 'relative'
  },

  gameOverContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(' + blackR + ', ' + blackG + ', ' + blackB + ', 0.5)',
    top: 0,
    left: 0,
    justifyContent: 'center',
  },

  gameOverScreen: {
    height: 360,
    width: 300,
    borderColor: red,
    borderWidth: 4,
    backgroundColor: white,
    alignSelf: 'center',
  },

  gameOverTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10
  },

  gameOverScore: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20
  },

  backButtonTouch: {
    marginTop: 20,
    borderColor: red,
    borderWidth: 2,
    backgroundColor: blue,
    width: 200,
    alignSelf: 'center'
  },

  backButtonText: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
    color: white,
    fontFamily: "cambria"
  },

  wordToWrite: {
    position: 'absolute',
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10,
    fontFamily: "cambria"
  }
}