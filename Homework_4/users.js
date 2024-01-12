// Подключение модуля fs для работы с файлами и его промисификация
const fs = require('fs').promises;

// Функция getUsers считывает данные о пользователях из файла
const getUsers = async (filename) => {
	try {
		// Чтение содержимого файла в формате utf-8
		const usersData = await fs.readFile(filename, 'utf-8');
		// Преобразование данных из JSON строки в объект JavaScript
		return JSON.parse(usersData);
	} catch (error) {
		// В случае ошибки при чтении файла, вывод сообщения об ошибке и возврат пустого массива
		console.error('Error reading users:', error.message);
		return [];
	}
};

// Функция saveUsers записывает данные о пользователях в файл
const saveUsers = async (filename, users) => {
	try {
		// Преобразование массива пользователей в форматированную JSON строку с отступами
		const usersString = JSON.stringify(users, null, 2);
		// Запись данных в файл с указанием кодировки utf-8 и флага w (запись)
		await fs.writeFile(filename, usersString, {encoding: 'utf-8', flag: 'w'});
	} catch (error) {
		// В случае ошибки при записи данных в файл, вывод сообщения об ошибке
		console.error('Error saving users:', error.message);
	}
};

// Экспорт функций getUsers и saveUsers для использования в других модулях
module.exports = {getUsers, saveUsers};
