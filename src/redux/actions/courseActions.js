import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export const loadCourseSuccess = (courses) => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses,
});

export const createCourseSuccess = (course) => ({
  type: types.CREATE_COURSE_SUCCESS,
  course,
});

export const updateCourseSuccess = (course) => ({
  type: types.UPDATE_COURSE_SUCCESS,
  course,
});

export const deleteCourseOptimistic = (course) => ({
  type: types.DELETE_COURSE_OPTIMISTIC,
  course,
});

export const loadCourses = () => async (dispatch) => {
  dispatch(beginApiCall());
  try {
    let courses = await courseApi.getCourses();
    return dispatch(loadCourseSuccess(courses));
  } catch (error) {
    dispatch(apiCallError(error));
    throw error;
  }
};

//eslint-disable-next-line no-unused-vars
export const saveCourse = (course) => async (dispatch, getState) => {
  dispatch(beginApiCall());
  try {
    let savedCourse = await courseApi.saveCourse(course);
    return course.id
      ? dispatch(updateCourseSuccess(savedCourse))
      : dispatch(createCourseSuccess(savedCourse));
  } catch (error) {
    dispatch(apiCallError(error));
    throw error;
  }
};

export const deleteCourse = (course) => (dispatch) => {
  // Doing optimistic delete, so not dispatching begin/end api call
  // actions, or apiCallError action since we're not showing the loading status for this.
  dispatch(deleteCourseOptimistic(course));
  return courseApi.deleteCourse(course.id);
};
