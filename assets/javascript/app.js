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
var i = 0; //questions array index of objects

//test music
var audio = document.createElement("audio");
audio.setAttribute("src", "assets/images/Audio1.mp3");

$('#musicOn').on('click', function() {
    audio.play();
});

$('#musicOff').on('click', function() {
    audio.pause();
});

//select button tag & start on click function
$('.buttonToBeReplaced').on('click', function() {
    audio.play();
    //select button tag to be removed, and later replaced with new html content (questions)
    $('.buttonToBeReplaced').remove();  
    //show hidden html
    $('#mainDiv').show();
    //show timer
    $('.timer').show();
    printQuestion();
    //decrement time per second with setInterval
    timeCount();
    ticktock = setInterval(timeCount, 1000);
});

//generate question
function printQuestion() {
    if(i  < questions.length) {
        //add question 
        $('h2').text(questions[i].askQuestion);
        console.log('i am iside of: ' + i);
        $('.firstOption').text(questions[i].answer1);
        $('.secondOption').text(questions[i].answer2);
        $('.thirdOption').text(questions[i].answer3); 
        //reset time 
        secondsPerQuestion = 50;
    }else{
        clearInterval(ticktock);
        console.log(i);
        // hold results for 5 seconds then show results
        var holdResults = setTimeout(function() { 
            console.log('release results');
            displayResults(); 
    }, 5000);   
}};


/*Next, create a click event funciton to capture when an li tag is clicked on.
& declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
$('li').on('click', function() { 
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
    //set conditions for when the time should be running
    console.log('seconds per question' + secondsPerQuestion);
    if(0 < secondsPerQuestion) {
        $('#timeCountDown').text(secondsPerQuestion);
        secondsPerQuestion--; //I changed the order of lines 168 & 169, now timer reaches zero
    /*the else if statement below will take us to the next question with NO USER INPUT
    it works if the first question goes unanswered or if all questions go unanswered only */
    }else if(!userInput || 0 === secondsPerQuestion) {  
        if(i < questions.length) {
        $('#timeCountDown').text(secondsPerQuestion);
        unanswered++;
        $('#unanswered').text(unanswered);
        unansweredAlert();
        i++;
        console.log('this is i: ' + i);
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
    audio.pause();
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