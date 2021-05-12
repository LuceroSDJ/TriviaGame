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
        answer3: 'Netscape',
        correctAnswer: 'Netscape',
        imgCorrect: 'assets/images/nestcape.jpg',
        imgIncorrect: 'assets/images/box1.gif',
    }
];

//initialize global variables 
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






//generate question
function printQuestion() {
    if(i  < questions.length) {
        //add question, reset time & call setInterval() method
        $('.question').text(questions[i].askQuestion);
        $('.firstOption').text(questions[i].answer1);
        $('.secondOption').text(questions[i].answer2);
        $('.thirdOption').text(questions[i].answer3); 
        secondsPerQuestion = 50;
    }
    else {
        console.log(i);
        clearInterval(ticktock);    //stop timer
        /* hold results for 5 seconds to display the correct answer for 5 seconds
        ==== setTimeout(pass in function as paramenter, time) ===== */
        var holdResults = setTimeout(displayResults, 5000);  
    }; 
};





function timeCount() { 
    //set conditions to initiate timer
    if(secondsPerQuestion != 0) {
        // display count down timer on the page then decrement seconds by one
        $('#timeCountDown').text(secondsPerQuestion);
        secondsPerQuestion--;
        $('#unanswered').text(unanswered);
    }
    //check if we have not reached the max number of available questions
    else if(!userInput || secondsPerQuestion === 0 && i < questions.length) { 
        unanswered++;
        $('#unanswered').text(unanswered);
        // display count down timer on the page
        $('#timeCountDown').text(secondsPerQuestion);
        unansweredAlert();
        i++;
        printQuestion();
    }
};




//select button tag & start "on click" function
$('.buttonToBeReplaced').on('click', function() {
    $(".emptyDiv").css("background-color","green");
    audio.play();
    //select button tag to be removed to later replace with new html content (questions)
    $('.buttonToBeReplaced').hide(1000);    
    //show hidden html
    $('#mainDiv').show(1000); //show question & options
    //show timer
    $('.timer').show();
    $('#timeCountDown').text(secondsPerQuestion);
    //generate questions
    printQuestion();
    //decrement time by one, which is the second we hold timeCount() with setInterval() method
    timeCount();
    // secondsPerQuestion--;
    //pass in timeCount() as parameter
    ticktock = setInterval(timeCount, 1000);
});



function clickEvent() {
    //return the content of the selected element using .text() method
    userInput = $(this).text();  
    if(userInput === questions[i].correctAnswer && i < questions.length) {
        console.log(userInput);
        correct++;
        $('#correct').text(correct);  //I am not required to display the point here, but I will keep it here for now
        //hold image alert for 5 seconds congratulating the user
        //prevent our printQuestion function from running if current questions index number is equal to questions.length
        correctImgAlert(); 
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
}


/* Next, create a click event function to capture when an li tag is clicked on.
& declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
$('li').on('click', clickEvent);



// ++++++++++++++++++++++++++++++++++++++++++++++++

            // /* Next, create a click event function to capture when an li tag is clicked on.
            // & declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
            // $('li').on('click', function() { 
            //     //return the content of the selected element using .text() method
            //     userInput = $(this).text();
            //     //if var i is less than questions.length, generate the next question
            //     if(userInput === questions[i].correctAnswer && i < questions.length) {
            //         console.log(userInput);
            //         correct++;
            //         $('#correct').text(correct);  //I am not required to display the point here, but I will keep it here for now
            //         //hold image alert for 5 seconds congratulating the user
            //         //prevent our printQuestion function from running if current questions index number is equal to questions.length
            //         correctImgAlert(); 
            //         i++;
            //         printQuestion(); 
            //     }else if(userInput !== questions[i].correctAnswer && i < questions.length) {
            //         //increment wrong by 1
            //         wrong++;
            //         $('#wrong').text(wrong);
            //         //alert user answer is wrong and display the correct answer
            //         incorrectImgAlert();  
            //         i++;
            //         printQuestion();             
            //     };
            // });
// +++++++++++++++++++++++++++++++++++++++++++++





//when user answers a question correctly, an animated alert showd be displayed
function correctImgAlert() {
    clearInterval(ticktock);
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgCorrect);
    image.css('height', '35%');
    image.css('width', '40%');
    $('.imgDiv').append(image);
    $('.winMssg').show(2000);
    //then, I need to display the alert message for only 5 seconds
    setTimeout(function() {  
        $('.winMssg').hide();
        $('.imgDiv').empty();
        $('#mainDiv').show();
        timeCount();
        ticktock = setInterval(timeCount, 1000); 
    }, 5000);
};

function unansweredAlert() {
    //stop timer & hide mainDiv to show correct answer
    clearInterval(ticktock);
    $('#mainDiv').hide();
    //add image on the fly
    //note: image tag is not hidden, it is just empty at this point. Image is appended in the 5th line below
    var image = $('<img>');
    image.prop('src', questions[i].imgCorrect);
    image.css('height', '35%');
    image.css('width', '40%');
    $('.imgDiv').append(image);
    $('.showCorrectAnswer').text(questions[i].correctAnswer);  //spam.text() with in <p> tag
    $('.unansweredMssg').show(2000);  //show <p> tag
    //then, I need to display the alert message for a few seconds, therefore, I must holds the code below for a few seconds as well
    setTimeout(function() {  
        if(i < questions.length) {
            $('.unansweredMssg').hide();
            $('.imgDiv').empty();
            $('#mainDiv').show();
            timeCount();
            ticktock = setInterval(timeCount, 1000); 
        }
        else if(i === questions.length) {
            $('.unansweredMssg').hide();
            $('.imgDiv').empty();
            displayResults();
        }
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
    setTimeout(function() {  
        $('.mssg').hide();
        $('.imgDivIncorrect').empty();
        $('#mainDiv').show();
        timeCount();
        ticktock = setInterval(timeCount, 1000); 
    }, 5000);  
};







//we need the timer to stop /freeze when results are displayed at the end of the game
function displayResults() {
    //Stop timer from running while results are displayed
    clearInterval(ticktock);
    //hide mainDiv & timer
    $('#mainDiv').hide();
    $('.timer').hide();
    $('#resultsDiv').show();         
};

/*when restart button is clicked do the following:
i must be reset back to 0
first question needs to be reprinted*/
$('#restart').on('click', function() {
    i = 0;
    wrong = 0;
    correct = 0;
    unanswered = 0;
    $('#wrong').text(wrong);
    $('#correct').text(correct);
    $('#unanswered').text(unanswered);
    $('#resultsDiv').hide();
    $('#mainDiv').show();
    printQuestion();
    timeCount();
    //set interval
    ticktock = setInterval(timeCount, 1000);   
});

//closes $(document).ready(function() 
});