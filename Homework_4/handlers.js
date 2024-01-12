const fs = require('fs').promises;

const getUsers = async () => {
	try {
		const users = await fs.readFile('users.json', 'utf-8');
		return JSON.parse(users);
	} catch (error) {
		console.error('Error reading users:', error.message);
		return [];
	}
};

const saveUsers = async (users) => {
	try {
		const usersString = JSON.stringify(users, null, 2);
		await fs.writeFile('users.json', usersString, {encoding: 'utf-8', flag: 'w'});
	} catch (error) {
		console.error('Error saving users:', error.message);
	}
};

const getAllUsers = async (req, res) => {
	const users = await getUsers();
	res.send(users);
};

const getUserById = async (req, res) => {
	const users = await getUsers();
	const user = users.find((user) => user.id === parseInt(req.params.id));

	if (!user) {
		res.status(404).send('User not found');
		return;
	}

	res.send(user);
};

const createUser = async (req, res) => {
	const users = await getUsers();
	const newUser = req.body;
	users.push(newUser);
	await saveUsers(users);
	res.send(newUser);
};

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

module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};
