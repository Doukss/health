import { getCurrentUser } from "../../../stores/auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  displayDocteurInfo();
  const sidebarDeviceButton = document.getElementById("sidebar-device");
  const sidebarClose = document.getElementById("sidebar-close");
  sidebarDeviceButton.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
});

function displayDocteurInfo() {
  const user = getCurrentUser();
  const profileDoc = document.getElementById("profileDoc");
  const nameDoc = document.getElementById("nameDoc");
  const specialiteDoc = document.getElementById("specialiteDoc");
  profileDoc.src = user.avatar;
  nameDoc.textContent = `Dr. ${user.prenom} ${user.nom}`;
  specialiteDoc.textContent = user.specialite;
}

function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("-translate-x-full");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("-translate-x-full");
}
