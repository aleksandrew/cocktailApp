// outsource dependencies

// local dependencies
import { TYPES } from '../constans/types';

const initialState = {
  data: [],
  error: false,
  loading: true,
  category: null,
  uploadedData: [],
  // category: ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other/Unknown', 'Cocoa', 'Shot', 'Coffee / Tea', 'Homemade Liqueur', 'Punch / Party Drink', 'Beer', 'Soft Drink / Soda' ],
};

export const selector = (state) => state.app;

const app = (state = initialState, action) => {
  const { type, ...options } = action;
  switch (action.type) {
      ////////
    case TYPES.DATA:
      return {...state, ...options};

    case TYPES.CALL_SUCCESS:
      console.log(action)
      return {...state, data: [...state.data, ...action.payload]};

    case TYPES.CALL_CATEGORY:
      return {...state, category: [...action.payload]};

    default:
      return state;
  }
};

export default app;
