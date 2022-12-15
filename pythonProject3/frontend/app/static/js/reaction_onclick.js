document.querySelectorAll('.sidebar__list-item').forEach((el) => {
  el.addEventListener('click', function(e) {
    if (e.target.classList.contains = '.sidebar-button') {
      document.querySelectorAll('.sidebar__list-item').forEach((elem) => {
          elem.classList.remove('active');
      })
      this.classList.add('active');
    }
  })
})
