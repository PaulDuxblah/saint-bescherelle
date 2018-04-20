const white     = '#FFFFFF';
const black     = '#000000';
const red       = '#FF0000';
const blue      = '#0000FF';
const turquoise = '#00E5EE';

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
}