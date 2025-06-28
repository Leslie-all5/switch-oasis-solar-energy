document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to view this page.');
    window.location.href = 'login.html';
    return;
  }

  try {
    // Fetch user data
    const res = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch user data');

    const user = await res.json();

    // Update dashboard with user info
    document.getElementById('username').textContent = user.username;
    document.getElementById('email').textContent = user.email;

  } catch (err) {
    console.error(err);
    alert('Session expired. Please log in again.');
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  }
});