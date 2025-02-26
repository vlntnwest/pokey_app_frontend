import { DELETE_FOOD, EDIT_FOOD, GET_FOODS } from "../actions/food.action";

const initialState = {};

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODS:
      return action.payload;
    case EDIT_FOOD:
      return state.map((food) =>
        food._id === action.payload._id
          ? {
              ...food,
              allergens: action.payload.allergens,
            }
          : food
      );
    case DELETE_FOOD:
      return state.filter((food) => food.id !== action.payload);
    default:
      return state;
  }
}
