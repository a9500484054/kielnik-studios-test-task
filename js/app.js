document.addEventListener('DOMContentLoaded', () => {

//Вывод Json данных    
async function getResponse(number = 0) {
    let response = await fetch("../output.json")
    let content = await response.json()
    let list = document.querySelector(".carts")
    let amount = content.length - number

    if(number == 0) {
        content = content.splice(0, 5)
    } else if (number > 0 && amount > 20) {
        content = content.splice(5, 20)
    } else if (amount < content.length) {
        content = content.splice(content.length - amount, amount)
        const btnDownload = document.querySelector('.content__btn')
        btnDownload.style.display = 'none'
    } 

    for (key in content) {
        list.innerHTML += `
        <li class="carts__item room">
            <div class="room__wrap-one">
                <span class="room__text">${content[key].room}</span>
                <div class="room__wrap-two">
                    <span class="room__text">${content[key].area}<span>м<sup><small>2</small></sup></span></span>
                    <span class="room__text">${content[key].floor} <span class="room__text--grey">из 17 Этаж</span></span>
                    <span class="room__text">${content[key].price} <span class="room__text--none">&#8381;</span></span>
                </div>
            </div>
            <img class="room__img" src=${content[key].url} alt="room">
        </li>
        `
    }
}

getResponse()

//Загрузка Json данных при нажатие на кнопку загрузить еще
const btnDownload = document.querySelector('.content__btn')

btnDownload.addEventListener('click', function() {
    let item = document.querySelectorAll(".room")
    getResponse(item.length)

})

// Кнопка показать/скрыть фильтр 
const btnFilter = document.querySelector('.content__btn-filter')
const filter = document.querySelector('.filter')

btnFilter.addEventListener('click', function() {
    filter.classList.toggle('filter--active')
}) 


// Кнопака скролла вверх
const btnAbove = document.querySelector('.btn-above')

btnAbove.addEventListener('click', function() {
    
    let elem = document.querySelector('body');
    
    elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

// Кнопка скролла показать/скрыть при скролле
const body = document.querySelector('body')

document.addEventListener('scroll', () => { 
    let scrollTop = body.scrollHeight;
    let scrollUp = window.pageYOffset;

    if(scrollTop >= 100){
        btnAbove.classList.add('btn-above--active');
    }
    if (scrollUp === 0 ) {
        btnAbove.classList.remove('btn-above--active');
    }

});


// Функция сортировки от меньшего к большему
async function getResponseFilterUp(value) {
    let response = await fetch("../output.json")
    let content = await response.json()
    let list = document.querySelector(".carts")

    switch(value) {
		case "area": content.sort((prev, next) => prev.area - next.area)
        break
		case "floor": content.sort((prev, next) => prev.floor - next.floor)
        break
		case "price": content.sort((prev, next) => prev.price - next.price)
        break
	}


    for (key in content) {
        list.innerHTML += `
        <li class="carts__item room">
            <div class="room__wrap-one">
                <span class="room__text">${content[key].room}</span>
                <div class="room__wrap-two">
                    <span class="room__text">${content[key].area}<span>м<sup><small>2</small></sup></span></span>
                    <span class="room__text">${content[key].floor} <span class="room__text--grey">из 17 Этаж</span></span>
                    <span class="room__text">${content[key].price} <span class="room__text--none">&#8381;</span></span>
                </div>
            </div>
            <img class="room__img" src=${content[key].url} alt="room">
        </li>
        `
    }
}
// Функция сортировки от большего к меньшему
async function getResponseFilterDown(value) {
    let response = await fetch("../output.json")
    let content = await response.json()
    let list = document.querySelector(".carts")

    switch(value) {
		case "area": content.sort((prev, next) => next.area - prev.area)
        break
		case "floor": content.sort((prev, next) => next.floor - prev.floor)
        break
		case "price": content.sort((prev, next) => next.price - prev.price)
        break
	}


    for (key in content) {
        list.innerHTML += `
        <li class="carts__item room">
            <div class="room__wrap-one">
                <span class="room__text">${content[key].room}</span>
                <div class="room__wrap-two">
                    <span class="room__text">${content[key].area}<span>м<sup><small>2</small></sup></span></span>
                    <span class="room__text">${content[key].floor} <span class="room__text--grey">из 17 Этаж</span></span>
                    <span class="room__text">${content[key].price} <span class="room__text--none">&#8381;</span></span>
                </div>
            </div>
            <img class="room__img" src=${content[key].url} alt="room">
        </li>
        `
    }
}

const list = document.querySelector(".carts")
const arrowIcon = document.querySelectorAll('.arrow-wrap__icon')
const btnUpМ2 = document.querySelector('.m-js-up')
const btnDownМ2 = document.querySelector('.m-js-down')
const btnUpFloor = document.querySelector('.floor-js-up')
const btnDownFloor = document.querySelector('.floor-js-down')
const btnUpPrice = document.querySelector('.price-js-up')
const btnDownPrice = document.querySelector('.price-js-down')

//Добавляем активный класс для стрелок сортировки
arrowIcon.forEach(elem => {
    elem.addEventListener('click', function() {
        console.log('sf')
        arrowIcon.forEach(elem => {
            elem.classList.remove('arrow-wrap__icon--active')
        })
        elem.classList.add('arrow-wrap__icon--active')
    })
})

// Сортировка по кв. м. от меньшего к большему
btnUpМ2.addEventListener('click', function() {
    list.innerHTML = ""
    getResponseFilterUp("area")
    btnDownload.style.display = 'none'
})

// Сортировка по кв. м. от большего к меньшему
btnDownМ2.addEventListener('click', function() {
    list.innerHTML = ""
    getResponseFilterDown("area")
    btnDownload.style.display = 'none'
})

// Сортировка по этажам от меньшего к большему
btnUpFloor.addEventListener('click', function() {
    list.innerHTML = ""
    getResponseFilterUp("floor")
    btnDownload.style.display = 'none'
})

// Сортировка по этажам от большего к меньшему
btnDownFloor.addEventListener('click', function() {
    list.innerHTML = ""
    getResponseFilterDown("floor")
    btnDownload.style.display = 'none'
})

// Сортировка по цене от меньшего к большему
btnUpPrice.addEventListener('click', function() {
    list.innerHTML = ""
    getResponseFilterUp("price")
    btnDownload.style.display = 'none'
})

// Сортировка по цене от большего к меньшему
btnDownPrice.addEventListener('click', function() {
    list.innerHTML = ""
    getResponseFilterDown("price")
    btnDownload.style.display = 'none'
})

// Настройка ползунка фильтра
$(".js-range-slider").ionRangeSlider({
    type: "double",
    min: 3025487,
    max: 10000000,
    force_edges: false,     // force UI in the box
    hide_min_max: false,    // show/hide MIN and MAX labels
    hide_from_to: false,
    onChange: function(data){
        document.querySelector('.range__from').value = data.from;
        document.querySelector('.range__to').value = data.to_pretty;
        document.querySelector('.range__from').value = data.from;
        document.querySelector('.range__from').value = data.from_pretty;
    }
});

$(".js-range-slider-m").ionRangeSlider({
    type: "double",
    min: 27,
    max: 200,
    force_edges: false,     // force UI in the box
    hide_min_max: false,    // show/hide MIN and MAX labels
    hide_from_to: false,
    onChange: function(data){
        document.querySelector('.range__m-from').value = data.from;
        document.querySelector('.range__m-to').value = data.to_pretty;
        document.querySelector('.range__m-from').value = data.from;
        document.querySelector('.range__m-from').value = data.from_pretty;
    }
});



});

