import { fetchData } from "./api.js";
const API_BASE_URL = "http://localhost:3000";

export async function getDoctors() {
  return await fetchData("docteurs");
}

export async function addDocteur(docteurData) {
  try {
    const response = await fetch(`${API_BASE_URL}/docteurs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(docteurData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout du docteur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur :", error);
    throw error;
  }
}
