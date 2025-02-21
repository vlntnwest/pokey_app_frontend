import axios from "axios";

export const GET_USER = "GET_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export const getUser = (email, token) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
        return { success: true };
      })
      .catch((err) => {
        console.log(err);
        return { success: false, error: err };
      });
  };
};

export const editUser = (data, uid, token) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/users/${uid}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: EDIT_USER, payload: res.data.user });
      });
  };
};

export const deleteUser = (uid, token) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: uid });
      });
  };
};
