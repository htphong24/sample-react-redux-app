import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export const loadAuthorsSuccess = (authors) => {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
};

export const loadAuthors = () => {
  return async (dispatch) => {
    dispatch(beginApiCall());
    try {
      let authors = await authorApi.getAuthors();
      return dispatch(loadAuthorsSuccess(authors));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
};
