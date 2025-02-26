import {
  getRendezVousByMonth,
  getRendezVousByPatientId,
  getRendezVousStatsByPatientId,
} from "../../../services/patientService.js";
import { getCurrentUser } from "../../../stores/auth.js";
import { handleNotifications } from "../../../stores/notification.js";

document.addEventListener("DOMContentLoaded", async () => {
  handleNotifications();
  const user = getCurrentUser();
  displayPatientInfo();
  await displayCardInfo();
  const { labels, acceptedData, rejectedData, pendingData } =
    await getRendezVousByMonth(user.id);
  initChart(labels, acceptedData, rejectedData, pendingData);
  const sidebarDeviceButton = document.getElementById("sidebar-device");
  const sidebarClose = document.getElementById("sidebar-close");
  sidebarDeviceButton.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
});

async function displayCardInfo() {
  const user = getCurrentUser();
  const { accepted, rejected, pending } = await getRendezVousStatsByPatientId(
    user.id
  );

  document.getElementById("valideAppointments").textContent = accepted;
  document.getElementById("deleteAppointments").textContent = rejected;
  document.getElementById("pendingAppointments").textContent = pending;
}

export function initChart(labels, acceptedData, rejectedData, pendingData) {
  const ctx = document.getElementById("statutRendezVousChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Rendez-vous acceptés",
          data: acceptedData,
          borderColor: "#10B981", // Couleur verte
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
        },
        {
          label: "Rendez-vous refusés",
          data: rejectedData,
          borderColor: "#EF4444", // Couleur rouge
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          fill: true,
        },
        {
          label: "Rendez-vous en attente",
          data: pendingData,
          borderColor: "#F59E0B", // Couleur orange
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Évolution des rendez-vous par mois",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Mois",
          },
        },
        y: {
          title: {
            display: true,
            text: "Nombre de rendez-vous",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

function displayPatientInfo() {
  const user = getCurrentUser();
  const profileDoc = document.getElementById("profilPatient");
  const nomPatient = document.getElementById("nomPatient");
  const rolePatient = document.getElementById("rolePatient");
  const emailPatient = document.getElementById("emailPatient");
  const adressePatient = document.getElementById("adressePatient");
  const numPatient = document.getElementById("numPatient");
  profileDoc.src = user.avatar;
  nomPatient.textContent = `${user.prenom} ${user.nom}`;
  rolePatient.textContent = user.role;
  emailPatient.textContent = user.email;
  adressePatient.textContent = user.adresse;
  numPatient.textContent = user.telephone;
}

function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("-translate-x-full");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("-translate-x-full");
}
