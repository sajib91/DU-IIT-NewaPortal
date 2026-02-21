
const API_URL = 'http://localhost:5001/api';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorAlert = document.getElementById('error-alert');
    
    errorAlert.style.display = 'none';

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'admin.html';
        } else {
            errorAlert.textContent = data.message || 'Login failed.';
            errorAlert.style.display = 'block';
        }
    } catch (error) {
        errorAlert.textContent = 'Server error. Ensure backend is running on port 5001.';
        errorAlert.style.display = 'block';
    }
});