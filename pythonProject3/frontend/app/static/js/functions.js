export function fillTable (data) {
    console.log(data);
    const table = document.querySelector('.table__body');
    table.innerHTML = "";
    
    for (let j = 0; j < data.length; j++) {
        const tableRow = document.createElement('div');
        tableRow.classList.add('table__row');

        for (let i = 0; i < Object.keys(data[j]).length; i++) {
            const cell = document.createElement('span');
            const massiv = [data[j].id, data[j].name, data[j].code, data[j].unit, data[j].count, data[j].price_purchase, data[j].price_selling];
            cell.textContent = massiv[i];
            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);
    }
}

