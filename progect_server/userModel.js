const database = require("./mydatabase")
const {DataTypes} = require("sequelize")
const usPostModel = require('./usPostModel')

const userModel = database.define('User', {
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    mail:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userAva:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

userModel.hasMany(usPostModel, {
    as: 'todos',
    foreignKey: 'userId'
})
usPostModel.belongsTo(userModel, {
    foreignKey: "userId"
})


module.exports = userModel