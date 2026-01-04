const loginBtn = document.getElementById("loginBtn");
const studentName = document.getElementById("studentName");
const loginSection = document.getElementById("loginSection");
const mainSection = document.getElementById("mainSection");
const papersContainer = document.getElementById("papersContainer");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const darkToggle = document.getElementById("darkModeToggle");
const modeIndicator = document.getElementById("modeIndicator");

let papers = {};

fetch("/papers.json")
  .then(res => res.json())
  .then(data => papers = data);

loginBtn.onclick = () => {
  if(studentName.value.trim()){
    loginSection.classList.add("hidden");
    mainSection.classList.remove("hidden");
    renderPapers();
  }
};

function renderPapers(cat=null){
  papersContainer.innerHTML="";
  const data = cat ? {[cat]:papers[cat]} : papers;

  for(const c in data){
    data[c].forEach(p=>{
      const card=document.createElement("div");
      card.className="paper-card";
      card.innerHTML=`
        <h4>${p.title}</h4>
        <p>${p.author} (${p.year})</p>
        <button>View Study</button>
      `;
      card.querySelector("button").onclick=()=>{
        modal.classList.remove("hidden");
        modal.querySelector("#modalTitle").textContent=p.title;
        modal.querySelector("#modalAuthor").textContent=p.author;
        modal.querySelector("#modalYear").textContent=p.year;
        modal.querySelector("#modalAbstract").textContent=p.abstract;
        modal.querySelector("#modalKeywords").textContent=p.keywords.join(", ");
      };
      papersContainer.appendChild(card);
    });
  }
}

closeModal.onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};

darkToggle.onchange=()=>{
  document.body.classList.toggle("dark-mode");
  modeIndicator.textContent =
    document.body.classList.contains("dark-mode") ? "Dark Mode" : "Light Mode";
};
