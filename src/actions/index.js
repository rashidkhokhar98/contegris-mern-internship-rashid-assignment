import { ADD_ARTICLE } from "../constants/action-types";
import { OPEN_FORM } from "../constants/action-types";

export const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
});

export const openForm = showForm => ({
  type: OPEN_FORM,
  payload: showForm
});
