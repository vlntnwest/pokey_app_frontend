import axios from "axios";

export const GET_USER = "GET_USER";

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
      })
      .catch((err) => console.log(err));
  };
};
