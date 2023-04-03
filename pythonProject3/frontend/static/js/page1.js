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

document.querySelectorAll('.sidebar-button').forEach((el) => {
    el.addEventListener('click', function(e) {
    switch (e.target.textContent){
    case 'Касса':
        window.location.href = "/cashbox"
        break
    case 'Склад': window.location.href = "/"
        break
    case 'Статистика': console.log('Кнопка нажата3')
        break
    case 'Продажи': console.log('Кнопка нажата4')
        break
    default: 'Ничего'
        break
    }
    })
});