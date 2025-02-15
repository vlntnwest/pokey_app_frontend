import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (email, token) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/private/users/${email}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFEX0htRDhtbWN1ME9WaC1nV2VIayJ9.eyJpc3MiOiJodHRwczovL2Rldi1jcHBkcWhqZjA0M3ZzNGdsLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiI2dE9HUTN1ekhMa1FGYThyRzREaVB0MjdiRGEzZFVaV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtY3BwZHFoamYwNDN2czRnbC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTczOTU2MDk0OCwiZXhwIjoxNzM5NjQ3MzQ4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiI2dE9HUTN1ekhMa1FGYThyRzREaVB0MjdiRGEzZFVaVyJ9.kSpFC9Ase540Xhq5AcNmuwpcZcuEFli-sqwhdqph2Znc2fOVbAlLmHAANU14zk6AZwz_ce1z7BQm1mhhmo6yTdACRlYwu71KAEEpe-u3KwjJPQnhLzlLr07HfitTpWPOF23WJWTO5b3gRJ2VOf-5dBcH3E1JqSzu5oFyvz6LmEuYdaOeNhDvayERcstPKseybgmpnh63lCBhk9eFfxRIBKYZkwtt5Er6ec6E8FYx2Paj9kVng-ZEJDs4A9GWkB4Gv8IrC1cKkla-470dk4pk7JwDugYKll83NB4wha3snusOyssB3Nj8uMlqSsGMFTb_kqxop2H_wyKfI5DfeoD1PA`,
        },
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
