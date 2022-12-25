export function fillTable (data) {
    console.log(data);
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
}

export function viewPopup (data, modal) {
    let modalDecision = document.querySelector(`${modal} .modal-decision`);
    let modalCancel = document.querySelector(`${modal} .btn__modal-decision.cancel`);
    let modalPopup = document.createElement('div');

    if (modal == '.discard__modal') {
        if (data == 'Списание выполнено') {
            modalPopup.classList.add('modal__popup');
        } else {
            modalPopup.classList.add('modal__popup', 'negative');
        }
    }
    if (modal == '.overrate__modal') {
        if (data == 'Товар переоценён') {
            modalPopup.classList.add('modal__popup');
        } else {
            modalPopup.classList.add('modal__popup', 'negative');
        }
    }
    if (modal == '.createProduct__modal') {
        if (data == 'Товар создан') {
            modalPopup.classList.add('modal__popup', 'create');
        } else {
            modalPopup.classList.add('modal__popup', 'create', 'negative');
        }
    }

    modalPopup.textContent = data;
    modalDecision.insertBefore(modalPopup, modalCancel);
    setTimeout(() => {
        modalPopup.style.opacity = 1;
    }, 0)
    setTimeout(() => {
        modalPopup.style.opacity = 0;
    }, 2000)
    setTimeout(() => {
        modalPopup.remove();
    }, 2200)
}