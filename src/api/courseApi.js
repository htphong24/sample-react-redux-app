import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/courses/";

export async function getCourses() {
  try {
    let response = await fetch(baseUrl);
    let result = await handleResponse(response);
    return result;
  } catch (error) {
    handleError(error);
  }
}

export async function saveCourse(course) {
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
}

export async function deleteCourse(courseId) {
  try {
    let response = await fetch(baseUrl + courseId, { method: "DELETE" });
    let result = await handleResponse(response);
    return result;
  } catch (error) {
    handleError(error);
  }
}
