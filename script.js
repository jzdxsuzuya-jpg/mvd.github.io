const defaultData = [
    { id: "548291", name: "Иванов Сергей Петрович", dob: "12.03.1987", status: "Проверен", region: "Московская обл." },
    { id: "774102", name: "Смирнов Алексей Игоревич", dob: "01.11.1992", status: "В розыске", region: "Санкт-Петербург" },
    { id: "119384", name: "Кузнецов Максим Андреевич", dob: "22.07.2000", status: "Без ограничений", region: "Казань" }
];

let data = JSON.parse(localStorage.getItem("people")) || defaultData;

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1200);
});

const data = [
    { id: "548291", name: "Илюшин Павел Ильич", dob: "09.07.2007", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "774102", name: "Илюшина Елена Олеговна", dob: "04.05.1985", status: "В розыске", region: "Санкт-Петербург" },
    { id: "119384", name: "Илюшин Илья Андреевич", dob: "08.02.1985", status: "Без ограничений", region: "Санкт-Петербург" }
];

const statuses = [
    "Без ограничений",
    "Проверен",
    "В розыске",
    "Под наблюдением",
    "Задержан"
];

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

function search() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = data.filter(p =>
        p.name.toLowerCase().includes(q) || p.id.includes(q)
    );
    render(filtered);
}

render(data);

function changeStatus(index, newStatus) {
    data[index].status = newStatus;
    save();
}

function save() {
    localStorage.setItem("people", JSON.stringify(data));
}

render(data);