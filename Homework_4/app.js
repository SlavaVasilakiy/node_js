const express = require('express');
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('./handlers');

const app = express();
app.use(express.json());

app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
