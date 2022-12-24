import {postUsers} from './connect.js';
import {fillTable} from './functions.js';

//------ переключение между страницами sidebar -------
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
//------ //переключение между страницами sidebar -------

//------ сортировка по нажатию на svg -------
document.querySelectorAll('.table__header span').forEach((el, index) => {

  let column = ['id', 'name', 'code', 'unit', 'count', 'price_purchase', 'price_selling'];
  let sortable = ['Убывание', 'Возрастание'];

  el.addEventListener('click', (e) => {
    let findSort;
    if (e.target == el.querySelector('.table__header span svg')) {
      if (el.classList.contains('active')) {
        document.querySelectorAll('.table__header span').forEach((element) => {
          element.classList.remove('active');
        })
        
        findSort = sortable[0];
      } else {
        document.querySelectorAll('.table__header span').forEach((element) => {
          element.classList.remove('active');
        })
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
          fillTable(data);
        });
    }
  })
})
//------ //сортировка по нажатию на svg -------

//------ открыть/закрыть модальное окно "списать" ------
document.querySelectorAll('.dashboard__single-button').forEach((element) => {
  element.addEventListener('click', () => {
    document.querySelectorAll('.modal').forEach((el) => {
      el.style.display = 'none';
    })
    if (element.classList.contains('discard')) {
      let discard__modal = document.querySelector('.discard__modal');
      if (discard__modal.style.display == 'block') {
        discard__modal.style.display = 'none';
      } else {
        discard__modal.style.display = 'block';
      }
    }
    if (element.classList.contains('overrate')) {
      let overrate__modal = document.querySelector('.overrate__modal');
      if (overrate__modal.style.display == 'block') {
        overrate__modal.style.display = 'none';
      } else {
        overrate__modal.style.display = 'block';
      }
    }
    if (element.classList.contains('createProduct')) {
      let createProduct__modal = document.querySelector('.createProduct__modal');
      if (createProduct__modal.style.display == 'block') {
        createProduct__modal.style.display = 'none';
      } else {
        createProduct__modal.style.display = 'block';
      }
    }
  });
})
document.querySelectorAll('.modal').forEach((el) => {
  el.querySelector('.btn__modal-decision.cancel').addEventListener('click', function(event) {
    el.style.display = 'none';
  })
})
//------ //открыть/закрыть модальные окна "списать/переоценить/создать товар" ------

//------ открыть/закрыть дашборды "все товары/поставки/история" ------
document.querySelectorAll('.dashboard__tabs-single').forEach((element, index) => {
  element.addEventListener('click', function(e) {
    document.querySelectorAll('.dashboard__tabs-single').forEach((el) => {
      el.classList.remove('active');
    })
    this.classList.add('active');

    document.querySelectorAll('.storage .dashboard').forEach((el, i) => {
      if (index == i) {
        document.querySelectorAll('.storage .dashboard').forEach((elem) => {
          elem.style.display = 'none';
        })
        el.style.display = 'block';
      }
    })
  })
})
//------ //открыть/закрыть дашборды "все товары/поставки/история" ------