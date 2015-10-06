###Одностраничное приложение "Car-select-spa"

+ Приложение построено на Wire.js, Marionette.js `2.4.3v`, Backbone.js.

###Демо-версия
http://designeng.github.io/car-select/#/cars

###Разработка
+ После установки зависимостей (`npm install`), запустите команду `grunt` и откройте в браузере `http://localhost:7788/#/cars` (инструкции по установке [grunt-cli](http://gruntjs.com/getting-started)).

+ Тесты доступны по адресу: `http://localhost:8888/test/jasmine/`

+ Чтобы приложение взаимодействовало с поднятым на connect.js сервисом `http://localhost:7788/api/v1/cars`, нужно закомментировать метод [Backbone.ajax](https://github.com/designeng/car-select-spa/blob/master/client/coffee/bootstrap/hooks.coffee).

###Проверено в браузерах
Chrome (v45), Safari (v7.0), Firefox (v41).