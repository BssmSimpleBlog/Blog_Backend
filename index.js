const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(
	cors({
		origin: '*',
		credentials: true,
		withCredentials: true,
		optionsSuccessStatus: 200,
	})
);

//Port Setting
const PORT = process.env.PORT || 3000;

//API Test
app.get('/', (req, res) => {
	res.send('API Running');
});

//DataBase
const db = require('./models');

//DataBase Router Call
const usersRouter = require('./routes/Users');
app.use('/auth', usersRouter);

//Port
db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
