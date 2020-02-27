

class DataBase{
    constructor(){
        let me = this;
        let sqliteSync = require('sqlite-sync');
        me.dbSync = sqliteSync.connect('dbsqlite.sqlite');
        let sqlite3 = require('sqlite3').verbose();
        me.db = new sqlite3.Database('dbsqlite.sqlite','OPEN_READWRITE');
        // console.log(me.db);
        // me.arr = [];
        //me.db.arrTest = [];
        // me.initializationTables();
        // me.initDataAnswers(me);
        //
        //  me.initDataQuestions(me);

        //me.insertValue('answers','string');
        //me.initDataQuestions(me);
        // me.db.each('SELECT content1,content2,content as answerContent FROM questions join answers on questions.idRightAnswer = answers.idAnswer',
        //     function(err, row) {
        //     console.log(row);
        // });
        // me.db.each('SELECT content FROM questions join answers on questions.idAnswer1 = answers.idAnswer where idQuest = 1',
        //     function(err, row) {
        //         console.log(row);
        // });
        //this.insertValue('users','fName','secName',0,null);


        // console.log(me.getTest(1));
        //this.insertValue('results',1,43,15);


        //me.returnAllDataFromTable('results');

        // me.resetTestCount(1);
        // me.returnAllDataFromTable('users');
        //console.log(typeof test);
        me.getTest(1);
        //console.log(test);
    };


    initializationTables(){
        let me = this;
        me.db.serialize(function() {
            me.db.run('Create TABLE if not exists users  (idUser Integer primary key AUTOINCREMENT, ' +
                'fName TEXT, ' +
                'sName TEXT, ' +
                'countFinishTests integer, ' +
                'testMark NUM)');

            me.db.run('Create TABLE if not exists questions (idQuest Integer primary key AUTOINCREMENT , ' +
                'content1 TEXT, ' +
                'content2 TEXT, ' +
                'idAnswer1 Integer default null, ' +
                'idAnswer2 Integer default null, ' +
                'idAnswer3 Integer default null, ' +
                'idAnswer4 Integer default null, ' +
                'idAnswer5 Integer default null, ' +
                'idAnswer6 Integer default null, ' +
                'idAnswer7 Integer default null, ' +
                'idRightAnswer Integer, ' +
                'FOREIGN KEY (idRightAnswer) REFERENCES answers(idRightAnswer) ON DELETE CASCADE ON UPDATE CASCADE)');

            me.db.run('Create TABLE if not exists answers (idAnswer Integer primary key AUTOINCREMENT , ' +
                'content TEXT UNIQUE)');

            me.db.run('Create TABLE if not exists results   (idResult Integer primary key AUTOINCREMENT , ' +
                'idUser Integer, ' +
                'idQuest Integer, ' +
                'idAnswer Integer, ' +
                'FOREIGN KEY (idUser) REFERENCES users(idUser) ON DELETE CASCADE ON UPDATE CASCADE ' +
                'FOREIGN KEY (idAnswer) REFERENCES answers(idAnswer) ON DELETE CASCADE ON UPDATE CASCADE ' +
                'FOREIGN KEY (idQuest) REFERENCES questions(idQuest) ON DELETE CASCADE ON UPDATE CASCADE)');

            me.db.run('CREATE TRIGGER IF NOT EXISTS addResTest \n' +
                '   AFTER INSERT ON results ' +
                'BEGIN\n' +
                ' update users \n' +
                ' set countFinishTests = countFinishTests + 1 \n' +
                ' where idUser = NEW.idUser;\n' +
                ' END');

            console.log('Create TABLE users');
        });

    };

