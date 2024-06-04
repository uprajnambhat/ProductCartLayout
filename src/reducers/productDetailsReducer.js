const initialState = {
  allProductsDetails: [],
  selectedProducts: [],
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROD_DETAILS":
      return {
        ...state,
        allProductsDetails: action.payload,
      };
    case "UPDATE_SELECTED_PROD_DETAILS":
      return {
        ...state,
        selectedProducts: action.payload,
      };
    default:
      return state;
  }
};
