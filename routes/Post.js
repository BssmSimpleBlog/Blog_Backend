const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddleware');

//Write Post
router.post('/', validateToken, async (req, res) => {
	const { title, desc, nickname, userid } = req.body;

	bcrypt.hash(title, 10).then((hash) => {
		Post.create({
			title: title,
			desc: desc,
			nickname: nickname,
			userid: userid,
			postid: hash,
		});
		res.json('게시글 작성 완료');
	});
});

//Update
router.put('/:id', validateToken, async (req, res) => {
	const { id, userid, title, desc } = req.body;

	if (id === req.params.id) {
		Post.findOne({ where: { id: id } }).then((post) => {
			if (post.userid === userid) {
				Post.update(
					{
						userid: userid,
						title: title,
						desc: desc,
					},
					{ where: { id: id } }
				);
				res.json('글 수정 완료');
			} else {
				res.json('글작성자만 글을 수정할 수 있습니다.');
			}
		});
	} else {
		res.json('게시글을 찾을 수 없습니다.');
	}
});

//Delete
router.delete('/:id', validateToken, async (req, res) => {
	const { id, userid } = req.body;

	if (validateToken == process.env.AUTH_ADMIN_HEADER) {
		Post.findOne({ where: { id: id } }).then((post) => {
			Post.destroy({ where: { id: id } });
			res.json('게시글 삭제 성공 (어드민 권한)');
		});
	} else {
		if (id === req.params.id) {
			Post.findOne({ where: { id: id } }).then((post) => {
				if (post.userid === userid) {
					Post.destroy({ where: { id: id } });
					res.json('게시글 삭제 성공');
				} else {
					res.json('글작성자만 글을 삭제할 수 있습니다.');
				}
			});
		} else {
			res.json('게시글을 찾을 수 없습니다.');
		}
	}
});

//Get Id
router.get('/:id', async (req, res) => {
	Post.findOne({ where: { id: req.params.id } }).then((post) => {
		if (post) {
			res.json(post);
		} else {
			res.json('해당 게시글을 찾을 수 없습니다.');
		}
	});
});

//Get ALL
router.get('/', async (req, res) => {
	Post.findAll().then((post) => {
		res.json(post);
	});
});

module.exports = router;
