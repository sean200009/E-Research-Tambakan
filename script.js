let studentName = '';
let papers = {};
const categories = ["MCS","RIM","LS","PS","STEMIE"];

// Load papers JSON
fetch('papers.json')
  .then(res=>res.json())
  .then(data=>papers=data)
  .then(()=>renderStats());

// Login
document.getElementById('loginBtn')?.addEventListener('click',()=>{
  const name=document.getElementById('studentName').value.trim();
  if(name){studentName=name;
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');}
});

// Category buttons
document.querySelectorAll('.category-btn').forEach(btn=>{
  btn.addEventListener('click',()=>renderPapers(btn.dataset.category));
});

// Search
document.getElementById('searchInput')?.addEventListener('input',e=>{
  const q=e.target.value.toLowerCase();
  const filtered={};
  categories.forEach(cat=>{
    filtered[cat]=papers[cat].filter(p=>p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.abstract.toLowerCase().includes(q));
  });
  renderPapers(null,filtered);
});

// Render Papers
function renderPapers(category=null,dataset=null){
  const container=document.getElementById('papers-container')||document.getElementById('admin-papers-container');
  container.innerHTML='';
  const data=dataset||(category?{[category]:papers[category]}:papers);
  for(let cat in data){
    if(data[cat].length===0) continue;
    const catTitle=document.createElement('h3'); catTitle.textContent=cat; container.appendChild(catTitle);
    data[cat].forEach((p,i)=>{
      const div=document.createElement('div'); div.className='paper-card';
      div.innerHTML=`<h4>${p.title}</h4>
        <p><strong>Author:</strong> ${p.author}</p>
        <p><strong>Year:</strong> ${p.year}</p>
        <p>${p.abstract}</p>
        <p><strong>Keywords:</strong> ${p.keywords.join(', ')}</p>`;
      if(container.id==='admin-papers-container'){
        const btn=document.createElement('button'); btn.textContent='Delete'; btn.className='delete-btn';
        btn.addEventListener('click',()=>deletePaper(cat,i));
        div.appendChild(btn);
      }
      container.appendChild(div);
    });
  }
}

// Delete Paper
function deletePaper(cat,index){
  if(confirm('Are you sure you want to delete this paper?')){
    papers[cat].splice(index,1);
    renderPapers(null,papers);
    renderStats();
  }
}

// Render Stats
function renderStats(){
  const statsContainer=document.getElementById('stats')||document.getElementById('admin-stats');
  let html='<h3>Statistics:</h3><ul>';
  categories.forEach(cat=>html+=`<li>${cat}: ${papers[cat].length} papers</li>`);
  html+='</ul>'; statsContainer.innerHTML=html;
}

// Dark Mode
const toggle=document.getElementById('darkModeToggle');
if(toggle) toggle.addEventListener('change',()=>document.body.classList.toggle('dark-mode',toggle.checked));
