const express = require('express');
const bodyP = require('body-parser');
const { DataBase } = require('../database.js');

const app = express(),
    DIST_DIR = __dirname,
    PROJ_DIR = 'D:/Site/Test/',
    WORK_PROJ_DIR = 'D:/Диплом/Site/Test/';

// const PROJ_DIR = WORK_PROJ_DIR;

const db = new DataBase();

db.initializationTables();

const jsonParser = bodyP.json();
console.log(jsonParser);
const urlencodedP = bodyP.urlencoded({extended: false});

app.set('view engine','ejs');

app.use(express.static(PROJ_DIR));

app.get('/', (req, res) => {
    res.sendFile(PROJ_DIR + 'html/MainPage.html')
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening tto ${PORT}....`);
    console.log('Press Ctrl+C to quit.')
});

app.get('/reg', (req, res) => {
    res.sendFile(PROJ_DIR + 'html/registryPage.html');
});


app.get('/page/:id', (req, res) => {
    res.sendFile(PROJ_DIR + 'html/page' + req.params.id +'.html');
});


// app.post('/test',(req, res) => {
//     if(!req.body) return res.sendStatus(400);
//     let DBdata = {firstName:req.body.firstName, secName:req.body.secondName};
//     let isExist = db.returnUserId(DBdata.firstName,DBdata.secName);
//
//     if(isExist == null) db.insertValue('users',DBdata.firstName,DBdata.secName,0, null);
//
//     let userId = db.returnUserId(DBdata.firstName,DBdata.secName);
//     let result = db.getTest(userId);
//     console.log(result);
//     let answerArr = [];
//
//     answerArr.push(db.returnAnswerById(result.idAnswer1));
//     answerArr.push(db.returnAnswerById(result.idAnswer2));
//     answerArr.push(db.returnAnswerById(result.idAnswer3));
//     answerArr.push(db.returnAnswerById(result.idAnswer4));
//     answerArr.push(db.returnAnswerById(result.idAnswer5));
//     answerArr.push(db.returnAnswerById(result.idAnswer6));
//     answerArr.push(db.returnAnswerById(result.idAnswer7));
//
//     let test = {};
//     test.idQuest = result.idQuest;
//     test.content1 = result.content1;
//     test.content2 = result.content2;
//     test.firstName  = req.body.firstName;
//     test.secName  = req.body.secondName;
//     test.countFinishTests  = result.countFinishTests;
//     test.answers = answerArr;
//
//     db.insertValue('results', userId, test.idQuest, null);
//
//     console.log(test);
//     res.render('testpage',{testData:test});
// });
//

app.post('/test',urlencodedP,function (req,res) {//регистрация
    if(!req.body) return res.sendStatus(400);
    let DBdata = null,  isExist = false, userId, result;

    if(req.body.firstName && req.body.secondName) {
        DBdata = {firstName:req.body.firstName, secName:req.body.secondName};
        let isExist = db.returnUserId(DBdata.firstName,DBdata.secName);
        if(isExist == null) db.insertValue('users',DBdata.firstName,DBdata.secName,0, null);
        userId = db.returnUserId(DBdata.firstName,DBdata.secName);
    }
    else{
        console.log(req.body);
        userId = req.body.idUser;
    }

    let countFinishTests  = db.returnTestCount(userId);
    if(countFinishTests === 15){
        res.render('testpage', {testData: test});
    }
    else {
        if (req.body.answer) {
            let arrId = req.body.answersIds.split(',');
            db.updateResult('results', userId, req.body.idQuest, arrId[Number(req.body.answer)]);
        }

        result = db.getTest(userId);
        let answerIdArr = [];

        answerIdArr.push(result.idAnswer1);
        answerIdArr.push(result.idAnswer2);
        answerIdArr.push(result.idAnswer3);
        answerIdArr.push(result.idAnswer4);
        answerIdArr.push(result.idAnswer5);
        answerIdArr.push(result.idAnswer6);
        answerIdArr.push(result.idAnswer7);

        let answerArr = [];

        answerArr.push(db.returnAnswerById(result.idAnswer1));
        answerArr.push(db.returnAnswerById(result.idAnswer2));
        answerArr.push(db.returnAnswerById(result.idAnswer3));
        answerArr.push(db.returnAnswerById(result.idAnswer4));
        answerArr.push(db.returnAnswerById(result.idAnswer5));
        answerArr.push(db.returnAnswerById(result.idAnswer6));
        answerArr.push(db.returnAnswerById(result.idAnswer7));

        answerArr = answerArr.filter(function (el) {
            return el != null;
        });
        answerIdArr = answerIdArr.filter(function (el) {
            return el != null;
        });

        let isNewResult = db.checkResult(userId, result.idQuest);

        if (isNewResult) db.insertValue('results', userId, result.idQuest, null);

        let test = {};
        test.idQuest = result.idQuest;
        test.content1 = result.content1;
        test.content2 = result.content2;
        test.userId = userId;

        test.answers = answerArr;
        test.answersIds = answerIdArr;
        test.countFinishTests = db.returnTestCount(userId);
        res.render('testpage', {testData: test});
    }
});


app.post('/next',urlencodedP,function (req,res) {
    if(!req.body) return res.sendStatus(400);
    let data = {firstName:req.body.firstName, secName:req.body.secondName};
    //db.insertValue('users',data.firstName,data.secName, null);

    db.showAllDataFromTable('users');
    res.render('testpage',{data:data});
});