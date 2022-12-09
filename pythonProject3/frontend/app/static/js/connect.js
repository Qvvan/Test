const getUsers = async () => {
    let response = await fetch('/add');
    if (response.ok) {
      let data = await response.json();
      return data;
    }
}

const buttonAdd = document.querySelector('.dashboard__single-button.add')
    .addEventListener('click', (e) => {

   });
const buttonEdit = document.querySelector('.dashboard__single-button.edit')
    .addEventListener('click', (e) => {
        getUsers();
    });
const buttonDelete = document.querySelector('.dashboard__single-button.delete')
    .addEventListener('click', (e) => {
        getUsers();
    });

getUsers()
    .then((data) => {
        const table = document.querySelector('.main__table');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        tr.classList.add('main__tr');
        for (let i = 1; i <= 8; i++) {
            const td = document.createElement('td');
            td.textContent = data[i - 1][1];
            tr.appendChild(td);
        }
        table.appendChild(tbody);
        tbody.appendChild(tr);
        console.log(data);
    })