const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

//Register
router.post('/', async (req, res) => {
	const { userid, password, email, nickname } = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		Users.create({
			userid: userid,
			password: hash,
			email: email,
			nickname: nickname,
		});
		res.json('회원가입 성공!');
	});
});

//Login
router.post('/login', async (req, res) => {
	const { userid, password } = req.body;

	const user = await Users.findOne({ where: { userid: userid } });

	if (!user) {
		return res.json({ error: '존재하지 않는 아이디입니다.' });
	}

	bcrypt.compare(password, user.password).then((match) => {
		if (!match)
			return res.json({
				error: '비밀번호가 일치하지 않습니다.',
			});

		// accessToken 발급및 Respond
		const accessToken = sign({ userid: user.userid }, 'importantsecret');
		return res.json({ code: 200, token: accessToken, userid: userid });
	});
});

module.exports = router;
