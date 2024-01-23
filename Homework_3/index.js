'use strict';

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Функция создания объекта счетчиков
function createViewCounters() {
	return {};
}

// Функция загрузки счетчиков из файла
function loadViewCounters() {
	try {
		const data = fs.readFileSync('viewCounters.json', 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error('Ошибка при загрузке счетчиков:', err.message);
		return createViewCounters();
	}
}

// Функция сохранения счетчиков в файл
function saveViewCounters(viewCounters) {
	try {
		const data = JSON.stringify(viewCounters, null, 2);
		fs.writeFileSync('viewCounters.json', data);
	} catch (err) {
		console.error('Ошибка при сохранении счетчиков:', err.message);
	}
}

// Middleware для обновления счетчика просмотров
function updateViewCounter(viewCounters) {
	return function (req, res, next) {
		const path = req.path;
		viewCounters[path] = (viewCounters[path] || 0) + 1;
		saveViewCounters(viewCounters);
		next();
	};
}

// Загрузка счетчиков при старте сервера
let viewCounters = loadViewCounters();

// Обработчик для страницы "/"
app.get('/', updateViewCounter(viewCounters), (req, res) => {
	res.send(
		`<a href="/about">About</a> <p>Привет! Страница '/' просмотрена ${viewCounters['/']} раз.</p>`
	);
});

// Обработчик для страницы "/about"
app.get('/about', updateViewCounter(viewCounters), (req, res) => {
	res.send(
		`<a href="/">Home</a> <p>Страница '/about' просмотрена ${viewCounters['/about']} раз.</p>`
	);
});

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});
