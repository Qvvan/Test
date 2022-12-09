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
        for (let i = 1; i <= 8; i++) {
            const cell = document.createElement('span');
            cell.textContent = data[i - 1][1];
            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);
        console.log(data);
    })