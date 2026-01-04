const ADMIN_USER = "admin";
const ADMIN_PASS = "tambakan123";

// DOM Elements
const studentName = document.getElementById("studentName");
const studentLoginDivElement = document.getElementById("studentLogin");
const studentApp = document.getElementById("studentApp");
const welcomeStudent = document.getElementById("welcomeStudent");
const adminUser = document.getElementById("adminUser");
const adminPass = document.getElementById("adminPass");
const adminLoginDiv = document.getElementById("adminLogin");
const papersDiv = document.getElementById("papers");

let papers = JSON.parse(localStorage.getItem("papers")) || {};

// Load papers.json if localStorage empty
if (!localStorage.getItem("papers")) {
  fetch('papers.json')
    .then(res => res.json())
    .then(data => {
      papers = data;
      localStorage.setItem('papers', JSON.stringify(papers));
    });
} else {
  papers = JSON.parse(localStorage.getItem("papers"));
}

// STUDENT LOGIN
function studentLogin() {
  const name = studentName.value.trim();
  if (!name) return alert("Enter your name");
  studentLoginDiv(false);
  studentApp.classList.remove("hidden");
  welcomeStudent.innerText = `Welcome, ${name}!`;
  displayAllPapers();
}

function studentLoginDiv(show) {
  studentLoginDivElement.classList.toggle("hidden", !show);
}

// ADMIN LOGIN
function adminLogin() {
  if (adminUser.value === ADMIN_USER && adminPass.value === ADMIN_PASS) {
    adminLoginDiv.classList.add("hidden");
    alert("Admin access granted. Use console or UI to add studies.");
  } else {
    alert("Wrong credentials");
  }
}

function showAdminLogin() {
  studentLoginDiv(false);
  adminLoginDiv.classList.remove("hidden");
}

function backToStudent() {
  adminLoginDiv.classList.add("hidden");
  studentLoginDiv(true);
}

// LOGOUT
function logout() {
  location.reload();
}

// DISPLAY ALL PAPERS
function displayAllPapers() {
  const allFields = Object.keys(papers);
  let html = "";
  allFields.forEach(field => {
    if (papers[field].length > 0) {
      html += `<h3>${field}</h3>`;
      papers[field].forEach(p => {
        html += `<div class="paper-card">
                  <strong>${p.title}</strong><br>
                  <small>${p.author} (${p.year})</small><br>
                  <p>${p.abstract}</p>
                  ${p.keywords.map(k => `<span class="tag">${k}</span>`).join("")}
                </div>`;
      });
    }
  });
  papersDiv.innerHTML = html || "No studies yet.";
}

// FILTER BY FIELD
function selectField(field) {
  const div = papers[field].map(p =>
    `<div class="paper-card">
      <strong>${p.title}</strong><br>
      <small>${p.author} (${p.year})</small><br>
      <p>${p.abstract}</p>
      ${p.keywords.map(k => `<span class="tag">${k}</span>`).join("")}
    </div>`
  ).join("");
  papersDiv.innerHTML = div || "No studies yet.";
}

// ADMIN PANEL ADD STUDY
function addStudy(field, title, author, year, abstract, keywords) {
  const study = { title, author, year, abstract, keywords };
  if (!papers[field]) papers[field] = [];
  papers[field].push(study);
  localStorage.setItem("papers", JSON.stringify(papers));
  alert("Study saved!");
}
