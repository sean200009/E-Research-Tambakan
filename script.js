let papers = JSON.parse(localStorage.getItem("papers"));

document.getElementById("loginBtn").onclick = () => {
  if (studentName.value.trim()) {
    loginSection.classList.add("hidden");
    mainSection.classList.remove("hidden");
    renderPapers();
  }
};

function renderPapers(category=null){
  papersContainer.innerHTML="";
  const data = category ? {[category]:papers[category]} : papers;

  for(const cat in data){
    const h=document.createElement("h3");
    h.textContent=cat;
    papersContainer.appendChild(h);

    data[cat].forEach(p=>{
      const card=document.createElement("div");
      card.className="paper-card";
      card.innerHTML=`
        <h4>${p.title}</h4>
        <p><strong>${p.author}</strong> (${p.year})</p>
        <button class="view-btn">View Full Study</button>
      `;
      papersContainer.appendChild(card);

      card.querySelector(".view-btn").onclick=()=>{
        modalTitle.textContent=p.title;
        modalAuthor.textContent=p.author;
        modalYear.textContent=p.year;
        modalAbstract.textContent=p.abstract;
        modalKeywords.textContent=p.keywords.join(", ");
        modal.classList.remove("hidden");
      };
    });
  }
}

closeModal.onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden");};

/* DARK MODE */
darkModeToggle.onchange=()=>{
  document.body.classList.toggle("dark-mode");
  modeIndicator.textContent=document.body.classList.contains("dark-mode")
    ?"Dark Mode":"Light Mode";
};
