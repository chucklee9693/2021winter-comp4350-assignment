const initialState = {
  tag: "",
};

export default function searchBoxReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TAG":
      return { ...state, tag: action.payload}
    default:
      return state;
  }
} 