let papers = {};
let currentField = null;

// Load papers from JSON
fetch('papers.json')
  .then(res => res.json())
  .then(data => papers = data)
  .catch(err => console.error('Error loading papers:', err));

function selectField(field) {
  currentField = field;
  renderPapers();
}

function renderPapers() {
  const container = document.getElementById('paperContainer');
  container.innerHTML = '';
  if (!currentField || !papers[currentField]) return;

  const query = document.getElementById('search').value.toLowerCase();

  papers[currentField]
    .filter(p => p.title.toLowerCase().includes(query) || p.keywords.join().toLowerCase().includes(query))
    .forEach(paper => {
      const div = document.createElement('div');
      div.className = 'paper-card';
      div.innerHTML = `<strong>${paper.title}</strong><br>
        <small>${paper.author} (${paper.year})</small><br>
        ${paper.keywords.map(k => `<span class='tag'>${k}</span>`).join('')}`;
      div.onclick = () => openModal(paper);
      container.appendChild(div);
    });
}

function openModal(p) {
  document.getElementById('modalTitle').innerText = p.title;
  document.getElementById('modalAuthor').innerText = p.author;
  document.getElementById('modalYear').innerText = p.year;
  document.getElementById('modalAbstract').innerText = p.abstract;
  document.getElementById('modalKeywords').innerText = p.keywords.join(', ');
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function login() {
  const name = document.getElementById('username').value;
  if (!name) return alert('Please enter your name');
  localStorage.setItem('studentName', name);
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

if (localStorage.getItem('studentName')) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}
