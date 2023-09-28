//TODO: !!!!!Solve problem with getting information from picture!!!!!
//serv part
const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
var upload1 = multer();
//var bodyParser = require('body-parser');

const serv = express()
const port = 3000
serv.use(express.json())

//

// for parsing multipart/form-data
serv.use(upload1.array());
serv.use(express.static('public'));


//db_part

const database = require("./mydatabase")
const DataTypes = require("sequelize")
const userModel = require("./userModel")
const usPostModel = require("./usPostModel")

const myserver = async (newName, newMail, newPass) => {// creating user
    try {
        await database.authenticate()
        console.log("Data connection established")
        await database.sync()
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    const user = await userModel.create({
        username: newName,
        mail: newMail,
        password: newPass,
        userAva: "image_4.png"
    })
    console.log(user)

    /*
    const user = await userModel.findOne({
        where:{
            username: 'Ivan'
        }
    })
    console.log(user.username + '\n' + user.mail + '\n' + user.password)*/
}
//server_part


serv.use(cors({
    origin: ['http://localhost:63342']
}))


serv.listen(port, () => {
})

const signInF = async (newName, newPass) => { //Searching user
    try {
        await database.authenticate()
        console.log("Data connection established")
        await database.sync()
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    const user = await userModel.findOne({
        where:{
            username: newName,
            password: newPass
        }
    })
    if(user !== null){
        let a = fs.readFileSync('user_avas/' + user.userAva)
        fs.writeFileSync('wow1.png', a)
        console.log("hello")
        return "exist"
    }
    else {
        return "error"
    }
}

const usFind = async (newName, newPass) => { //Searching user
    try {
        await database.authenticate()
        console.log("Data connection established")
        await database.sync()
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    const user = await userModel.findOne({
        where:{
            username: newName,
            password: newPass
        }
    })
    if(user !== null){
        console.log("hello")
        return user.id
    }
    else {
        return "error"
    }
}
const newAva = async (newName, newPass) => { //Searching user
    try {
        await database.authenticate()
        console.log("Data connection established")
        await database.sync()
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    const user = await userModel.findOne({
        where:{
            username: newName,
            password: newPass
        }
    })
    if(user !== null){
        console.log("hello")
        while (fs.existsSync('user_avas/Name' + i.toString() +'.jpg')){
            i++
        }
        await userModel.update({ userAva: 'user_avas/Name' + i.toString() +'.jpg'}, {
            where:{
                username: newName,
                password: newPass
            }
        })
        return user.id
    }
    else {
        return "error"
    }
}

const allPost = async () => { //Finding all posts
    try {
        await database.authenticate()
        console.log("Data connection established")
        await database.sync()
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    const post = await usPostModel.findAll({
        where:{
        }
    })

    if(post !== null){
        let us_list = []
        for(let i = 0; i < post.length; i++){
            let usname = await userModel.findOne({
                where:{
                    id: post[i].userId
                }
            })
            us_list.push({"username": usname.username, "postName": post[i].postName, "postText": post[i].postText})
        }
        return us_list
    }
    else {
        return "error"
    }
}

const newPost = async (uID, postName, postText) => {// creating post
    try {
        await database.authenticate()
        console.log("Data connection established")
        await database.sync()
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    const npost = await usPostModel.create({
        postName: postName,
        postText: postText,
        postPic: "image_4.png",//for test
        userId: uID
    })/*
    console.log(user)*/
    return "created"

}

serv.post('/signUp', cors(), (req, res) => {//Sign up
    const body = req.body
    myserver(body.name, body.mail, body.password)
    console.log(body.name + /*" " + body.email +*/ " " + body.password)/*
    userAdd(body.name)*/
    return res.send(body.name + /*" " + body.email +*/ " " + body.password)
})


serv.post('/signIn', cors(), async (req, res) => {//sign in
    const body = req.body
    const a = await signInF(body.name, body.password)
    return res.send(a)
})


serv.post('/profile', cors(), async (req, res) => {//checking user for giving profile data
    const body = req.body
    const a = await signInF(body.name, body.password)
    if(a === "exist"){
        res.send(a)
    }
})

serv.post('/newPost', cors(), async (req, res) => {// creating post
    const body = req.body
    const a = await signInF(body.name, body.password)
    if (a === "exist"){
        const usId = await usFind(body.name, body.password)
        const ifcrea = await newPost(usId, body.postName, body.postText)
        console.log(usId)
        return res.send(ifcrea)
    }
    else {
        return res.send("error")
    }/*
    return res.send(a)*/
})

serv.post('/allPosts', cors(), async (req, res) => {//Sending all posts to client
    const a = await allPost()
    return res.send(a)
})
serv.get('/us_ava', (req, res)=>{//Getting data from user
    /*res.download('Test_vid.mkv')*/
    console.log("sent")
    let a = path.resolve(__dirname, './wow1.png')
    res.sendFile(a)
})

//part for working with files

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // '/files' это директория в которую будут сохранятся файлы
        cb(null, 'user_avas/')
    },
    filename: (req, file, cb) => {
// Возьмем оригинальное название файла, и под этим же названием сохраним его на сервере
        const { originalname } = file
        let i = 1

        while (fs.existsSync('user_avas/Name' + i.toString() +'.jpg')){
            i++

        }
        cb(null, 'Name'+ i.toString() +'.jpg')
    }
})
const upload = multer({ storage: storage })
serv.post(
    '/newUsAva',
    // Указываем multer в каком поле брать файл
    upload. single('file'),
    (req, res) => {
        /*console.log(req.getAll())*/
        console.log("reading")/*
    res.json({status: 'Saved'})*/
        res.send("saved")
    })

/*
serv.get('/find', cors(), (req, res) => {

})*/
