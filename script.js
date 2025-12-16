// =======================
// 1️⃣ Пользователи и проверка
// =======================
// текущий пользователь
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// пользователи системы
let users = JSON.parse(localStorage.getItem("users")) || [
    { login: "admin", password: "1234", role: "admin" }
];

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function handleRegister() {
    const login = document.getElementById("regLogin").value;
    const pass = document.getElementById("regPass").value;

    if (!login || !pass) {
        alert("Введите логин и пароль");
        return;
    }

    if (users.find(u => u.login === login)) {
        alert("Пользователь уже существует");
        return;
    }

    users.push({
        login,
        password: pass,
        role: "user" // 👈 ВСЕГДА user
    });

    saveUsers();
    alert("Регистрация успешна");
    showLogin();
}

function handleLogin() {
    const login = document.getElementById("loginInput").value;
    const pass = document.getElementById("passInput").value;

    const user = users.find(
        u => u.login === login && u.password === pass
    );

    if (!user) {
        alert("Неверный логин или пароль");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUser = user;

    initPanel();
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

function showRegister() {
    document.querySelector(".login-box").style.display = "none";
    document.querySelector(".register-box").style.display = "block";
}

function showLogin() {
    document.querySelector(".register-box").style.display = "none";
    document.querySelector(".login-box").style.display = "block";
}

// =======================
// 2️⃣ База людей
// =======================
const defaultData = [
    { id: "548291", name: "Илюшин Павел Ильич", dob: "09.07.2007", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "774102", name: "Илюшина Елена Олеговна", dob: "04.05.1985", status: "В розыске", region: "Санкт-Петербург" },
    { id: "119384", name: "Илюшин Илья Андреевич", dob: "08.02.1985", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "223344", name: "Иванов Сергей Владимирович", dob: "02.11.1989", status: "Без ограничений", region: "Москва" },
    { id: "223345", name: "Антончиков Вячеслав Дмитриевич", dob: "04.10.1984", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "223346", name: "Антончикова Варвара Вячеславовна", dob: "19.01.2010", status: "Без ограничений", region: "Санкт-Петербург" }
];

if (!localStorage.getItem("people")) localStorage.setItem("people", JSON.stringify(defaultData));
let data = JSON.parse(localStorage.getItem("people"));

const statuses = ["Без ограничений","Проверен","В розыске","Под наблюдением","Задержан"];

function save() { localStorage.setItem("people", JSON.stringify(data)); }

// =======================
// 3️⃣ Рендер таблицы
// =======================
function render(list) {
    const tbody = document.getElementById("result");
    tbody.innerHTML = "";

    list.forEach(p => {
        const isAdmin = currentUser && currentUser.role === "admin";

        const statusCell = isAdmin
            ? `<select onchange="changeStatus('${p.id}', this.value)">
                ${statuses.map(s =>
                    <option value="${s}" ${s === p.status ? "selected" : ""}>${s}</option>
                ).join("")}
               </select>`
            : <span>${p.status}</span>;

        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.dob}</td>
                <td>${statusCell}</td>
                <td>${p.region}</td>
            </tr>
        `;
    });
}

// =======================
// 4️⃣ Поиск
// =======================
function search() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = data.filter(p => p.name.toLowerCase().includes(q) || p.id.includes(q));
    render(filtered);
}

// =======================
// 5️⃣ Изменение статуса
// =======================
function changeStatus(id, newStatus) {
    if (!currentUser || currentUser.role !== "admin") return;

    const person = data.find(p => p.id === id);
    if (!person) return;

    person.status = newStatus;
    save();
}

// =======================
// 6️⃣ Инициализация панели
// =======================
function initPanel() {
    if (!currentUser) return;

    document.getElementById("auth").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";

    render(data);
}

// =======================
// 7️⃣ Проверка при загрузке
// =======================
if (currentUser) {
    initPanel();
}
