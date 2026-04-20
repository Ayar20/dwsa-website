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

    // Live Database Registrations
    let registrations = [];

    // Function to render table
    async function renderTables() {
        const fullTable = document.getElementById('full-reg-table');
        if (fullTable) {
            fullTable.innerHTML = '<tbody><tr><td colspan="4" style="text-align: center; padding: 2rem;">Loading live registrations from database...</td></tr></tbody>';
            
            try {
                const response = await fetch('/api/get-registrations');
                const result = await response.json();
                
                if (result.success) {
                    registrations = result.data;
                }
            } catch (error) {
                console.error("Error fetching registrations:", error);
            }
            
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

        // Update dashboard stat
        const statReg = document.getElementById('stat-reg');
        if (statReg) statReg.textContent = registrations.length;
    }

    renderTables();

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
