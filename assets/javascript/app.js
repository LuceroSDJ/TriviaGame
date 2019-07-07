$(document).ready(function() {

//Create an array of question objects to loop through
var questions = [
    {
        askQuestion: 'Which pair of genius minds founded Apple Computer Inc. in 1976 releasing the world\'s first mass-market personal computer?', 
        answer1: 'Steve Jobs & Steve Wozniak',
        answer2: 'Steve Jobs & Steve Carell',
        answer3: 'Steve Jobs & Steve Harvey',
        correctAnswer: 'Steve Jobs & Steve Wozniak', 
        imgCorrect: 'assets/images/steves.jpg',
        imgIncorrect: 'assets/images/box1.gif',
    },
    {
        askQuestion: 'Which pair of innovators are the authors of Mosaic, the 1st widely used Web Browser, and founders of Netscape?', 
        answer1: 'Marc Mozart & Eric Carr',
        answer2: 'Marc Andreessen & Eric Bina',
        answer3: 'Marc Anthony & Eric Bana',
        correctAnswer: 'Marc Andreessen & Eric Bina',
        imgCorrect: 'assets/images/AB.jpg',
        imgIncorrect: 'assets/images/box1.gif',
    },
    {
        askQuestion: 'Which company, also known as the Internet\'s "Big Bang," introduced the world wide "Navigator" Web Browser in the mid 1990\'s, and developed JavaScript to animate the Web?', 
        answer1: 'Microsoft',
        answer2: 'Nescafé',
        answer3: 'Nestcape',
        correctAnswer: 'Nestcape',
        imgCorrect: 'assets/images/nestcape.jpg',
        imgIncorrect: 'assets/images/box1.gif',
    }
];

//initialize global variable that will hold the time 
var secondsPerQuestion = 50;   //50 seconds. Here I am adding an extra second because there is a delay, which I will keep trying to fix.
//initialize variables to keep track of scores
var userInput; //here I want to capture the value of the li tag the user clicks
var ticktock; //setInterval
var unanswered = 0; //increment by 1 if unanswered
var correct = 0; //increment by 1 if answered correctly
var wrong = 0; //increment by onw if answered incorrectly
var i = 0; //questions array index of objects starts at zero so the 1st question is rendered to the page

//music: we include a path to the media we want to embed inside the src attribute
var audio = document.createElement('audio');
audio.setAttribute('src', 'assets/images/Audio1.mp3');
//on click event to play audio
$('#musicOn').on('click', function() {
    audio.play();
});

//on click event to pause audio
$('#musicOff').on('click', function() {
    audio.pause();
});

//select button tag & start "on click" function
$('.buttonToBeReplaced').on('click', function() {
    audio.play();
    //select button tag to be removed to later replace with new html content (questions)
    $('.buttonToBeReplaced').remove();  
    //show hidden html
    $('#mainDiv').show(); //show question & options
    //show timer
    $('.timer').show();
    //generate questions
    printQuestion();
    //decrement time per second with setInterval
    timeCount();
    // ticktock = setInterval(timeCount, 1000);
});

//generate question
function printQuestion() {
    if(i  < questions.length) {
        //add question & reset time
        $('h2').text(questions[i].askQuestion);
        $('.firstOption').text(questions[i].answer1);
        $('.secondOption').text(questions[i].answer2);
        $('.thirdOption').text(questions[i].answer3); 
        secondsPerQuestion = 50;
        ticktock = setInterval(timeCount, 1000);
    }
    else {
        clearInterval(ticktock);    //stop timer
        console.log(i);
        /* hold results for 5 seconds by using:
        ==== setTimeout(pass in function as paramenter, time) ===== */
        var holdResults = setTimeout(displayResults, 5000);  
    }; 
};

/* Next, create a click event function to capture when an li tag is clicked on.
& declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
$('li').on('click', function() { 
    //return the content of the selected element using .text() method
    userInput = $(this).text();
    //if var i is less than questions.length, generate the next question
    if(userInput === questions[i].correctAnswer && i < questions.length) {
        console.log(userInput);
        correct++;
        $('#correct').text(correct);  //I am not required to display the point here, but I will keep it here for now
        //hold image alert for 3 seconds congratulating the user
        correctImgAlert(); 
        //prevent our printQuestion function from running if current questions index number is equal to questions.length
        i++;
        printQuestion(); 
    }else if(userInput !== questions[i].correctAnswer && i < questions.length) {
        //increment wrong by 1
        wrong++;
        $('#wrong').text(wrong);
        //alert user answer is wrong and display the correct answer
        incorrectImgAlert();  
        i++;
        printQuestion();             
    };
});

//when user answers a question correctly, an animated alert showd be displayed
function correctImgAlert() {
    clearInterval(ticktock);
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgCorrect);
    image.css('height', '35%');
    image.css('width', '40%');
    $('.imgDiv').append(image);
    $('.winMssg').show();
    //then, I need to display the alert message for only 5 seconds
    holdAlert = setTimeout(function() {  
        $('.winMssg').hide();
        $('.imgDiv').empty();
        $('#mainDiv').show();
        timeCount();
        ticktock = setInterval(timeCount, 1000); 
    }, 5000);
};

function unansweredAlert() {
    clearInterval(ticktock);
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgCorrect);
    image.css('height', '35%');
    image.css('width', '40%');
    $('.imgDiv').append(image);
    $('.showCorrectAnswer').text(questions[i].correctAnswer);
    $('.unansweredMssg').show();
    //then, I need to display the alert message for only 2 seconds
    holdAlert = setTimeout(function() {  
        $('.unansweredMssg').hide();
        $('.imgDiv').empty();
        $('#mainDiv').show();
        timeCount();
        ticktock = setInterval(timeCount, 1000); 
    }, 5000);
};

function incorrectImgAlert() {
    clearInterval(ticktock);
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgIncorrect);
    $('.imgDivIncorrect').append(image);
    image.css('height', '35%');
    image.css('width', '40%');
    $('.showCorrectAnswer').text(questions[i].correctAnswer);
    $('.mssg').show();
    //then, I need to display the alert message for only 2 seconds
    holdAlert = setTimeout(function() {  
        $('.mssg').hide();
        $('.imgDivIncorrect').empty();
        $('#mainDiv').show();
        timeCount();
        ticktock = setInterval(timeCount, 1000); 
    }, 5000);  
};

function timeCount() { 
    //set conditions to initiate timer
    if(secondsPerQuestion != 0) {
        // display count down timer on the page
        $('#timeCountDown').text(secondsPerQuestion);
        secondsPerQuestion--;
    }else if(!userInput || secondsPerQuestion === 0) { 
        //check if we have not reached the max number of available questions
        if(i < questions.length) {
        i++;
        unanswered++;
        $('#unanswered').text(unanswered);
        // display count down timer on the page
        $('#timeCountDown').text(secondsPerQuestion);
        unansweredAlert();
        printQuestion();
        };
    };
};

//we need the timer to stop /freeze when results are displayed at the end of the game
function displayResults() {
    //Stop timer from running while results are displayed
    clearInterval(ticktock);
    $('#mainDiv').hide();
    $('#resultsDiv').show();         
};

/*when restart button is clicked do the following:
i must be reset back to 0
first question needs to be reprinted*/
$('#restart').on('click', function() {
    correct = 0;
    $('#correct').text(correct);
    wrong = 0;
    $('#wrong').text(wrong);
    unanswered = 0;
    $('#unanswered').text(unanswered);
    $('#resultsDiv').hide();
    $('#mainDiv').show();
    i = 0;
    printQuestion();
    timeCount();
    //set interval
    ticktock = setInterval(timeCount, 1000);   
});

//closes $(document).ready(function() 
});