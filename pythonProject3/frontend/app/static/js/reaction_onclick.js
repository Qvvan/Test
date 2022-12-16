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
    el.classList.add('active');
    let findSort;
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      findSort = sortable[1];
    } else {
      el.classList.add('active');
      findSort = sortable[0];
    }
    let findColumn = column[index];
    
    let request = {
      'Колонка': findColumn,
      'Сортировка': findSort
    }

    postUsers(request, '/order').then(asdaad => console.log(asdaad));
  })
})