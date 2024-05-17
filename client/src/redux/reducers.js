// reducers.js
const initialState = {
  myVariable: 0, // Set an initial value here
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_VARIABLE":
      return { ...state, myVariable: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
