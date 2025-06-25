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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);
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
  if (document.getElementById('signUpForm')) {
    handleAuthForm('signUpForm', '/api/auth/register',
                  'Registered! Please log in.', 'login.html');
  }
  if (document.getElementById('loginForm')) {
    handleAuthForm('loginForm', '/api/auth/login',
                  'Welcome!', 'dashboard.html');
  }
});