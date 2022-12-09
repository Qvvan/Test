// fetch('/add', {
//   method: 'GET'
// })
//   .then((response) => {
//     // let elem = document.createElement('div');
//     // elem.textContent = response.json();
//     // console.log(elem);
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });


//const getUsers = async () => {
//   let response = await fetch('/add');
//   if (response.ok) {
//      return response.json();
//      let data = await response.json();
//   }
//}

 // Повесим на кнопку обработчик событий
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

let data = fetch('/add')
  .then(response => response.json())
  console.log(data)

const table = document.querySelector('.main__table');
const tbody = document.createElement('tbody');
const tr = document.createElement('tr');
tr.classList.add('main__tr');
for (let i = 1; i <= 5; i++) {
    const th = document.createElement('th');
    th.textContent = data[i - 1][1];
    tr.appendChild(th);
}
table.appendChild(tbody);
tbody.appendChild(tr);