var express = require("express");
var bodyParser = require('body-parser');

const min = 1;
const max = 10000;
var random_number = Math.floor(Math.random() * (max - min) + min);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    random_number = Math.floor(Math.random() * (max - min) + min);

    res.render('index', {
        min: min,
        max: max
    });
});

class GuessResult {
    constructor(success, message){
        this.success = success;
        this.message = message;
    }
};

function checkGuessed (guessed_number, random_number){
    if (guessed_number > random_number) {
        return new GuessResult(false, "The number is smaller. Try again!");
    }
    if (guessed_number < random_number) {
        return new GuessResult(false, "The number is bigger. Try again!");
    }
    return new GuessResult(true, "Congratulations! You guessed the number!");
};

app.post('/guess', (req, res) => {
    var guessed_number = req.body.guessed_number;
    res.send(checkGuessed(guessed_number,random_number));
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});