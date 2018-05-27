const initialState = {
  data: [
    {name: 'Me', avatar: require('../resources/avatar.jpg')},
    {name: 'Player name', avatar: require('../resources/avatar.jpg')},
    {name: 'Player name', avatar: require('../resources/avatar.jpg')},
    {name: 'Player name', avatar: require('../resources/avatar.jpg')}
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAMPLE_ACTION":
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default reducer;
