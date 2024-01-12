// Подключение модуля express для создания сервера
const express = require('express');

// Подключение функций-обработчиков запросов из модуля handlers
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('./handlers');

// Создание экземпляра приложения express
const app = express();

// Использование middleware express.json() для обработки JSON-запросов
app.use(express.json());

// Установка обработчиков маршрутов для различных HTTP-запросов

// Обработка GET-запроса к /users вызывает функцию getAllUsers из модуля handlers
app.get('/users', getAllUsers);

// Обработка GET-запроса к /users/:id вызывает функцию getUserById из модуля handlers
app.get('/users/:id', getUserById);

// Обработка POST-запроса к /users вызывает функцию createUser из модуля handlers
app.post('/users', createUser);

// Обработка PUT-запроса к /users/:id вызывает функцию updateUser из модуля handlers
app.put('/users/:id', updateUser);

// Обработка DELETE-запроса к /users/:id вызывает функцию deleteUser из модуля handlers
app.delete('/users/:id', deleteUser);

// Прослушивание порта 3000 и вывод сообщения в консоль при успешном запуске сервера
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
