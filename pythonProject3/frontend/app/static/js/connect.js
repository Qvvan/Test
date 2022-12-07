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


const getUsers = async () => {
   let response = await fetch('/add');
   if (response.ok) {
      let data = await response.json();
      document.querySelector('.dashboard__main').innerHTML = data;
   }
}
 // Повесим на кнопку обработчик событий
const button = document.querySelectorAll('.dashboard__single-button').forEach((el) => {
   el.addEventListener('click', (e) => {
   getUsers();
   });
})