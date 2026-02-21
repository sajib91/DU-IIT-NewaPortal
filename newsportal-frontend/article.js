const API_URL = 'http://localhost:5001/api';

document.addEventListener('DOMContentLoaded', fetchSingleArticle);

async function fetchSingleArticle() {
    const container = document.getElementById('single-article-container');
    
    // Grab the ID from the URL 
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        container.innerHTML = '<p style="color: red;">Article not found.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/articles/${articleId}`);
        if (!response.ok) throw new Error('Failed to fetch');

        const article = await response.json();
        const date = new Date(article.createdAt).toLocaleDateString();
        const image = article.imageUrl || `https://picsum.photos/seed/${article.id + 20}/800/500`;

        // Render the full article
        container.innerHTML = `
            <span class="category-badge" style="margin-bottom: 1rem; display: inline-block;">${article.category.name}</span>
            <h1 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 1rem; line-height: 1.2;">${article.title}</h1>
            <div style="color: var(--text-muted); margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                <strong>By ${article.author.name}</strong> | Published on ${date}
            </div>
            <img src="${image}" alt="Article Cover" style="width: 100%; max-height: 450px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem;">
            <div style="font-size: 1.1rem; line-height: 1.8; color: var(--text-main); white-space: pre-wrap;">
                ${article.content}
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p style="color: red;">Error loading the article.</p>';
        console.error(error);
    }
}