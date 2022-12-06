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



 // функция будет принимать в качестве параметра URL
 async function getUsers() {
 // Отправление запроса к тестовому URL
    const response = await fetch('/add');
 // Получение ответа от сервера в формате json
    const answer = await response.json();
 // Выводим в консоль переменную answer
    // console.log(answer);
    return answer;
 }
 
 // Повесим на кнопку обработчик событий
 setTimeout(() => {
  const button = document.querySelectorAll('.dashboard__single-button').forEach((el) => {
    el.addEventListener('click', (e) => {
  
      document.querySelector('.dashboard__main').innerHTML = getUsers();
      console.log(getUsers());
    });
  })
}, 1000);

fetch('/add').then(response => response.json()).then(data => console.log(data));
