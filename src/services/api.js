// outsource dependencies
import axios from 'axios';

// local dependencies
import { store } from '../store';
import { TYPES } from '../constans/types';


const API_PATH = 'https://www.thecocktaildb.com/api/json/v1/1';

const instance = axios.create({
  baseURL: API_PATH,
  withCredentials: true,
  headers: {
    'api key': '1',
  },
});

export const getData = (param = 'Ordinary_Drink') => {
  return instance({ method: 'post', url: `${API_PATH}/filter.php?c=${param}`})
    .then(response => response.data.drinks)
};

export const getDataList = () => {
  return instance({ method: 'post', url: `${API_PATH}/list.php?c=list`})
    .then(response => response.data.drinks)
};
