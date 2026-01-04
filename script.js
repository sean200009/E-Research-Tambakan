let studentName='';
let papers={};
const categories=["MCS","RIM","LS","PS","STEMIE"];

// Load papers
fetch('papers.json').then(res=>res.json()).then(data=>papers=data);

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

// Render Papers with View Full Study
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
        <button class="view-btn">View Full Study</button>`;
      container.appendChild(div);

      // View Full Study
      div.querySelector('.view-btn').addEventListener('click',()=>{
        document.getElementById('modalTitle').textContent=p.title;
        document.getElementById('modalAuthor').textContent=p.author;
        document.getElementById('modalYear').textContent=p.year;
        document.getElementById('modalAbstract').textContent=p.abstract;
        document.getElementById('modalKeywords').textContent=p.keywords.join(', ');
        document.getElementById('modal').classList.remove('hidden');
      });
    });
  }
}

// Modal close
document.getElementById('closeModal').addEventListener('click',()=>{
  document.getElementById('modal').classList.add('hidden');
});
document.getElementById('modal').addEventListener('click',e=>{
  if(e.target.id==='modal') e.target.classList.add('hidden');
});

// Dark/Light Mode Indicator
const modeIndicator=document.getElementById('modeIndicator');
const darkToggle=document.getElementById('darkModeToggle');
darkToggle.addEventListener('change',()=>{
  document.body.classList.toggle('dark-mode');
  modeIndicator.textContent=document.body.classList.contains('dark-mode')?'Dark Mode':'Light Mode';
});
