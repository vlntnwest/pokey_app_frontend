import axios from "axios";

export const GET_FOODS = "GET_FOODS";
export const EDIT_FOOD = "EDIT_FOOD";
export const DELETE_FOOD = "DELETE_FOOD";

export const getFoods = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/food/`)
      .then((res) => {
        dispatch({ type: GET_FOODS, payload: res.data });
        return { sucess: true };
      })
      .catch((err) => {
        console.log(err);
        return { sucess: false, error: err };
      });
  };
};

export const editFood = (data, id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/food/${id}`, data)
      .then((res) => {
        dispatch({ type: EDIT_FOOD, payload: res.data.food });
      })
      .catch((err) => {
        console.log(err);
        return { sucess: false, error: err };
      });
  };
};

export const deleteFood = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/food/${id}`)
      .then((res) => {
        dispatch({ type: DELETE_FOOD, payload: id });
      })
      .catch((err) => {
        console.log(err);
        return { sucess: false, error: err };
      });
  };
};
