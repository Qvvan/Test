//------ открытие/зкрытие select
const selectSingle = document.querySelectorAll('.__select');

selectSingle.forEach((el) => {
  el.querySelector('.__select__title').addEventListener('click', () => {
    if ('active' === el.getAttribute('data-state')) {
      el.setAttribute('data-state', '');
    } else {
      el.setAttribute('data-state', 'active');
    }

    el.querySelectorAll('.__select__label').forEach((element) => {
      element.addEventListener('click', function() {
        el.querySelector('.__select__title').textContent = this.textContent;
        el.querySelectorAll('.__select__input').forEach((q) => {
          q.checked = false;
        });
        this.querySelector('.__select__input').checked = true;
        el.setAttribute('data-state', '');
      });
    })
  });

  if (el.querySelector('.button-select')) {
    el.querySelector('.button-select').addEventListener('click', () => {
      if ('active' === el.getAttribute('data-state')) {
        el.setAttribute('data-state', '');
      } else {
        el.setAttribute('data-state', 'active');
      }

      el.querySelectorAll('.__select__label').forEach((element) => {
        element.addEventListener('click', function() {
          el.querySelector('.__select__title').textContent = this.textContent;
          el.setAttribute('data-state', '');
        });
      })
    });
  }
});

window.onclick = function(event) {
  document.querySelectorAll('.__select').forEach((e) => {
    console.log();
    if (event.target != e.querySelector('.__select__title') && event.target != e.querySelector('.button-select')) {
      e.setAttribute('data-state', '');
    }
  });
}

//----- //открытие/зкрытие select ---------


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
      let createProduct__modal = document.querySelector('.overrate__modal');
      if (overrcreateProduct__modalate__modal.style.display == 'block') {
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
