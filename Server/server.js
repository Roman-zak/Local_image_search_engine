const express = require('express')
var bodyParser = require('body-parser')
//const mysql = require('mysql')
const app = express()
const models = require('D:\\PVI\\Navbar-Demo-master\\Mini-Google\\Server\\models');
const port = 5000
const multer = require("multer");
const { Model } = require('sequelize');
//was const { DataTypes } = require("sequelize/type");
const { DataTypes, Op } = require("sequelize");
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const upload = multer({storage:multer.memoryStorage()});

var urlencodedParser = bodyParser.urlencoded({ extended: false})
app.listen(port, () => {
    console.log("server started")
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/' , (req, res) =>{
    res.send('Hello World!')
} )

// app.post('/upload' , (req, res) =>{
//     res.send('Hello World!')
// } )

function save(req, res){
    var fileUrl = req.body.result.imageUrl;
    var tags = req.body.result.tags;
    console.log(fileUrl +" "+tags);
    if(fileUrl==""||tags==""){
        res.send("Fill all fields");
    }
    else{
        const image = {
            fileUrl: req.body.result.imageUrl,
            tags: req.body.result.tags,
        }
        models.Image.create(image).then(result =>{
            res.status(210).json({
                message : "Succes!"
               // image : result
            });
        })
        .catch(error => {
            res.status(510).json({
                message : "Error:("
               // image : result
            });
            console.log(error);
        })  
    }
}
function search(req, res){
    var tags = req.body.result.tags;
    console.log(tags);
    if(tags==""){
        res.send("Fill tags");
    }
    else{
        const words = tags.split(' ');
        console.log(words);
        models.Image.sync({alter:true}).then(()=>{
            return models.Image.findAll({
                where:{
                    tags: {
                        [Op.substring]:tags
                    }
                }
            });
        }).then((data)=> {
            data.forEach(element => {
                console.log(element.toJSON());//
            });
            res.status(210).json({
                message : "Succes!",
                images : data
            });
            // data.map(element=>element.toJSON());
            // data.forEach(element => {
            //     console.log(element);//.toJSON()
            // });
        })
        .catch((err)=>{
            console.log(err);
        }) 
    }
}
function deleteRec(req, res){
    var idToDel = req.body.deletData.idToDel;
    console.log("id to del: "+ idToDel);
    if(idToDel==""){
        res.send("Fill id");
    }
    else{
        models.Image.sync({alter:true}).then(()=>{
            return models.Image.destroy({
                where:{
                    id: idToDel
                }
            });
        }).then((data)=> {
            res.status(210).json({
                message : "Successfully deleted!",
            });
        })
        .catch((err)=>{
            res.status(510).json({
                message : "Error:(",
            });
            console.log(err);
        }) 
    }
}
function editRec(req, res){
    var idToEd = req.body.editData.idToEd;
    var tagsNew = req.body.editData.tagsNew;
    console.log("id to update: "+ idToEd);
    if(idToEd=="" || tagsNew==""){
        res.status(510).json({
            message : "Fill all fields"
        });
    }
    else{
        models.Image.sync({alter:true}).then(()=>{
            return models.Image.update(
                {
                    tags:tagsNew
                },
                {
                    where:
                    {
                        id: idToEd
                    }
                }
            );
        }).then((data)=> {
            res.status(210).json({
                message : "Successfully updated!",
            });
        })
        .catch((err)=>{
            res.status(510).json({
                message : "Error:(",
            });
            console.log(err);
        }) 
    }
}
app.post('/upload', save);
app.post('/search', search);
app.post('/delete', deleteRec);
app.post('/edit', editRec);