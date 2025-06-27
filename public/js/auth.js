console.log("auth.js or script.js is running");

const BASE_URL = 'https://switch-oasis-backend.onrender.com';

async function handleAuthForm(formId, endpoint, successMessage, redirectTo) {
  const form = document.getElementById(formId);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    form.querySelector('button').disabled = true;

    const payload = {};
    new FormData(form).forEach((v, k) => payload[k] = v.trim());

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // ✅ Always try to parse JSON — even on failure
      const data = await res.json();

      // ❌ If it's not OK, show the error
      if (!res.ok) throw new Error(data.error || res.statusText);

      // ✅ Store the token (if provided)
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      alert(successMessage);
      window.location.href = redirectTo;

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      form.querySelector('button').disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("Auth form script loaded");

  if (document.getElementById('signUpForm')) {
    handleAuthForm(
      'signUpForm',
      `${BASE_URL}/api/auth/register`,
      'Registered! Please log in.',
      'login.html'
    );
  }

  if (document.getElementById('loginForm')) {
    handleAuthForm(
      'loginForm',
      `${BASE_URL}/api/auth/login`,
      'Welcome!',
      'dashboard.html'
    );
  }
});