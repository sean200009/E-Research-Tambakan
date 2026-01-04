let papers = {};
let currentField = null;

// Function to load latest papers.json
async function loadPapers() {
  try {
    // Force browser to fetch fresh copy using cache-busting query
    const response = await fetch(`papers.json?t=${Date.now()}`);
    papers = await response.json();
    // Re-render papers if a field is already selected
    if (currentField) renderPapers();
  } catch (err) {
    console.error("Failed to load papers.json", err);
  }
}

// Call loadPapers at startup
loadPapers();

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

// Auto-login if already stored
if (localStorage.getItem('studentName')) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

// Register service worker for offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(err => console.log('Service Worker Failed', err));
}
