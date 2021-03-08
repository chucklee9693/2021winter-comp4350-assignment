const initialState = {
  tag: "",
  searchClicked: false,
  dataRetrieved: false,
  results: [],
  responseTime: "",
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TAG":
      return { ...state, tag: action.payload }
    case "SET_SERACH_CLICKED":
      return { ...state, searchClicked: action.payload }
    case "SET_DATA_RETRIEVED":
      return { ...state, dataRetrieved: action.payload }
    case "SET_RESULTS":
      return { ...state, results: action.payload }
    case "SET_RESPONSE_TIME":
      return { ...state, responseTime: action.payload }
    default:
      return state;
  }
} 