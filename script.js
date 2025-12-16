document.addEventListener("DOMContentLoaded", () => {

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let users = JSON.parse(localStorage.getItem("users")) || [
  { login: "admin", password: "1234", role: "admin" }
];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---------------- AUTH ----------------

window.handleLogin = function () {
  const login = loginInput.value;
  const pass = passInput.value;

  const user = users.find(u => u.login === login && u.password === pass);
  if (!user) return alert("Неверные данные");

  localStorage.setItem("currentUser", JSON.stringify(user));
  currentUser = user;
  initPanel();
};

window.handleRegister = function () {
  const login = regLogin.value;
  const pass = regPass.value;

  if (!login || !pass) return alert("Заполни поля");
  if (users.find(u => u.login === login)) return alert("Уже существует");

  users.push({ login, password: pass, role: "user" });
  saveUsers();
  alert("Создано");
  showLogin();
};

window.logout = function () {
  localStorage.removeItem("currentUser");
  location.reload();
};

window.showRegister = function () {
  document.querySelector(".login-box").style.display = "none";
  document.querySelector(".register-box").style.display = "block";
};

window.showLogin = function () {
  document.querySelector(".register-box").style.display = "none";
  document.querySelector(".login-box").style.display = "block";
};

// ---------------- DATA ----------------

const defaultData = [
  { id:"548291", name:"Илюшин Павел Ильич", dob:"09.07.2007", status:"Без ограничений", region:"Санкт-Петербург", photo:"" },
  { id:"774102", name:"Илюшина Елена Олеговна", dob:"04.05.1985", status:"В розыске", region:"Санкт-Петербург", photo:"" },
  { id:"119384", name:"Илюшин Илья Андреевич", dob:"08.02.1985", status:"Без ограничений", region:"Санкт-Петербург", photo:"" }
];

if (!localStorage.getItem("people")) {
  localStorage.setItem("people", JSON.stringify(defaultData));
}

let data = JSON.parse(localStorage.getItem("people"));

const statuses = [
  "Без ограничений",
  "Проверен",
  "В розыске",
  "Под наблюдением",
  "Задержан"
];

function savePeople() {
  localStorage.setItem("people", JSON.stringify(data));
}

// ---------------- PANEL ----------------

function initPanel() {
  auth.style.display = "none";
  adminPanel.style.display = "block";
  render(data);
}

function render(list) {
  const tbody = document.getElementById("result");
  tbody.innerHTML = "";

  const isAdmin = currentUser && currentUser.role === "admin";

  list.forEach(p => {
    const photoHTML = p.photo
      ? <img src="${p.photo}" alt="Фото" style="width:50px;height:50px;border-radius:4px;">
      : "—";

    const photoAction = isAdmin
      ? <button onclick="changePhoto('${p.id}')">Изменить фото</button>
      : "";

    const statusHTML = isAdmin
      ? `<select onchange="changeStatus('${p.id}', this.value)">
          ${statuses.map(s =>
            <option ${s===p.status ? "selected" : ""}>${s}</option>
          ).join("")}
        </select>`
      : p.status;

    tbody.innerHTML += `
      <tr>
        <td>${photoHTML}${photoAction}</td>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.dob}</td>
        <td>${statusHTML}</td>
        <td>${p.region}</td>
      </tr>
    `;
  });
}

window.changeStatus = function (id, value) {
  if (currentUser.role !== "admin") return;
  const person = data.find(p => p.id === id);
  if (!person) return;
  person.status = value;
  savePeople();
};

  window.changePhoto = function(id) {
  if (currentUser.role !== "admin") return alert("Только для админа");

  const person = data.find(p => p.id === id);
  if (!person) return;

  const url = prompt("Вставьте ссылку на фото:", person.photo || "");
  if (!url) return;

  person.photo = url;
  savePeople();
  render(data);
};
  
window.search = function () {
  const q = searchInput.value.toLowerCase();
  render(data.filter(p =>
    p.name.toLowerCase().includes(q) || p.id.includes(q)
  ));
};

// ---------------- AUTO LOGIN ----------------

if (currentUser) initPanel();

});
