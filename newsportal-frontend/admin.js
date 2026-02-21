const API_URL = 'http://localhost:5001/api';
let editingArticleId = null;

// Protect route
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token')) window.location.href = 'login.html';
    loadAdminArticles(); 
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

    // Decide if we are POSTing (new) or PUTting (update)
    const method = editingArticleId ? 'PUT' : 'POST';
    const endpoint = editingArticleId ? `/articles/${editingArticleId}` : '/articles';

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: method,
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
            statusAlert.textContent = editingArticleId ? 'Article updated!' : 'Article published!';
            
            
            document.getElementById('article-form').reset();
            editingArticleId = null;
            document.querySelector('.btn-submit').textContent = 'Publish Now';
            
           
            loadAdminArticles();
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

async function loadAdminArticles() {
    const listContainer = document.getElementById('admin-articles-list');
    try {
        const response = await fetch(`${API_URL}/articles`);
        const articles = await response.json();
        
        listContainer.innerHTML = '';
        if (articles.length === 0) {
            listContainer.innerHTML = '<p>No articles found.</p>';
            return;
        }

        articles.forEach(article => {
            const item = document.createElement('div');
            item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--border-color); border-radius: 6px;';
            item.innerHTML = `
                <div>
                    <strong>${article.title}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${new Date(article.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                    <button onclick="editArticle(${article.id}, '${article.title.replace(/'/g, "\\'")}', ${article.categoryId}, '${article.imageUrl || ''}', '${article.content.replace(/'/g, "\\'").replace(/\n/g, "\\n")}')" style="background: #eab308; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Edit</button>
                    <button onclick="deleteArticle(${article.id})" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button>
                </div>
            `;
            listContainer.appendChild(item);
        });
    } catch (error) {
        listContainer.innerHTML = '<p style="color: red;">Failed to load articles.</p>';
    }
}


window.editArticle = function(id, title, categoryId, imageUrl, content) {
    editingArticleId = id;
    document.getElementById('title').value = title;
    document.getElementById('categoryId').value = categoryId;
    document.getElementById('imageUrl').value = imageUrl;
    document.getElementById('content').value = content;
    
    document.querySelector('.btn-submit').textContent = 'Update Article';
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
};

// Delete an article
window.deleteArticle = async function(id) {
    if (!confirm('Are you sure you want to delete this article?')) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/articles/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            alert('Article deleted.');
            loadAdminArticles(); 
        } else {
            alert('Failed to delete article.');
        }
    } catch (error) {
        alert('Server error.');
    }
};