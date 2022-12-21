//------ функция апроса GET --------
export const getUsers = async () => {
    let response = await fetch('/add');
    if (response.ok) {
      let data = await response.json();
      return data;
    }
}
//------ функция запроса POST --------
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
let idSave;

//----- GET запрос при загрузке страницы ----
getUsers()
    .then((data) => {
        //----- заполнение таблицы значениями из запроса ----
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
        document.querySelectorAll('.name__block, .article__block').forEach((el) => {
            let inputResults = el.querySelector('.input__block-results');
            let inputInput = el.querySelector('.input__block-input');
            let dataAtribyte = el.dataset.input;
            let saveDataStrings;
            
            //------ выпадающий список в Инпуте name --------
            if (el.querySelector('svg')) {
                el.querySelector('svg').addEventListener('click', function(e) {
                    if (inputResults.style.display == 'block') {
                        inputResults.innerHTML = "";
                        inputResults.style.display = 'none'
                    } else {
                        let search_item = inputInput.value.toLowerCase();
                        let aaa = data.filter((item) => {
                            return item[dataAtribyte].toString().toLowerCase().includes(search_item);
                        })
                        saveDataStrings = aaa;
                        aaa.forEach((elem) => {
                            const li = document.createElement('li');
                            li.innerHTML = `<span>${elem[dataAtribyte]}</span>`;
                            inputResults.appendChild(li);
                        });
                        inputResults.style.display = 'block';
                        if (aaa.length == 0) {
                            inputResults.style.display = 'none';
                        }
                    }
                })
            }
            //------ //выпадающий список в Инпуте name --------

            //----- сама функция live search ---------
            inputInput.addEventListener('input', (event) => {

                let search_item = event.target.value.toLowerCase();
                inputResults.innerHTML = "";
                
                let aaa = data.filter((item) => {
                    return item[dataAtribyte].toString().toLowerCase().includes(search_item);
                })
                saveDataStrings = aaa;
                aaa.forEach((elem) => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${elem[dataAtribyte]}</span>`;
                    inputResults.appendChild(li);
                });
                
                if (search_item == '') {
                    inputResults.innerHTML = "";
                    inputResults.style.display = 'none';
                } else 
                if (inputResults.contains(el.querySelector('.input__block-results li'))) {
                    inputResults.style.display = 'block';
                } else {
                    inputResults.style.display = 'none';
                }
                
            });
            //----- функция автозаполнения инпутов в модальном окне ---------
            inputResults.addEventListener('click', function(event) {
                if (document.querySelector('.discard__modal').contains(el)) {

                    inputResults.querySelectorAll('.input__block-results li').forEach((i, index) => {
                        if (event.target == i) {
                            document.querySelector('.discard__modal').querySelectorAll('.name__block, .article__block').forEach((element) => {
                                let datasetFill = element.dataset.input;
                                idSave = saveDataStrings[index].id;
                                console.log(saveDataStrings[index].id);
                                element.querySelector('.input__block-input').value = saveDataStrings[index][datasetFill];
                                inputResults.innerHTML = "";
                                inputResults.style.display = 'none';
                            })
                        }
                    })
                }
            })
            //----- //функция автозаполнения инпутов в модальном окне ---------
        })
        //----- //live search -----
    })
//----- //GET запрос при загрузке страницы ----


//------ событие нажатия на кнопку 'ОК' в модалке списания ------
document.querySelector('.btn__modal-decision.ok').addEventListener('click', () => {
    let name = document.querySelector('.name__block-input').value;
    let article = document.querySelector('.article__block-input').value;
    //let type = document.querySelector('.select-type-title').innerText;
    //let product = document.querySelector('.select-product-title').innerText;
    let count = document.querySelector('.count__block-input').value;
    let units = document.querySelector('.select-units-title').innerText;
    let reason = document.querySelector('.modal-reason-title').innerText;

    let modalContent = {
        'Наименование': name,
        'Артикул': article,
        //'Тип': type,
        //'Уже существующий товар': product,
        'Количество': count,
        'Единицы': units,
        'Причина списания': reason,
        'id': idSave
    }
    console.log(modalContent);
    postUsers(modalContent, '/add').then((data) => {
        
        const table = document.querySelector('.table__body');
        table.innerHTML = "";
        
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
    });
});
//------ //событие нажатия на кнопку 'ОК' в модалке списания ------
