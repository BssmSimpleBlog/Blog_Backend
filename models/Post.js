module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('Post', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		desc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Post;
};
