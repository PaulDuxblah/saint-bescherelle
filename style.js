const black                       = '#000000';
const blackR                      = '0';
const blackG                      = '0';
const blackB                      = '0';
const blue                        = '#0000FF';
const red                         = '#FF0000';
const lightRed                    = '#D02020';
const gameBackground              = '#00E5EE';
const white                       = '#FFFFFF';
const yellow                      = '#F6AB00';
const letterEnteredBackground     = '#F0E2A6';
const letterNotEnteredBackground  = '#423f31';
const scoreBackground             = '#850eb5';
const ghostBackground             = '#444444';

export default {
  cambria: {
    fontFamily: 'cambria'
  },

  home: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: lightRed
  },

  homeLetterContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: black,
  },

  homeButton: {
    width: 200,
    padding: 10,
    fontSize: 26,
    textAlign: 'center',

    borderWidth: 2,
  },

  homeStartGame: {
    borderColor: gameBackground,
    backgroundColor: white
  },

  homeScore: {
    borderColor: scoreBackground,
    backgroundColor: white
  },

  homeTitle: {
    alignSelf: 'center',
    textAlignVertical: 'top', 
    color: white,
    fontSize: 38,
    marginTop: 20
  },

  homeRules: {
    flexDirection: 'column',
    marginBottom: 10
  },

  homeRule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },

  homeRuleExplanation: {
    fontSize: 20,
    color: white,
    marginLeft: 10
  },

  homeButtonTouch: {
    marginTop: 10,
    marginBottom: 10
  },

  gameContainer: {
    flex: 1,
    backgroundColor: gameBackground
  },

  gameScoreContainer: {
  },

  gameArea: {
    flex: 1,
    position: 'relative',
  },

  scoreContainer: {
    flex: 1,
    backgroundColor: scoreBackground
  },

  scoresList: {
    alignItems: 'center'
  },

  scoreRow: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between'
  },

  scoreRank: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start'
  },

  scoreRankText: {
    fontSize: 20,
    color: white
  },

  score: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-end'
  },

  scoreText: {
    fontSize: 20,
    color: white,
  },

  scoreBackToHome: {
    marginTop: 20,
    borderColor: red,
    borderWidth: 2,
    backgroundColor: white,
    width: 200,
    alignSelf: 'center'
  },

  scoreBackToHomeText: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
    color: black
  },

  scoreTitle: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 20,
    color: white
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
    fontSize: 25
  },

  letterToEnter: {
    alignSelf: 'center'
  },

  letterToEnterContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  letterEntered: {
    color: white
  },

  letterEnteredContainer: {
    backgroundColor: letterEnteredBackground,
  },

  letterNotEntered: {
    color: black
  },

  letterNotEnteredContainer: {
    backgroundColor: letterNotEnteredBackground
  },

  letterContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

    borderWidth: 1,
    borderColor: black,
  },

  ghostLetter: {
    color: black
  },

  ghostLetterContainer: {
    backgroundColor: ghostBackground
  },

  letterBackground: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },

  yellowLetterBackground: {
    backgroundColor: yellow,
  },

  redLetterBackground: {
    backgroundColor: red,
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
    backgroundColor: lightRed,
    width: 200,
    alignSelf: 'center'
  },

  backButtonText: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
    color: white
  },

  wordToWrite: {
    position: 'absolute',
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10
  }
}