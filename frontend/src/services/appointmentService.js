import { fetchData } from "./api.js";

export async function getAppointments() {
  return await fetchData("rendez-vous");
}
