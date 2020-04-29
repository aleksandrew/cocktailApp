// outsource dependencies

// local dependencies
import { TYPES } from '../constans/types';

const initialState = {
  data: null,
  error: false,
  loading: true,
};

export const selector = (state) => state.filter;

const filter = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.START_LOADING:
      return {...state, loading: true};

    case TYPES.FINISH_LOADING:
      return {...state, loading: false};

    case TYPES.SET_DATA_FILTER:
      return {...state, data: [...action.payload]};

    default:
      return state;
  }
};

export default filter;
