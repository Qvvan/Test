export const getUsers = async () => {
    let response = await fetch('/add');
    if (response.ok) {
      let data = await response.json();
      return data;
    }
}
export const postUsers = async (content, url) => {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(content)
    });
    let data = await response.json();
    return data;
}



document.querySelector('.btn__modal-decision.ok')
    .addEventListener('click', (e) => {
        let name = document.querySelector('.modal-name-input').value;
        let article = document.querySelector('.modal-article-input').value;
        let type = document.querySelector('.select-type-title').innerText;
        let product = document.querySelector('.select-product-title').innerText;
        let count = document.querySelector('.modal-count-input').value;
        let units = document.querySelector('.select-units-title').innerText;
        let reason = document.querySelector('.modal-reason-title').innerText;
        modalContent = {
            'Наименование': name,
            'Артикул': article,
            'Тип': type,
            'Уже существующий товар': product,
            'Количество': count,
            'Единицы': units,
            'Причина списания': reason,
        }
        console.log(modalContent);
        postUsers(modalContent, '/add').then(asdaad => console.log(asdaad));
    });

getUsers()
    .then((data) => {
        //----- заполнение при загрузке страницы таблицы значениями из сервера ----
        console.log(data);
        const table = document.querySelector('.table__body');
        
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
        //----- //заполнение при загрузке страницы таблицы значениями из сервера ----

        //----- live search -----
        let inputResults = document.querySelector('.name-input-results');
        document.querySelector('.modal-name-input').addEventListener("input", (event) => {

          let search_item = event.target.value.toLowerCase();
          showlist(search_item);
          
          if (inputResults.contains(document.querySelector('.name-input-results li'))) {
            inputResults.style.display = 'block';
          } else {
            inputResults.style.display = 'none';
          }
          if (search_item == '') {
            inputResults.style.display = 'none';
          }

        });
        
        function showlist(search_item) {
            document.querySelector('.name-input-results').innerHTML = "";
            data.filter((item) => {
                return item.name.toLowerCase().includes(search_item);
            })
            .forEach((el) => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${el.name}</span>`;
                document.querySelector('.name-input-results').appendChild(li);
            });
        }
        //----- //live search -----
    })
