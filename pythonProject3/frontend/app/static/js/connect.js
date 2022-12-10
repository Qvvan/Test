const getUsers = async () => {
    let response = await fetch('/add');
    if (response.ok) {
      let data = await response.json();
      return data;
    }
}
const postUsers = async (content) => {
    let response = await fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(content)
    });
    let data = await response.json();
    return data;
    // if (response.ok) {
    //   let data = await response.json();
    //   return data;
    // }
}

document.querySelector('.btn__modal-decision.ok')
    .addEventListener('click', (e) => {
        const asd = document.querySelector('.name__block-input').value;
        postUsers(asd).then(asdaad => console.log(asdaad));
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
