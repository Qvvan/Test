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
}

document.querySelector('.btn__modal-decision.ok')
    .addEventListener('click', (e) => {
        let name = document.querySelector('.modal-name-input').value;
        let article = document.querySelector('.modal-article-input').value;
        let type = document.querySelector('.select-type-title').innerText;
        let product = document.querySelector('.select-product-title').innerText;
        let count = document.querySelector('.modal-count-input').value;
        let units = document.querySelector('.select-units-title').innerText;
        let reason = document.querySelector('.modal-reason-title').innerText;
        modalContent = {
            'Наименование': name,
            'Артикул': article,
            'Тип': type,
            'Уже существующий товар': product,
            'Количество': count,
            'Единицы': units,
            'Причина списания': reason,
        }
        console.log(modalContent);
        postUsers(modalContent).then(asdaad => console.log(asdaad));
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
