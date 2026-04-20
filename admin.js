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

    // Bookshelf Add Form
    const bookForm = document.getElementById('add-book-form');
    if (bookForm) {
        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Material successfully added to Bookshelf (Mock Action)');
            bookForm.reset();
        });
    }
});
