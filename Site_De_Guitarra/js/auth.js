// REGISTRO
async function register() {
  const name = document.getElementById("r_name").value;
  const email = document.getElementById("r_email").value;
  const password = document.getElementById("r_senha").value;

  if (!name || !email || !password) {
      alert("Preencha todos os campos!");
      return;
  }

  await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  alert("Utilizador criado com sucesso!");
  window.location.href = "login.html";
}

// LOGIN
async function login() {
  const email = document.getElementById("l_email").value;
  const password = document.getElementById("l_senha").value;

  if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
  }

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.success) {
      // Guarda sessão persistente incluindo nome
      localStorage.setItem("loggedInUser", JSON.stringify({
        email,
        name: data.name,
        role: data.role
      }));
      window.location.href = "area_aluno.html";
  } else {
      alert("Login inválido");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// CHECAGEM DE LOGIN
function checkAuth() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
      alert("Precisas de fazer login para aceder a esta página!");
      window.location.href = "login.html";
  }
  return JSON.parse(user);
}
