// ELEMENT SELECTORS
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const formTitle = document.getElementById("formTitle");
const authBtn = document.getElementById("authBtn");
const authContainer = document.getElementById("authContainer");
const home = document.getElementById("home");
const username = document.getElementById("username");

// Register inputs
const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const regConfirm = document.getElementById("regConfirm");

// Password rules
const rLength = document.getElementById("r-length");
const rUpper = document.getElementById("r-upper");
const rLower = document.getElementById("r-lower");
const rNumber = document.getElementById("r-number");
const rSpecial = document.getElementById("r-special");

// Strength bar
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

// Confirm password message
const matchMsg = document.getElementById("matchMsg");

// Login inputs
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMsg = document.getElementById("loginMsg");

// FORM SWITCHING
document.getElementById("toLogin").onclick = () => {
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
  formTitle.textContent = "Login";
};

document.getElementById("toRegister").onclick = () => {
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
  formTitle.textContent = "Register";
};

// SHOW/HIDE PASSWORD
document.querySelectorAll(".toggle").forEach((btn) => {
  btn.onclick = () => {
    const input = document.getElementById(btn.dataset.target);
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈"; // visible
    } else {
      input.type = "password";
      btn.textContent = "👁️"; // hidden
    }
  };
});

// PASSWORD STRENGTH + RULES
regPassword.oninput = () => {
  const val = regPassword.value;
  let score = 0;

  if (val.length >= 8) {
    rLength.classList.add("valid");
    score++;
  } else {
    rLength.classList.remove("valid");
  }
  if (/[A-Z]/.test(val)) {
    rUpper.classList.add("valid");
    score++;
  } else {
    rUpper.classList.remove("valid");
  }
  if (/[a-z]/.test(val)) {
    rLower.classList.add("valid");
    score++;
  } else {
    rLower.classList.remove("valid");
  }
  if (/\d/.test(val)) {
    rNumber.classList.add("valid");
    score++;
  } else {
    rNumber.classList.remove("valid");
  }
  if (/[^A-Za-z0-9]/.test(val)) {
    rSpecial.classList.add("valid");
    score++;
  } else {
    rSpecial.classList.remove("valid");
  }

  strengthFill.className = "";
  if (score <= 2) {
    strengthFill.style.width = "33%";
    strengthFill.classList.add("weak");
    strengthText.textContent = "Weak password";
  } else if (score <= 4) {
    strengthFill.style.width = "66%";
    strengthFill.classList.add("medium");
    strengthText.textContent = "Medium password";
  } else {
    strengthFill.style.width = "100%";
    strengthFill.classList.add("strong");
    strengthText.textContent = "Strong password";
  }

  checkMatch(); // Update confirm password match dynamically
};

// CONFIRM PASSWORD MATCH
function checkMatch() {
  if (!regConfirm.value) return;
  if (regPassword.value === regConfirm.value) {
    matchMsg.textContent = "Passwords match ✔";
    matchMsg.className = "success";
  } else {
    matchMsg.textContent = "Passwords do not match ✖";
    matchMsg.className = "error";
  }
}

regPassword.onkeyup = checkMatch;
regConfirm.onkeyup = checkMatch;

// REGISTER SUBMIT
registerForm.onsubmit = (e) => {
  e.preventDefault();
  if (regPassword.value !== regConfirm.value) return;

  const user = {
    name: regName.value,
    email: regEmail.value,
    password: regPassword.value,
  };

  localStorage.setItem("authUser", JSON.stringify(user));
  document.getElementById("toLogin").click();
};

// LOGIN SUBMIT

loginForm.onsubmit = (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("authUser"));

  if (
    !user ||
    user.email !== loginEmail.value ||
    user.password !== loginPassword.value
  ) {
    loginMsg.textContent = "Invalid email or password";
    return;
  }

  showLoggedIn(user.name);
};

// LOGOUT BUTTON
authBtn.onclick = () => {
  localStorage.removeItem("authUser");
  location.reload();
};

// AUTO LOGIN
const savedUser = JSON.parse(localStorage.getItem("authUser"));
if (savedUser) showLoggedIn(savedUser.name);

// SHOW DASHBOARD
function showLoggedIn(name) {
  authBtn.textContent = "Logout";
  authContainer.style.display = "none";
  home.style.display = "block";
  username.textContent = name;
}
