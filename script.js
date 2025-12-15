// =======================
// 1️⃣ ДАННЫЕ И LOCALSTORAGE
// =======================
const defaultData = [
    { id: "548291", name: "Илюшин Павел Ильич", dob: "09.07.2007", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "774102", name: "Илюшина Елена Олеговна", dob: "04.05.1985", status: "В розыске", region: "Санкт-Петербург" },
    { id: "119384", name: "Илюшин Илья Андреевич", dob: "08.02.1985", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "223344", name: "Иванов Сергей Владимирович", dob: "02.11.1989", status: "Без ограничений", region: "Ульяновск" },
    { id: "223345", name: "Антончиков Вячеслав Дмитриевич", dob: "04.10.1984", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "223346", name: "Антончикова Варвара Вячеславовна", dob: "19.01.2010", status: "Без ограничений", region: "Санкт-Петербург" }
];

let data = defaultData;
save();

const statuses = [
    "Без ограничений",
    "Проверен",
    "В розыске",
    "Под наблюдением",
    "Задержан"
];

// =======================
// 2️⃣ LOADER
// =======================
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1200);
});

// =======================
// 3️⃣ ФУНКЦИЯ СОХРАНЕНИЯ
// =======================
function save() {
    localStorage.setItem("people", JSON.stringify(data));
}

// =======================
// 4️⃣ РЕНДЕР ТАБЛИЦЫ
// =======================
function render(list) {
    const tbody = document.getElementById("result");
    tbody.innerHTML = "";

    list.forEach((p, index) => {
        const options = statuses.map(s =>
            `<option value="${s}" ${s === p.status ? "selected" : ""}>${s}</option>`
        ).join("");

        tbody.innerHTML += `
            <tr>
                <td data-label="ID">${p.id}</td>
                <td data-label="ФИО">${p.name}</td>
                <td data-label="Дата рождения">${p.dob}</td>
                <td data-label="Статус">
                    <select class="status-select" onchange="changeStatus(${index}, this.value)">
                        ${options}
                    </select>
                </td>
                <td data-label="Регион">${p.region}</td>
            </tr>
        `;
    });
}

// =======================
// 5️⃣ ПОИСК
// =======================
function search() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = data.filter(p =>
        p.name.toLowerCase().includes(q) || p.id.includes(q)
    );
    render(filtered);
}

// =======================
// 6️⃣ ИЗМЕНЕНИЕ СТАТУСА
// =======================
function changeStatus(index, newStatus) {
    data[index].status = newStatus;
    save();
}

// =======================
// 7️⃣ РЕНДЕР ПРИ ЗАГРУЗКЕ
// =======================
render(data);