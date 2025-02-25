import { DELETE_FOOD, EDIT_FOOD, GET_FOODS } from "../actions/food.action";

const initialState = {};

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODS:
      return action.payload;
    case EDIT_FOOD:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_FOOD:
      return {};
    default:
      return state;
  }
}
