import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export async function getAuthors() {
  try {
    let response = await fetch(baseUrl);
    let result = await handleResponse(response);
    return result;
  } catch (error) {
    handleError(error);
  }
}