    initDataAnswers(me){//answers
        me.insertValue('answers','Другое.');
        me.insertValue('answers','Числа от 0 до 9.');
        me.insertValue('answers','Числа от 0 до 10.');
        me.insertValue('answers','10 раз число 0.');
        me.insertValue('answers','10 раз число 10.');
        me.insertValue('answers','undefined');
        me.insertValue('answers','Будет ошибка.');
        me.insertValue('answers','null');
        me.insertValue('answers','Три: for, while и do...while.');
        me.insertValue('answers','0');
        me.insertValue('answers','1');
        me.insertValue('answers','2');
        me.insertValue('answers','3');
        me.insertValue('answers','4');
        me.insertValue('answers','5');
        me.insertValue('answers','6');
        me.insertValue('answers','7');
        me.insertValue('answers','8');
        me.insertValue('answers','9');
        me.insertValue('answers','10');
        me.insertValue('answers','12');
        me.insertValue('answers','Больше.');
        me.insertValue('answers','instanceof');
        me.insertValue('answers','constructor');
        me.insertValue('answers','parent');
        me.insertValue('answers','new');
        me.insertValue('answers','Все имеют специальное использование.');
        me.insertValue('answers','this');
        me.insertValue('answers','Да.');
        me.insertValue('answers','Объекту user.');
        me.insertValue('answers','Нет.');
        me.insertValue('answers','new Array.prototype.constructor(1, 2)');
        me.insertValue('answers','new Array(1, 2)');
        me.insertValue('answers','Array(1, 2)');
        me.insertValue('answers','[1, 2]');
        me.insertValue('answers','1..2');
        me.insertValue('answers','Все варианты правильные.');
        me.insertValue('answers','В первом выражении ошибка, что еще за «!!» ??');
        me.insertValue('answers','true');
        me.insertValue('answers','false');
        me.insertValue('answers','< script type="text/javascript" src="my.js"></script>');
        me.insertValue('answers','< script src="my.js"></script>');
        me.insertValue('answers','< script src="my.js"/>');
        me.insertValue('answers','< хачу-javascript отсюда="my.js">');
        me.insertValue('answers','\"truefalse\"');
        me.insertValue('answers','NaN');
        me.insertValue('answers','Одна и та же.');
        me.insertValue('answers','Разные.');
        me.insertValue('answers','С большой буквы переменные называть нельзя.');
        me.insertValue('answers','Слово «apple» является зарезервированным, нельзя использовать.');
        me.insertValue('answers','Ошибка: переменная не определена.');
        me.insertValue('answers','Только две: for и while.');
        me.insertValue('answers','Только одна: for.');
        me.insertValue('answers','В коде ошибка.');
        me.insertValue('answers','*');
        me.insertValue('answers','/');
        me.insertValue('answers','+');
        me.insertValue('answers','-');
        me.insertValue('answers','>>>');
        me.insertValue('answers','Разница в значении, которое возвращает такой вызов.');
        me.insertValue('answers','Разница в значении i после вызова.');
        me.insertValue('answers','Нет никакой разницы.');
        me.insertValue('answers','Да, существует значение x, для которого они работают по-разному.');
        me.insertValue('answers','Нет, они полностью взаимозаменяемы.');
        me.insertValue('answers','Нет никакой разницы.');
        me.insertValue('answers','Зависит от браузера.');
        me.insertValue('answers','Нет, вызов должен стоять после объявления.');
        me.insertValue('answers','Нет такой переменной после цикла.');
        me.insertValue('answers','Да, X – это undefined.');
        me.insertValue('answers','Да, X – это null.');
        me.insertValue('answers','Да, другое.');
        me.insertValue('answers','Нет, не бывает.');
        me.insertValue('answers','Hello');
        me.insertValue('answers','Возводит в степень.');
        me.insertValue('answers','Умножает число само на себя.');
        me.insertValue('answers','Нет такого оператора.');
        me.insertValue('answers','Вася.');
        me.insertValue('answers','Петя.');
        me.insertValue('answers','[object Object]');
        me.insertValue('answers','код функции f.');
        me.insertValue('answers','ошибка: слишком глубокая рекурсия.');
        me.insertValue('answers','ошибка: переменная f не определена.');
        me.insertValue('answers','другое.');
        me.insertValue('answers','\"\"');
        me.insertValue('answers','function');
        me.insertValue('answers','object');
        me.insertValue('answers','false, false.');
        me.insertValue('answers','false, true.');
        me.insertValue('answers','true, false.');
        me.insertValue('answers','true, true.');
        me.insertValue('answers','дудкин.');
        me.insertValue('answers','дупкин.');
        me.insertValue('answers','пупкин.');
        me.insertValue('answers','ляпкин-тяпкин.');
        me.insertValue('answers','string');

    };
    initDataQuestions(me){
        me.insertValue('questions','Чему равна длина arr.length массива arr?', 'let arr = [];\n' +
            'arr[1] = 1;\n' +
            'arr[3] = 33;}',10,11,12,13,14,22,null,14);
        me.insertValue('questions','Есть ли различия между проверками:','if( x <= 100 ) {...}\n' +
            '// и\n' +
            'if( !(x > 100) ) {...}',63,64,65,null,null,null,null,63);

        me.insertValue('questions','Какое будет выведено значение?','let x = 5;\nalert( x++ )',15,16,1,null,null,null,null,15);

        me.insertValue('questions','Что выведет alert?','alert(str); // ?\nvar str = "Hello";',71,6,7,null,null,null,null,6);

        me.insertValue('questions','Что делает оператор **?',null,73,74,75,null,null,null,null,73);

        me.insertValue('questions','Чему равно 0 || "" || 2 || undefined || true || falsе ?',null,10,83,12,6,39,40,null,12);

        me.insertValue('questions','Что выведет этот код?','f.call(f);\n' +
            '\n' +
            'function f() {\n' +
            '  alert( this );\n' +
            '}',78,79,80,81,82,null,null,79);

        me.insertValue('questions','Что выведет этот код?','if (function f(){}) {\nalert(typeof f);\n}',6,84,8,85,54,null,null,6);

        me.insertValue('questions','Что получится, если сложить true + false?',null,45,10,11,46,null,null,null,11);

        me.insertValue('questions','Чему равна переменная name?','let name = "пупкин".replace("п", "д")',90,91,92,93,null,null,null,91);

        me.insertValue('questions','Чему равен typeof null в режиме use strict?',null,8,6,85,94,null,null,null,85);

        me.insertValue('questions','Что выведет этот код?','let obj = {\n' +
            ' "0": 1,\n' +
            ' 0: 2\n' +
            '};\n' +
            '\n' +
            'alert( obj["0"] + obj[0] );',12,13,14,21,54,null,null,14);

        me.insertValue('questions','Что выведет этот код?','function F() { return F; }\n' +
            '\n' +
            'alert( new F() instanceof F );\n' +
            'alert( new F() instanceof Function );',86,87,88,89,null,null,null,87);

        me.insertValue('questions','Что выведет alert?','let str = "Hello";\n' +
            'str.something = 5;\n' +
            'alert(str.something); // ?',15,6,7,null,null,null,null,6);

        me.insertValue('questions','Что выведет этот код?','for(let i=0; i<10; i++) {\n' +
            '  setTimeout(function() {\n' +
            '    alert(i);\n' +
            '  }, 100);\n' +
            '}',2,3,4,5,46,null,null,2);

        me.insertValue('questions','Чему равно arr.length?','function MyArray() { }\n' +
            'MyArray.prototype = [];\n' +
            '\n' +
            'let arr = new MyArray();\n' +
            'arr.push(1, 2, 3);\n' +
            'alert(arr.length);',10,6,13,54,null,null,null,13);

        me.insertValue('questions','Что выведет sayHi при вызове через setTimeout?','let name = "Вася";\n' +
            'function sayHi() {\n' +
            '  alert(name);\n' +
            '}\n' +
            '\n' +
            'setTimeout(function() {\n' +
            '  let name = "Петя";\n' +
            '  sayHi();\n' +
            '}, 1000);',76,77,6,7,null,null,null,76);
    };
    insertValue(tableName,...values){
        let me = this;
        values.unshift(null);
        let placeholders = values.map((value) => '?').join(',');
        me.db.serialize(function() {
            let stmt = me.db.prepare('INSERT INTO ' + tableName + ' VALUES (' + placeholders + ')');
            stmt.run(values, function (err) {
                if (err) return console.log(err.message);
            });

        });
    };

