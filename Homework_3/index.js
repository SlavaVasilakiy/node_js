'use strict';

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Объект для хранения счетчиков просмотров
let viewCounters = {};

// Функция загрузки счетчиков из файла
function loadViewCounters() {
	try {
		const data = fs.readFileSync('viewCounters.json', 'utf8');
		viewCounters = JSON.parse(data);
	} catch (err) {
		console.error('Ошибка при загрузке счетчиков:', err.message);
	}
}

// Функция сохранения счетчиков в файл
function saveViewCounters() {
	try {
		const data = JSON.stringify(viewCounters, null, 2);
		fs.writeFileSync('viewCounters.json', data);
	} catch (err) {
		console.error('Ошибка при сохранении счетчиков:', err.message);
	}
}

// Middleware для обновления счетчика просмотров
function updateViewCounter(req, res, next) {
	const path = req.path;
	viewCounters[path] = (viewCounters[path] || 0) + 1;
	saveViewCounters();
	next();
}

// Загрузка счетчиков при старте сервера
loadViewCounters();

// Обработчик для страницы "/"
app.get('/', updateViewCounter, (req, res) => {
	res.send(`<a href="/about">About</a> <p>Привет! Страница '/' просмотрена ${viewCounters['/']} раз.</p>`);
});

// Обработчик для страницы "/about"
app.get('/about', updateViewCounter, (req, res) => {
	res.send(
		`<a href="/">Home</a> <p>Страница '/about' просмотрена ${viewCounters['/about']} раз.</p>`
	);
});

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});

