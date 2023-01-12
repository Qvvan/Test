import {fillTable, viewPopup} from './functions.js';

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
let asddd;
//----- GET запрос при загрузке страницы ----
getUsers('/storage_list')
    .then((data) => {
        asddd = data;
        //----- заполнение таблицы значениями из запроса ----
        fillTable(data);
        //----- //заполнение при загрузке страницы таблицы значениями из сервера ----

        //----------функция поиска на странице
        document.querySelectorAll('.dashboard__search').forEach(function (el) {
            el.querySelector('.dashboard__search-input').addEventListener('input', function(event) {
                let inputResults = document.querySelector('.search__results');
                inputResults.innerHTML = "";
    
                let search_item = event.target.value.toLowerCase();
                console.log(search_item);
                let aaa = data.filter((item) => {
                    return item.name.toString().toLowerCase().includes(search_item) || 
                        item.code.toString().toLowerCase().includes(search_item);
                })
                aaa.forEach((elem) => {
                    if (elem.name.toString().toLowerCase().includes(search_item)) {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>${elem.name}</span>`;
                        inputResults.appendChild(li);
                    }
                    if (elem.code.toString().toLowerCase().includes(search_item)) {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>${elem.code}</span>`;
                        inputResults.appendChild(li);
                    }
                });
                if (search_item == '') {
                    inputResults.innerHTML = "";
                    inputResults.style.display = 'none';
                } else 
                if (inputResults.contains(el.querySelector('.search__results li'))) {
                    inputResults.style.display = 'block';
                } else {
                    inputResults.style.display = 'none';
                }
                console.log(aaa);
            })
        })
        
        //--------//функция поиска на странице

        //----- live search -----
        document.querySelectorAll('.name__block, .article__block').forEach((el) => {
            let inputResults = el.querySelector('.input__block-results');
            let inputInput = el.querySelector('.input__block-input');
            let dataAtribyte = el.dataset.input;
            let saveDataStrings;
            
            //------ выпадающий список в Инпуте name --------
            if (el.querySelector('.input-arrow')) {
                el.querySelector('.input-arrow').addEventListener('click', function(e) {
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

    document.querySelector('.discard__modal').addEventListener('submit', (event) => {
        event.preventDefault();
    })
    let name = document.querySelector('.discard__modal .name__block-input');
    let article = document.querySelector('.discard__modal .article__block-input');
    let count = document.querySelector('.discard__modal .count__block-input');
    let units = document.querySelector('.discard__modal .select-units-title');
    let reason = document.querySelector('.discard__modal .modal-reason-title');

    if ((name.value !== '') && (article.value !== '') && (count.value !== '') && (units.innerText !== '') && (reason.innerText !== '')) {
        console.log(name.validity);
        let modalContent = {
            'Наименование': name.value,
            'Артикул': article.value,
            'count': count.value,
            'Единицы': units.innerText,
            'Причина списания': reason.innerText,
            'id': idSave
        }
        console.log(modalContent);
        postUsers(modalContent, '/storage_list').then((data) => {
            fillTable(data[0]);
            viewPopup(data[1], '.discard__modal');
        });
    }
});
//------ //событие нажатия на кнопку 'ОК' в модалке списания ------

//------ событие нажатия на кнопку 'ОК' в модалке переоценки ------
document.querySelector('.overrate__modal .btn__modal-decision.ok').addEventListener('click', () => {
    document.querySelector('.overrate__modal').addEventListener('submit', (event) => {
        event.preventDefault();
    })
    let name = document.querySelector('.overrate__modal .name__block-input').value;
    let article = document.querySelector('.overrate__modal .article__block-input').value;
    let count = document.querySelector('.overrate__modal .count__block-input').value;
    let units = document.querySelector('.overrate__modal .select-units-title').innerText;
    let old__price = document.querySelector('.overrate__modal  old__price-input').value;
    let new__price = document.querySelector('.overrate__modal .new__price-input').value;

    if ((name !== '') && (article !== '') && (count !== '') && (units !== '') && (old__price !== '') && (new__price !== '')) {
        let modalContent = {
            'Новая цена': new__price,
            'id': idSave
        }
        console.log(modalContent);
        postUsers(modalContent, '/overrate').then((data) => {
            fillTable(data[0]);
            viewPopup(data[1], '.overrate__modal');
        });
    }
});
//------ //событие нажатия на кнопку 'ОК' в модалке переоценки ------

//------ событие нажатия на кнопку 'ОК' в модалке создания товара ------
document.querySelector('.createProduct__modal .btn__modal-decision.ok').addEventListener('click', () => {
    document.querySelector('.createProduct__modal').addEventListener('submit', (event) => {
        event.preventDefault();
    })
    let name = document.querySelector('.createProduct__modal .name__block-input').value;
    let article = document.querySelector('.createProduct__modal .article__block-input').value;
    let units = document.querySelector('.createProduct__modal .select-units-title').innerText;
    let price_purchase = document.querySelector('.createProduct__modal .old__price-input').value;
    let price_selling = document.querySelector('.createProduct__modal .new__price-input').value;

    if ((name !== '') && (article !== '') && (price_purchase !== '') && (units !== '') && (price_selling !== '')) {
        let modalContent = {
            'name': name,
            'article': article,
            'units': units,
            'price_purchase': price_purchase,
            'price_selling': price_selling
        }
    
        console.log(modalContent);
        postUsers(modalContent, '/add').then((data) => {
            console.log(data);
            viewPopup(data, '.createProduct__modal');
        });
    }
});
//------ //событие нажатия на кнопку 'ОК' в модалке создания товара ------