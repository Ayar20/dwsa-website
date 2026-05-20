document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-target]');
    const views = document.querySelectorAll('.content-view');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active to clicked link
            e.currentTarget.parentElement.classList.add('active');
            
            // Hide all views
            views.forEach(v => v.classList.remove('active'));
            
            // Show target view
            const targetId = e.currentTarget.getAttribute('data-target');
            document.getElementById(`view-${targetId}`).classList.add('active');
            
            // Update title
            pageTitle.textContent = e.currentTarget.textContent;

            // Load bookshelf inventory when that tab is opened
            if (targetId === 'bookshelf') {
                fetchBooks();
            }
        });
    });

    // Auth & Live Database Registrations
    let registrations = [];
    let authToken = localStorage.getItem('dwsa_admin_token');

    const loginOverlay = document.getElementById('login-overlay');
    const adminContent = document.getElementById('admin-content');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    // Check auth on load
    if (authToken) {
        showDashboard();
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            const submitBtn = loginForm.querySelector('button');
            submitBtn.textContent = 'Verifying...';
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    authToken = result.token;
                    localStorage.setItem('dwsa_admin_token', authToken);
                    showDashboard();
                } else {
                    loginError.style.display = 'block';
                }
            } catch (error) {
                console.error('Login error:', error);
                loginError.textContent = 'Connection error';
                loginError.style.display = 'block';
            } finally {
                submitBtn.textContent = 'Secure Login';
            }
        });
    }

    function showDashboard() {
        if (loginOverlay) loginOverlay.style.display = 'none';
        if (adminContent) adminContent.style.display = 'flex';
        renderTables();
    }

    function logout() {
        localStorage.removeItem('dwsa_admin_token');
        authToken = null;
        if (loginOverlay) loginOverlay.style.display = 'flex';
        if (adminContent) adminContent.style.display = 'none';
    }

    // Function to render table
    async function renderTables() {
        const fullTable = document.getElementById('full-reg-table');
        const recentBody = document.getElementById('registration-table-body');
        
        if (fullTable) fullTable.innerHTML = '<tbody><tr><td colspan="4" style="text-align: center; padding: 2rem;">Loading live registrations...</td></tr></tbody>';
        if (recentBody) recentBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 1rem;">Loading...</td></tr>';
        
        try {
            const response = await fetch('/api/get-registrations', {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            
            if (response.status === 401) {
                logout();
                return;
            }
            
            const result = await response.json();
            if (result.success) {
                registrations = result.data;
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
        }
        
        // Render Full Table
        if (fullTable) {
            if (registrations.length === 0) {
                 fullTable.innerHTML = '<tbody><tr><td colspan="4" style="text-align: center; padding: 2rem;">No registrations found yet.</td></tr></tbody>';
            } else {
                let html = `
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Program Selected</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                registrations.forEach(reg => {
                    html += `
                        <tr>
                            <td>${reg.name}</td>
                            <td>${reg.email}</td>
                            <td><span class="badge program-badge">${reg.program}</span></td>
                            <td>${reg.date}</td>
                        </tr>
                    `;
                });
                html += `</tbody>`;
                fullTable.innerHTML = html;
            }
        }

        // Render Recent Table (Dashboard view)
        if (recentBody) {
             if (registrations.length === 0) {
                 recentBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 1rem;">No registrations found yet.</td></tr>';
             } else {
                 let html = '';
                 const recent = registrations.slice(0, 5); // Just show top 5
                 recent.forEach(reg => {
                     html += `
                         <tr>
                             <td>${reg.name}</td>
                             <td>${reg.email}</td>
                             <td><span class="badge program-badge">${reg.program}</span></td>
                             <td>${reg.date}</td>
                             <td><button class="btn-text">View</button></td>
                         </tr>
                     `;
                 });
                 recentBody.innerHTML = html;
             }
        }

        // Update dashboard stat
        const statReg = document.getElementById('stat-reg');
        if (statReg) statReg.textContent = registrations.length;
    }

    // ── Bookshelf Management ──────────────────────────────────────────────

    async function fetchBooks() {
        const inventoryEl = document.getElementById('book-inventory-list');
        if (inventoryEl) inventoryEl.innerHTML = '<p style="color:#a0aec0;font-size:0.9rem;">Loading books...</p>';

        try {
            const response = await fetch('/api/get-books');
            const result = await response.json();
            renderBookInventory(result.success ? result.data : []);
        } catch (err) {
            console.error('Error fetching books:', err);
            if (inventoryEl) inventoryEl.innerHTML = '<p style="color:#ff4d4d;font-size:0.9rem;">Failed to load inventory.</p>';
        }
    }

    function renderBookInventory(books) {
        const inventoryEl = document.getElementById('book-inventory-list');
        if (!inventoryEl) return;

        if (!books || books.length === 0) {
            inventoryEl.innerHTML = '<p style="color:#a0aec0;font-size:0.9rem;">No books published yet. Use the form above to add your first material.</p>';
            return;
        }

        let html = '<div style="display:flex;flex-direction:column;gap:1rem;">';
        books.forEach(book => {
            let coverUrl = book.cover_image_url;
            if (coverUrl && coverUrl.includes('drive.google.com')) {
                const match = coverUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || coverUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                    coverUrl = `https://drive.google.com/thumbnail?id=${match[1]}&sz=200`;
                }
            }

            html += `
                <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;">
                    <img src="${coverUrl}" alt="${book.title}" style="width:56px;height:72px;object-fit:cover;border-radius:4px;flex-shrink:0;" onerror="this.style.display='none'">
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:600;color:#fff;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${book.title}</div>
                        <div style="color:#c9a84c;font-size:0.82rem;margin-top:2px;">${book.price || 'Free'}</div>
                        <div style="color:#a0aec0;font-size:0.8rem;margin-top:2px;">${book.date}</div>
                    </div>
                    <div style="display:flex;gap:0.5rem;flex-shrink:0;">
                        <a href="${book.download_url}" target="_blank" style="font-size:0.8rem;color:#c9a84c;text-decoration:none;border:1px solid rgba(201,168,76,0.4);padding:4px 10px;border-radius:6px;">Preview</a>
                        <button onclick="deleteBook(${book.id})" style="font-size:0.8rem;background:rgba(255,77,77,0.15);color:#ff4d4d;border:1px solid rgba(255,77,77,0.3);padding:4px 10px;border-radius:6px;cursor:pointer;">Delete</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        inventoryEl.innerHTML = html;
    }

    window.deleteBook = async function(id) {
        if (!confirm('Are you sure you want to remove this book from the bookshelf?')) return;

        try {
            const response = await fetch(`/api/delete-book?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            const result = await response.json();
            if (result.success) {
                fetchBooks();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    // Bookshelf Add Form
    const bookForm = document.getElementById('add-book-form');
    if (bookForm) {
        bookForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const publishBtn = document.getElementById('publish-book-btn');
            const statusEl = document.getElementById('book-form-status');
            publishBtn.textContent = 'Publishing...';
            publishBtn.disabled = true;
            statusEl.style.display = 'none';

            const payload = {
                title: document.getElementById('book-title').value.trim(),
                price: document.getElementById('book-price').value.trim() || 'Free',
                cover_image_url: document.getElementById('book-cover-url').value.trim(),
                download_url: document.getElementById('book-download-url').value.trim(),
                description: document.getElementById('book-description').value.trim()
            };

            try {
                const response = await fetch('/api/add-book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (result.success) {
                    statusEl.textContent = '✅ Book published successfully!';
                    statusEl.style.color = '#48bb78';
                    statusEl.style.display = 'block';
                    bookForm.reset();
                    fetchBooks();
                } else {
                    statusEl.textContent = '❌ Error: ' + result.message;
                    statusEl.style.color = '#ff4d4d';
                    statusEl.style.display = 'block';
                }
            } catch (err) {
                console.error('Publish error:', err);
                statusEl.textContent = '❌ Connection error. Please try again.';
                statusEl.style.color = '#ff4d4d';
                statusEl.style.display = 'block';
            } finally {
                publishBtn.textContent = 'Publish to Bookshelf';
                publishBtn.disabled = false;
            }
        });
    }
});
