const getUsers = async () => {
    let response = await fetch('/add');
    if (response.ok) {
      let data = await response.json();
      return data;
    }
}

const buttonAdd = document.querySelector('.dashboard__single-button.discard')
    .addEventListener('click', (e) => {

   });

getUsers()
    .then((data) => {
        const table = document.querySelector('.table');
        const tableRow = document.createElement('div');
        tableRow.classList.add('table__row')
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 8; i++) {
                const cell = document.createElement('span');
                cell.textContent = data[j][i];
                tableRow.appendChild(cell);
            }
        }
        table.appendChild(tableRow);
        console.log(data);
    })