    returnAllDataFromTable(table){
        let me = this;
        me.db.each('SELECT * FROM ' + table, function(err, row) {
            console.log(row);
        });
    };

    getTest(userId){
        //console.log('getTest');
        let me = this, arrId = [];
        let results = me.dbSync.run('SELECT idResult FROM results where idUser = ' + userId);

        for(let result in results){
            for (let key in result) {
                arrId.push(result[key]);
            }
        }
        console.log(arrId);

        let randomId = null;
        while(true)
        {
            randomId = me.getRandomInt(1,15);
            if(!arrId.includes(randomId)) break;
        }
        console.log(randomId);
        let test = [];
        results =  me.dbSync.run('SELECT * FROM questions where idQuest = ' + randomId)[0];
        for (let key in results) {
            test.push(results[key]);
        }
        console.log(test);
        return test;
    };


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    resetTestCount(userId){
        let me = this;
        me.db.run('update users set countFinishTests = 0 where idUser = ' + userId)
    }
    // calcResult(userId){
    //     let me = this;
    //     me.db.each('SELECT questions.idQuest, questions.idAnswer, results.idAnswer as userAnswer from results join questions on questions.idQuest = results.idQuest where idUser = ' + userId, function(err, row) {
    //         console.log(row);
    //     });
    // }

    nextTest() {
        console.log('nextTest');
    }

    tableDelete(table){
        let me = this;
        me.db.run('Drop TABLE '+table);
    };

    DBClose(){
      this.db.close();
    };
}

let db = new DataBase();


exports = module.exports;
exports.DataBase = DataBase;
