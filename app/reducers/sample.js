const initialState = {
  sample: false,
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAMPLE_ACTION":
      return {
        ...state,
        sample: action.sample
      }
    case "LOADING_STOP":
      return {
        ...state,
        loading: false
      }
    case "LOADING_START":
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};

export default reducer;
