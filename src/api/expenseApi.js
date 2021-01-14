import axios from "axios";

const baseUrl = "/expenses";

export function getAll() {
  return axios
    .get(baseUrl)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function getSingle(id) {
  return axios
    .get(`${baseUrl}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function create(data) {
  return axios
    .post(baseUrl, data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function update(data) {
  return axios
    .put(`${baseUrl}/${data.id}`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function remove(id) {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}
