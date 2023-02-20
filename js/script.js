'use strict';

const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

//Назначаем обработчик событий
inputRub.addEventListener('input', () => {
    //Делаем запрос на сервер, используя конструктор, создающий новый объект
    const request = new XMLHttpRequest();

    //Этот метод собирает настройки, помогающие в будущем сделать запрос
    request.open('GET', 'js/current.json');
    //Этот метод передает HTTP заголовоки с данными об информации: что это, как закодировано
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    //Метод отправляет запрос
    request.send();
    //Событие отслеживает статус готовности запроса в текущий момент
    request.addEventListener('readystatechange', () => {
        //4 - Done, 200 - OK
        if (request.readyState === 4 && request.status === 200) {
            
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = "Что-то пошло не так";
        }
    });
});