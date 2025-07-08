console.log("script.js is running");

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Nav toggle for mobile
const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('#main-nav ul');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// ✉ Contact form submission
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Contact form script loaded");

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    fetch("https://switch-oasis-backend.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    })
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        console.log("Success:", data);
        alert("Message sent successfully!");
        form.reset();
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Failed to send message.");
      });
  });
}

console.log("All frontend scripts loaded successfully.");
