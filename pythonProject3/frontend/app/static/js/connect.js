import {fillTable} from './functions.js';

//------ функция апроса GET --------
export const getUsers = async (url) => {
    let response = await fetch(url);
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
getUsers('/storage_list')
    .then((data) => {
        //----- заполнение таблицы значениями из запроса ----
        fillTable(data);
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
            if (document.querySelector('.discard__modal').contains(el) || document.querySelector('.overrate__modal').contains(el)) {
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
            }
            
            //----- функция автозаполнения инпутов в модальных окнах ---------
            inputResults.addEventListener('click', function(event) {
                //----- модалка списания ---------
                if (document.querySelector('.discard__modal').contains(el)) {
                    inputResults.querySelectorAll('.input__block-results li').forEach((i, index) => {
                        if (event.target == i) {
                            document.querySelector('.discard__modal').querySelectorAll('.name__block, .article__block').forEach((element) => {
                                let datasetFill = element.dataset.input;
                                idSave = saveDataStrings[index].id;
                                element.querySelector('.input__block-input').value = saveDataStrings[index][datasetFill];
                                inputResults.innerHTML = "";
                                inputResults.style.display = 'none';
                            })
                        }
                    })
                //----- модалка переоценки ---------
                } else if (document.querySelector('.overrate__modal').contains(el)) {
                    inputResults.querySelectorAll('.input__block-results li').forEach((i, index) => {
                        if (event.target == i) {
                            document.querySelector('.overrate__modal').querySelectorAll('.name__block, .article__block, .count__block, .oldPrice__block').forEach((element) => {
                                let datasetFill = element.dataset.input;
                                idSave = saveDataStrings[index].id;
                                console.log(saveDataStrings[index][datasetFill]);
                                element.querySelector('.input__block-input').value = saveDataStrings[index][datasetFill];
                                inputResults.innerHTML = "";
                                inputResults.style.display = 'none';
                            })
                            document.querySelector('.overrate__modal').querySelectorAll('.count__block, .oldPrice__block').forEach((element) => {
                                element.querySelector('.input__block-input').disabled = true;
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
document.querySelector('.discard__modal .btn__modal-decision.ok').addEventListener('click', () => {
    let name = document.querySelector('.discard__modal .name__block-input').value;
    let article = document.querySelector('.discard__modal .article__block-input').value;
    let count = document.querySelector('.discard__modal .count__block-input').value;
    let units = document.querySelector('.discard__modal .select-units-title').innerText;
    let reason = document.querySelector('.discard__modal .modal-reason-title').innerText;

    let modalContent = {
        'Наименование': name,
        'Артикул': article,
        'count': count,
        'Единицы': units,
        'Причина списания': reason,
        'id': idSave
    }
    console.log(modalContent);
    postUsers(modalContent, '/storage_list').then((data) => {
        fillTable(data[0]);
    });
});
//------ //событие нажатия на кнопку 'ОК' в модалке списания ------

//------ событие нажатия на кнопку 'ОК' в модалке переоценки ------
document.querySelector('.overrate__modal .btn__modal-decision.ok').addEventListener('click', () => {
    let new__price = document.querySelector('.overrate__modal .new__price-input').value;

    let modalContent = {
        'Новая цена': new__price,
        'id': idSave
    }
    console.log(modalContent);
    postUsers(modalContent, '/overrate').then((data) => {
        console.log(data);
        fillTable(data[0]);
    });
});
//------ //событие нажатия на кнопку 'ОК' в модалке переоценки ------

//------ событие нажатия на кнопку 'ОК' в модалке создания товара ------
document.querySelector('.createProduct__modal .btn__modal-decision.ok').addEventListener('click', () => {

    let name = document.querySelector('.createProduct__modal .name__block-input').value;
    let article = document.querySelector('.createProduct__modal .article__block-input').value;
    let units = document.querySelector('.createProduct__modal .select-units-title').innerText;
    let price_purchase = document.querySelector('.createProduct__modal .old__price-input').value;
    let price_selling = document.querySelector('.createProduct__modal .new__price-input').value;

    let modalContent = {
        'name': name,
        'article': article,
        'units': units,
        'price_purchase': price_purchase,
        'price_selling': price_selling
    }
    
    console.log(modalContent);
    postUsers(modalContent, '/overrate').then((data) => {
        console.log(data);
        fillTable(data[0]);
    });
});
//------ //событие нажатия на кнопку 'ОК' в модалке создания товара ------