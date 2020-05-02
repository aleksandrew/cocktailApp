// outsource dependencies
import axios from 'axios';

// local dependencies


const instance = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

export const getData = (param) => {
  return instance({ method: 'post', url: `/filter.php?c=${param}`})
    .then(response => response.data.drinks)
};

export const getDataList = () => {
  return instance({ method: 'post', url: `/list.php?c=list`})
    .then(response => response.data.drinks)
};
