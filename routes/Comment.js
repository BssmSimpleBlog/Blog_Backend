const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

router.get('/:postId', async (req, res) => {
	const postId = req.params.postId;
	const comments = await Comments.findAll({ where: { PostId: postId } });
	res.json(comments);
});

router.post('/', async (req, res) => {
	const { commentBody, nickname, postId } = req.body;

	if (!nickname || !commentBody || !postId) {
		res.json({ error: '로그인 후에 이용해주세요' });
	} else {
		Comments.create(req.body);

		res.json('댓글작성 완료!');
	}
});

router.delete('/:commentId', async (req, res) => {
	const commentId = req.params.commentId;

	await Comments.destroy({ where: { id: commentId } });

	res.json('Delete Complete');
});

module.exports = router;
