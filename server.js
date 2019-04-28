const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '001',
			name: 'pangbo',
			email: 'pangbo@qq.com',
			password: 'pb19930515',
			entries: 0,
			joined: new Date()
		},
		{
			id: '002',
			name: 'yumiao',
			email: 'yumiao@qq.com',
			password: 'ym19940618',
			entries: 0,
			joined: new Date()
		},
	]
}

/*root recieve get */
app.get('/', (req, res) => {
	res.send(database.users);
})

/*signin recieve post */
app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
			req.body.password === database.users[0].password) {
		res.json('correct email and password');
	} else {
		res.status(400).json('error logging in');
	}
})

/*register recieve post */
app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: '003',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

/*profile recieve get */
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	database.users.forEach(user => {
		if(user.id === id) {
			res.json(user);
		}
	})
	res.status(400).json('this user does not exist');
})

/*count recieve put */
app.put('/count', (req, res) => {
	database.users.forEach(user => {
		if(user.id === req.body.id) {
			user.entries++;
			res.json(user.entries);
		}
	})
	res.status(400).json('this user does not exist');
})

app.listen(3000, () => {
	console.log('The server is listening on port 3000');
});