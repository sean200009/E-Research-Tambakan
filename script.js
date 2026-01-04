// Load papers data
let papersData = {};
fetch('papers.json')
    .then(response => response.json())
    .then(data => papersData = data);

// Student login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('student-name').value.trim();
    if (name) {
        document.getElementById('student-greeting').textContent = name;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('repository').style.display = 'block';
    }
});

// Display papers by field
document.querySelectorAll('.field-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const field = this.dataset.field;
        const papers = papersData[field] || [];
        const list = document.getElementById('papers-list');
        list.innerHTML = `<h3>${field} Studies</h3>`;
        papers.forEach(paper => {
            list.innerHTML += `
                <div class="paper">
                    <h4>${paper.title}</h4>
                    <p><strong>Author:</strong> ${paper.author}</p>
                    <p><strong>Year:</strong> ${paper.year}</p>
                    <p><strong>Abstract:</strong> ${paper.abstract}</p>
                    <p><strong>Keywords:</strong> ${paper.keywords.join(', ')}</p>
                </div>
            `;
        });
    });
});

// Admin: Display papers
function loadAdminPapers() {
    const list = document.getElementById('admin-papers-list');
    list.innerHTML = '';
    Object.keys(papersData).forEach(field => {
        papersData[field].forEach(paper => {
            list.innerHTML += `
                <div class="paper">
                    <h4>${paper.title} (${field})</h4>
                    <p>Author: ${paper.author} | Year: ${paper.year}</p>
                    <button onclick="deletePaper('${field}', '${paper.title}')">Delete</button>
                </div>
            `;
        });
    });
}

// Admin: Add new paper
document.getElementById('add-paper-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const field = document.getElementById('field').value;
    const newPaper = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: parseInt(document.getElementById('year').value),
        abstract: document.getElementById('abstract').value,
        keywords: document.getElementById('keywords').value.split(',').map(k => k.trim())
    };
    papersData[field].push(newPaper);
    loadAdminPapers();
    this.reset();
});

// Admin: Delete paper (basic, no persistence)
function deletePaper(field, title) {
    papersData[field] = papersData[field].filter(p => p.title !== title);
    loadAdminPapers();
}

// Load admin papers on page load
if (window.location.pathname.includes('admin.html')) {
    loadAdminPapers();
}
