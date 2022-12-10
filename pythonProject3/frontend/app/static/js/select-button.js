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
