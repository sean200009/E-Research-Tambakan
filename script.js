let repository = JSON.parse(localStorage.getItem('papers')) || {};

// Initialize and Stats
function updateStats() {
    const statsDiv = document.getElementById('stats');
    if (!statsDiv) return;
    let total = 0;
    let html = '';
    for (let cat in repository) {
        let count = repository[cat].length;
        total += count;
        html += `<span><strong>${cat}:</strong> ${count}</span>`;
    }
    statsDiv.innerHTML = `<span><strong>Total:</strong> ${total}</span> | ` + html;
}

function renderPapers(filter = 'ALL', searchTerm = '') {
    const container = document.getElementById('paper-container');
    const adminList = document.getElementById('admin-list');
    if (!container && !adminList) return;

    if (container) container.innerHTML = '';
    if (adminList) adminList.innerHTML = '';

    for (const cat in repository) {
        repository[cat].forEach((paper, index) => {
            const matchesFilter = filter === 'ALL' || filter === cat;
            const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                paper.abstract.toLowerCase().includes(searchTerm.toLowerCase());

            if (matchesFilter && matchesSearch) {
                if (container) {
                    container.innerHTML += `
                        <div class="paper-card">
                            <h3>${paper.title}</h3>
                            <p><strong>${paper.author}</strong> • ${paper.year}</p>
                            <p>${paper.abstract}</p>
                            <div class="tags">${cat}</div>
                        </div>`;
                }
                if (adminList) {
                    adminList.innerHTML += `
                        <div class="paper-card">
                            <strong>${paper.title}</strong>
                            <button class="delete-btn" onclick="deletePaper('${cat}', ${index})">Delete</button>
                        </div>`;
                }
            }
        });
    }
    updateStats();
}

function searchPapers() {
    const term = document.getElementById('search-input').value;
    renderPapers('ALL', term);
}

function deletePaper(cat, index) {
    if (confirm('Delete this research?')) {
        repository[cat].splice(index, 1);
        localStorage.setItem('papers', JSON.stringify(repository));
        renderPapers();
    }
}

function toggleDarkMode() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('theme-btn').innerText = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
}

// Form Handling
const form = document.getElementById('add-paper-form');
if (form) {
    form.onsubmit = (e) => {
        e.preventDefault();
        const cat = document.getElementById('category').value;
        const newPaper = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            year: document.getElementById('year').value,
            abstract: document.getElementById('abstract').value
        };
        if (!repository[cat]) repository[cat] = [];
        repository[cat].push(newPaper);
        localStorage.setItem('papers', JSON.stringify(repository));
        alert('Research Added!');
        renderPapers();
        form.reset();
    };
}

// Initial Load
window.onload = () => {
    if (Object.keys(repository).length === 0) {
        fetch('papers.json').then(r => r.json()).then(data => {
            repository = data;
            localStorage.setItem('papers', JSON.stringify(data));
            renderPapers();
        });
    } else {
        renderPapers();
    }
};
