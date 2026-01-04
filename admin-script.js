const ADMIN_PIN="1234";

pinBtn.onclick=()=>{
  if(pinInput.value===ADMIN_PIN){
    pinSection.classList.add("hidden");
    adminSection.classList.remove("hidden");
    renderAdminPapers();
  }else{
    alert("Incorrect PIN");
  }
};

function renderAdminPapers(){
  adminPapersContainer.innerHTML="";
  for(const cat in papers){
    papers[cat].forEach((p,i)=>{
      const card=document.createElement("div");
      card.className="paper-card";
      card.innerHTML=`
        <h4>${p.title}</h4>
        <button class="delete-btn">Delete</button>
      `;
      adminPapersContainer.appendChild(card);

      card.querySelector(".delete-btn").onclick=()=>{
        if(confirm("Delete this study?")){
          papers[cat].splice(i,1);
          localStorage.setItem("papers",JSON.stringify(papers));
          renderAdminPapers();
        }
      };
    });
  }
}
