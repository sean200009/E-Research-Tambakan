let papers={};
const categories=["MCS","RIM","LS","PS","STEMIE"];

// Load papers
fetch('papers.json').then(res=>res.json()).then(data=>{
  papers=data;
  renderAdminPapers();
});

// Admin login
document.getElementById('adminLoginBtn').addEventListener('click',()=>{
  const name=document.getElementById('adminName').value.trim();
  if(name){
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-section').classList.remove('hidden');
  }
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
    renderAdminP
