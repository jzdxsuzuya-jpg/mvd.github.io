window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1200);
});

const data = [
    { id: "548291", name: "Илюшин Павел Ильич", dob: "09.07.2007", status: "Без ограничений", region: "Санкт-Петербург" },
    { id: "774102", name: "Илюшина Елена Олеговна", dob: "04.05.1985", status: "В розыске", region: "Санкт-Петербург" },
    { id: "119384", name: "Илюшин Илья Андреевич", dob: "08.02.1985", status: "Без ограничений", region: "Санат-Петербург" }
];

function render(list) {
    const tbody = document.getElementById("result");
    tbody.innerHTML = "";
    list.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td data-label="ID">${p.id}</td>
                <td data-label="ФИО">${p.name}</td>
                <td data-label="Дата рождения">${p.dob}</td>
                <td data-label="Статус">${p.status}</td>
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
