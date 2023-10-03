const express = require('express');
const router = express.Router();
const { Post } = require('../models');

//Write Post
router.post('/', async (req, res) => {
	const { title, desc, categories, nickname } = req.body;
	await Post.create({
		title: title,
		desc: desc,
		nickname: nickname,
	});
	res.json('게시글 작성 완료');
});

module.exports = router;
