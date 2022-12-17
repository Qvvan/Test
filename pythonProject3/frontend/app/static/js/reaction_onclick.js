import {getUsers, postUsers} from './connect.js';

document.querySelectorAll('.sidebar__list-item').forEach((el) => {
  el.addEventListener('click', function(e) {
    if (e.target.classList.contains('sidebar-button')) {
      document.querySelectorAll('.sidebar__list-item').forEach((elem) => {
          elem.classList.remove('active');
      })
      this.classList.add('active');
    }
  })
})

document.querySelectorAll('.table__header span').forEach((el, index) => {

  let column = ['id', 'name', 'code', 'unit', 'count', 'price_purchase', 'price_selling'];
  let sortable = ['Убывание', 'Возрастание'];

  el.addEventListener('click', (e) => {
    let findSort;

    if (el.classList.contains('active')) {
      el.classList.remove('active');
      findSort = sortable[0];
    } else {
      el.classList.add('active');
      findSort = sortable[1];
    }
    let findColumn = column[index];
    let request = {
      'Колонка': findColumn,
      'Сортировка': findSort
    }

    postUsers(request, '/order')
      .then((data) => {
        console.log(data);
        const table = document.querySelector('.table__body');
        while(table.firstChild){
          table.removeChild(table.firstChild);
        }
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
      });
  })
})