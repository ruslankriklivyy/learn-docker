import axios from 'axios';
import { axiosCatch } from 'src/helpers/axiosCatch';

export const todoApi = {
  fetchTodos() {
    return axiosCatch(axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10'));
  },
};
