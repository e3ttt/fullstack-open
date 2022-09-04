import axios from 'axios';

const baseUrl = '/api/people';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then(response => response.data);
};

const peopleService = { getAll, create, remove, update };

export default peopleService;
