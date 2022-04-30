import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/courses/";

export const getCourses = async () => {
  try {
    let response = await fetch(baseUrl);
    let result = await handleResponse(response);
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const saveCourse = async (course) => {
  try {
    let response = await fetch(baseUrl + (course.id || ""), {
      method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
      headers: { "content-type": "application/json" },
      body: JSON.stringify(course),
    });
    let result = await handleResponse(response);
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCourse = async (courseId) => {
  try {
    let response = await fetch(baseUrl + courseId, { method: "DELETE" });
    let result = await handleResponse(response);
    return result;
  } catch (error) {
    handleError(error);
  }
};
