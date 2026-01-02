/* ================= THEME ================= */
const toggle = document.getElementById("themetoggle");
const body = document.body;

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") body.classList.add("dark");

/* ================= AUTH ELEMENTS ================= */
const overlay = document.getElementById("authOverlay");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");

const loginMsg = document.getElementById("loginMsg");
const registerMsg = document.getElementById("registerMsg");
const forgotMsg = document.getElementById("forgotMsg");

const projectsGrid = document.querySelector(".projects-grid");

/* ================= FORM SWITCH ================= */
function showForm(formId) {
  loginForm.classList.remove("active");
  registerForm.classList.remove("active");
  forgotForm.classList.remove("active");
  document.getElementById(formId).classList.add("active");
  overlay.style.display = "flex";
}

document.querySelectorAll("[data-switch]").forEach((link) => {
  link.addEventListener("click", () => showForm(link.dataset.switch + "Form"));
});

/* ================= PASSWORD SHOW / HIDE ================= */
document.querySelectorAll(".pass-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    const cursorPos = input.selectionStart;
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈";
    } else {
      input.type = "password";
      btn.textContent = "👁";
    }
    input.focus();
    input.setSelectionRange(cursorPos, cursorPos);
  });
});

/* ================= REGISTER ================= */
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    name: document.getElementById("regName").value.trim(),
    email: document.getElementById("regEmail").value.trim(),
    password: document.getElementById("regPassword").value,
  };
  if (!user.email || !user.password) {
    registerMsg.textContent = "All fields are required";
    registerMsg.className = "auth-msg error";
    return;
  }
  localStorage.setItem("user", JSON.stringify(user));
  registerMsg.textContent = "Registration successful! Redirecting to login…";
  registerMsg.className = "auth-msg success";
  setTimeout(() => showForm("loginForm"), 1200);
});

/* ================= LOGIN ================= */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    loginMsg.textContent = "No account found. Please register.";
    loginMsg.className = "auth-msg error";
    return;
  }

  if (email !== savedUser.email || password !== savedUser.password) {
    loginMsg.textContent = "Incorrect email or password";
    loginMsg.className = "auth-msg error";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  loginMsg.textContent = "Login successful!";
  loginMsg.className = "auth-msg success";

  updateAuthUI(); // ✅ Show logout immediately
  setTimeout(() => (overlay.style.display = "none"), 600);
});

/* ================= FORGOT PASSWORD ================= */
forgotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  forgotMsg.textContent = "Password reset link sent to your email (demo mode).";
  forgotMsg.className = "auth-msg success";
});

/* ================= PROTECT PROJECTS ================= */
const isLoggedIn = localStorage.getItem("loggedIn") === "true";
if (!isLoggedIn) projectsGrid.classList.add("hidden");

/* ================= LOGOUT ================= */
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

function updateAuthUI() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (loggedIn) {
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    projectsGrid.classList.remove("hidden");
  } else {
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    projectsGrid.classList.add("hidden");
  }
}

loginBtn.addEventListener("click", () => showForm("loginForm"));
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  updateAuthUI();
  showForm("loginForm");
});

/* ================= ON PAGE LOAD ================= */
updateAuthUI();
