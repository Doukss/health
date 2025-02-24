import { fetchData } from "./api.js";

export async function getDoctors() {
  return await fetchData("docteurs");
}
