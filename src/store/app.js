// outsource dependencies

// local dependencies
import { TYPES } from '../constans/types';

const initialState = {
  data: [],
  error: false,
  loading: true,
  category: null,
  // category: ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other/Unknown', 'Cocoa', 'Shot', 'Coffee / Tea', 'Homemade Liqueur', 'Punch / Party Drink', 'Beer', 'Soft Drink / Soda' ],
};

export const selector = (state) => state.app;

const app = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.START_LOADING:
      return {...state, loading: true};

    case TYPES.FINISH_LOADING:
      return {...state, loading: false};

    case TYPES.CALL_SUCCESS:
      return {...state, data: [...state.data, ...action.payload]};

    case TYPES.CALL_CATEGORY:
      return {...state, category: [...action.payload]};

    default:
      return state;
  }
};

export default app;
