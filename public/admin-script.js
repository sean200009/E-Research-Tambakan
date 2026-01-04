const ADMIN_PIN="1234";

const pinBtn=document.getElementById("pinBtn");
const pinInput=document.getElementById("pinInput");
const pinSection=document.getElementById("pinSection");
const adminSection=document.getElementById("adminSection");
const adminPapersContainer=document.getElementById("adminPapersContainer");

let papers={};

fetch("/papers.json")
  .then(res=>res.json())
  .then(data=>papers=data);

pinBtn.onclick=()=>{
  if(pinInput.value===ADMIN_PIN){
    pinSection.classList.add("hidden");
    adminSection.classList.remove("hidden");
    renderAdmin();
  } else alert("Wrong PIN");
};

function renderAdmin(){
  adminPapersContainer.innerHTML="";
  for(const c in papers){
    papers[c].forEach((p,i)=>{
      const card=document.createElement("div");
      card.className="paper-card";
      card.innerHTML=`
        <h4>${p.title}</h4>
        <button>Delete</button>
      `;
      card.querySelector("button").onclick=()=>{
        papers[c].splice(i,1);
        alert("Deleted (local only)");
        renderAdmin();
      };
      adminPapersContainer.appendChild(card);
    });
  }
}
