const data = [
    { id: "548291", name: "Иванов Сергей Петрович", dob: "12.03.1987", status: "Проверен", region: "Московская обл." },
    { id: "774102", name: "Смирнов Алексей Игоревич", dob: "01.11.1992", status: "В розыске", region: "Санкт-Петербург" },
    { id: "119384", name: "Кузнецов Максим Андреевич", dob: "22.07.2000", status: "Без ограничений", region: "Казань" }
];

function render(list) {
    const tbody = document.getElementById("result");
    tbody.innerHTML = "";
    list.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.dob}</td>
                <td>${p.status}</td>
                <td>${p.region}</td>
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
