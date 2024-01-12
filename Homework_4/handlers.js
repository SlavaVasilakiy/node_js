// Подключение модуля fs для работы с файлами и его промисификация
const fs = require('fs').promises;

// Функция getUsers считывает данные о пользователях из файла
const getUsers = async () => {
	try {
		// Чтение содержимого файла 'users.json' в формате utf-8
		const usersData = await fs.readFile('users.json', 'utf-8');
		// Преобразование данных из JSON строки в объект JavaScript
		return JSON.parse(usersData);
	} catch (error) {
		// В случае ошибки при чтении файла, вывод сообщения об ошибке и возврат пустого массива
		console.error('Error reading users:', error.message);
		return [];
	}
};

// Функция saveUsers записывает данные о пользователях в файл 'users.json'
const saveUsers = async (users) => {
	try {
		// Преобразование массива пользователей в форматированную JSON строку с отступами
		const usersString = JSON.stringify(users, null, 2);
		// Запись данных в файл 'users.json' с указанием кодировки utf-8 и флага w (запись)
		await fs.writeFile('users.json', usersString, {encoding: 'utf-8', flag: 'w'});
	} catch (error) {
		// В случае ошибки при записи данных в файл, вывод сообщения об ошибке
		console.error('Error saving users:', error.message);
	}
};

// Функция getAllUsers обрабатывает GET-запрос, возвращая список всех пользователей
const getAllUsers = async (req, res) => {
	const users = await getUsers();
	res.send(users);
};

// Функция getUserById обрабатывает GET-запрос с указанным id, возвращая пользователя или статус 404, если не найден
const getUserById = async (req, res) => {
	const users = await getUsers();
	const user = users.find((user) => user.id === parseInt(req.params.id));

	if (!user) {
		res.status(404).send('User not found');
		return;
	}

	res.send(user);
};

// Функция createUser обрабатывает POST-запрос, добавляя нового пользователя и возвращая его
const createUser = async (req, res) => {
	const users = await getUsers();
	const newUser = req.body;
	users.push(newUser);
	await saveUsers(users);
	res.send(newUser);
};

// Функция updateUser обрабатывает PUT-запрос с указанным id, обновляя данные пользователя и возвращая обновленного пользователя
const updateUser = async (req, res) => {
	const users = await getUsers();
	const userId = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === userId);

	if (userIndex === -1) {
		res.status(404).send('User not found');
		return;
	}

	users[userIndex].name = req.body.name;
	users[userIndex].email = req.body.email;

	await saveUsers(users);
	res.send(users[userIndex]);
};

// Функция deleteUser обрабатывает DELETE-запрос с указанным id, удаляя пользователя и возвращая пустой объект
const deleteUser = async (req, res) => {
	const users = await getUsers();
	const userId = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === userId);

	if (userIndex === -1) {
		res.status(404).send('User not found');
		return;
	}

	users.splice(userIndex, 1);
	await saveUsers(users);
	res.send({});
};

// Экспорт функций для использования в других модулях
module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};
