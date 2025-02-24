import { fetchData } from "./api.js";
const API_BASE_URL = "http://localhost:3000";

export async function getPatients() {
  return await fetchData("patients");
}

export async function addPatient(patientData) {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout du patient");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur :", error);
    throw error;
  }
}
