export function setTag(string) {
  return {
    type: 'SET_TAG',
    payload: string
  }
}

export function setSearchClicked(bool) {
  return {
    type: "SET_SERACH_CLICKED",
    payload: bool
  }
}

export function setDataRetrieved(bool) {
  return {
    type: 'SET_DATA_RETRIEVED',
    payload: bool
  }
}

export function setResults(array) {
  return {
      type: 'SET_RESULTS',
      payload: array
  }
}

export function setResponseTime(string) {
  return {
    type: 'SET_RESPONSE_TIME',
    payload: string
  }
}