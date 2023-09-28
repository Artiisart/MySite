const database = require("./mydatabase")
const {DataTypes} = require("sequelize")
module.exports = database.define('MPost', {
    postName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postPic:{
        type: DataTypes.STRING,
        allowNull: true
    }
})
