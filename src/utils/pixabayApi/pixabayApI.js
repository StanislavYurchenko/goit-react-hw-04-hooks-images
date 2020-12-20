import axios from 'axios';
import { toast } from 'react-toastify';

//  ключ Никиты, с его ключем прилетают уникальные ответы, очень странно...
// const API_KEY = "3616495-8ef67a89dfdb2c2d531583fa2";

const API_KEY = '18376090-d7378f6abd5315284a04e80ad';
const BASE_URL = 'https://pixabay.com/api';
axios.defaults.baseURL = BASE_URL;

function pixabayApiRequest(
  userQuery = '',
  page = 1,
  per_page = 12,
  image_type = 'photo',
  orientation = 'horizontal',
) {
  const request = `/?key=${API_KEY}&q=${userQuery}&page=${page}&per_page=${per_page}&image_type=${image_type}&orientation=${orientation}`;

  return axios(request)
    .then(({ data }) => data.hits)
    .catch(error => toast(error.massage));
}

export default pixabayApiRequest;
