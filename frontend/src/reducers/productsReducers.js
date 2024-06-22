const initialState = [];

const productsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payload;
    default:
       return state 
  }
};


export default productsReducers;
