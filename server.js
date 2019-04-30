const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
/*cross origin request must install cors */
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const count = require('./controllers/count');
const image = require('./controllers/image');

/*Initializing the Library */
const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.use(bodyParser.json());

/*cross origin request must install cors */
app.use(cors())

/*root recieve get */
app.get('/', (req, res) => {
	res.send('It is working');
})

/*signin recieve post */
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

/*There is a bug in register ignoring empty input, fix it later */
/*register recieve post */
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

/*profile recieve get */
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

/*count recieve put */
app.put('/count', (req, res) => { count.handleCount(req, res, db) })

/*image recieve post */
app.post('/image', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`The server is listening on port ${process.env.PORT || 3000}`);
});