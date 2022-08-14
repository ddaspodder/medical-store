import axios from "axios";

export const getTableData = () =>
  axios({
    method: "GET",
    url: "/data",
    baseURL: "http://localhost:8000",
  });

export const getUnitList = () =>
  axios({
    method: "GET",
    url: "/unit",
    baseURL: "http://localhost:8000",
  });

export const getSubUnitList = () =>
  axios({
    method: "GET",
    url: "/subUnit",
    baseURL: "http://localhost:8000",
  });

export const getTypeList = () =>
  axios({
    method: "GET",
    url: "/types",
    baseURL: "http://localhost:8000",
  });

export const addProduct = (data) =>
  axios({
    method: "POST",
    url: "/data",
    baseURL: "http://localhost:8000",
    data: { ...data },
  });

export const updateProduct = (data, id) =>
  axios({
    method: "PUT",
    url: `/data/${id}`,
    baseURL: "http://localhost:8000",
    data: { ...data },
  });

export const deleteProduct = (id) =>
  axios({
    method: "DELETE",
    url: `/data/${id}`,
    baseURL: "http://localhost:8000",
  });

export const getTableDataSorted = (sort, order) =>
  axios({
    method: "GET",
    url: `/data?_sort=${sort}&_order=${order}`,
    baseURL: "http://localhost:8000",
  });
