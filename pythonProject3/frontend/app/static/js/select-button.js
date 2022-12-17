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
    if (event.target != e.querySelector('.__select__title')) {
      e.setAttribute('data-state', '');
    }
  });
}

//----- //открытие/зкрытие select ---------


//------ открыть/закрыть модальное окно "списать" ------
document.querySelector('.dashboard__single-button').addEventListener('click', () => {
  document.querySelector('.discard__modal').style.display = 'block';
});

document.querySelector('.btn__modal-decision.cancel').addEventListener('click', () => {
  document.querySelector('.discard__modal').style.display = 'none';
});
//------ //открыть/закрыть модальное окно "списать" ------
