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
        
        for (let j = 0; j < data.length; j++) {
            const tableRow = document.createElement('div');
            tableRow.classList.add('table__row');

            for (let i = 0; i < data[j].length; i++) {
                const cell = document.createElement('span');
                cell.textContent = data[j][i];
                tableRow.appendChild(cell);
            }
            table.appendChild(tableRow);
        }
        console.log(data);
    })
