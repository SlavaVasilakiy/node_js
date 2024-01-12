const fs = require('fs').promises;

const getUsers = async (filename) => {
	try {
		const users = await fs.readFile(filename, 'utf-8');
		return JSON.parse(users);
	} catch (error) {
		console.error('Error reading users:', error.message);
		return [];
	}
};

const saveUsers = async (filename, users) => {
	try {
		const usersString = JSON.stringify(users, null, 2);
		await fs.writeFile(filename, usersString, {encoding: 'utf-8', flag: 'w'});
	} catch (error) {
		console.error('Error saving users:', error.message);
	}
};

module.exports = {getUsers, saveUsers};
