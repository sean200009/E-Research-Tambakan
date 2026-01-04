let papers={};
const categories=["MCS","RIM","LS","PS","STEMIE"];

// Load papers from JSON
fetch('papers.json').then(res=>res.json()).then(data=>{
  papers=data;
  renderAdminPapers(); // Always render admin section
});

// Add new study
document.getElementById('addStudyBtn').addEventListener('click',()=>{
  const title=document.getElementById('newTitle').value.trim();
  const author=document.getElementById('newAuthor').value.trim();
  const year=parseInt(document.getElementById('newYear').value);
  const abstract=document.getElementById('newAbstract').value.trim();
  const keywords=document.getElementById('newKeywords').value.split(',').map(k=>k.trim());
  const category=document.getElementById('newCategory').value;

  if(title && author && year && abstract && keywords.length>0 && category){
    const newStudy={title,author,year,abstract,keywords};
    if(!papers[category]) papers[category]=[];
    papers[category].push(newStudy);
    renderAdminPapers();
    document.getElementById('newTitle').value='';
    document.getElementById('newAuthor').value='';
    document.getElementById('newYear').value='';
    document.getElementById('newAbstract').value='';
    document.getElementById('newKeywords').value='';
    alert('Study added!');
  } else {
    alert('Please fill all fields.');
  }
});

// Render admin papers with delete button
function renderAdminPapers(){
  const container=document.getElementById('admin-papers-container');
  container.innerHTML='';
  for(let cat in papers){
    if(papers[cat].length===0) continue;
    const catTitle=document.createElement('h3'); catTitle.textContent=cat; container.appendChild(catTitle);
    papers[cat].forEach((p,i)=>{
      const div=document.createElement('div'); div.className='paper-card';
      div.innerHTML=`<h4>${p.title}</h4>
        <p><strong>Author:</strong> ${p.author}</p>
        <p><strong>Year:</strong> ${p.year}</p>
        <p><strong>Keywords:</strong> ${p.keywords.join(', ')}</p>
        <button class="delete-btn">Delete</button>`;
      container.appendChild(div);

      div.querySelector('.delete-btn').addEventListener('click',()=>{
        if(confirm(`Delete "${p.title}"?`)){
          papers[cat].splice(i,1);
          renderAdminPapers();
        }
      });
    });
  }
}

// Dark/Light Mode
const modeIndicator=document.getElementById('modeIndicator');
const darkToggle=document.getElementById('darkModeToggle');
darkToggle.addEventListener('change',()=>{
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    modeIndicator.textContent='Dark Mode';
    modeIndicator.classList.remove('light');
    modeIndicator.classList.add('dark');
  } else {
    modeIndicator.textContent='Light Mode';
    modeIndicator.classList.remove('dark');
    modeIndicator.classList.add('light');
  }
});
