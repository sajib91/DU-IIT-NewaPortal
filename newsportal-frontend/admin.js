// admin.js
const API_URL = 'http://localhost:5001/api';

// Protect route
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token')) window.location.href = 'login.html';
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

// Submit Article
document.getElementById('article-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const categoryId = document.getElementById('categoryId').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const content = document.getElementById('content').value;
    
    const statusAlert = document.getElementById('status-alert');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                title, content, 
                categoryId: parseInt(categoryId), 
                imageUrl: imageUrl || null 
            })
        });

        const data = await response.json();
        statusAlert.style.display = 'block';

        if (response.ok) {
            statusAlert.className = 'alert alert-success';
            statusAlert.textContent = 'Article published successfully!';
            document.getElementById('article-form').reset();
        } else {
            statusAlert.className = 'alert alert-error';
            statusAlert.textContent = data.errors ? data.errors.map(e => e.msg).join(', ') : data.message;
        }
    } catch (error) {
        statusAlert.className = 'alert alert-error';
        statusAlert.textContent = 'Server error.';
        statusAlert.style.display = 'block';
    }
});