// app.js
const API_URL = 'http://localhost:5001/api';

document.addEventListener('DOMContentLoaded', fetchArticles);

async function fetchArticles() {
    const container = document.getElementById('news-container');

    try {
        const response = await fetch(`${API_URL}/articles`);
        if (!response.ok) throw new Error('Failed to fetch');

        const articles = await response.json();
        container.innerHTML = '';

        if (articles.length === 0) {
            container.innerHTML = '<p>No articles published yet.</p>';
            return;
        }

        articles.forEach(article => {
            const date = new Date(article.createdAt).toLocaleDateString();
            const image = article.imageUrl || `https://picsum.photos/seed/${article.id + 20}/600/400`;

            const card = document.createElement('div');
            card.className = 'article-card';
            
            // We wrap the entire card inside an anchor tag passing the ID in the URL
            card.innerHTML = `
                <a href="article.html?id=${article.id}" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; height: 100%;">
                    <img src="${image}" alt="Article Image" class="card-image">
                    <div class="card-content">
                        <span class="category-badge">${article.category.name}</span>
                        <h3 class="card-title">${article.title}</h3>
                        <p class="card-excerpt">${article.content.substring(0, 100)}...</p>
                        <div class="card-footer">
                            <span>By ${article.author.name}</span>
                            <span>${date}</span>
                        </div>
                    </div>
                </a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color: red;">Error loading news. Is the backend running on port 5001?</p>';
    }
}