// outsource dependencies

// local dependencies
import { TYPES } from '../constans/types';

const initialState = {
  data: null,
  error: false,
  loading: true,
  category: 'Ordinary Drink',
};

export const selector = (state) => state.app;

const app = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.START_LOADING:
      return {...state, loading: true};

    case TYPES.FINISH_LOADING:
      return {...state, loading: false};

    case TYPES.CALL_SUCCESS:
      return {...state, data: [...action.payload]};

    case TYPES.CATEGORY:
      return {...state, category: [...action.category]};

    default:
      return state;
  }
};

export default app;
