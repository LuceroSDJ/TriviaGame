$(document).ready(function() {

//Create an array of question objects to loop through
var questions = [
    {
        askQuestion: 'Which pair of genius minds founded Apple Computer Inc. in 1976 releasing the world\'s first mass-market personal computer?', 
        answer1: 'Steve Jobs & Steve Wozniak',
        answer2: 'Steve Jobs & Steve Carell',
        answer3: 'Steve Jobs & Steve Harvey',
        correctAnswer: 'Steve Jobs & Steve Wozniak', //this indicates the index number of the correct answer(not anymore). Now, it represents the value
        imgCorrect: 'assets/images/person1.jpg',
        imgIncorrect: 'assets/images/box1.gif',
    },
    {
        askQuestion: 'Which pair of innovators are the authors of Mosaic, the 1st widely used Web Browser, and founders of Netscape?', 
        answer1: 'Marc Mozart & Eric Carr',
        answer2: 'Marc Andreessen & Eric Bina',
        answer3: 'Marc Anthony & Eric Bana',
        correctAnswer: 'Marc Andreessen & Eric Bina',
        imgCorrect: 'assets/images/box3.jpg',
        imgIncorrect: 'assets/images/box1.gif',
    },
    {
        askQuestion: 'Which company, also known as the Internet\'s "Big Bang," introduced the world wide "Navigator" Web Browser in the mid 1990\'s, and developed JavaScript to animate the Web?', 
        answer1: 'Microsoft',
        answer2: 'Nescafé',
        answer3: 'Nestcape',
        correctAnswer: 'Nestcape',
        imgCorrect: 'assets/images/box4.jpg',
        imgIncorrect: 'assets/images/box1.gif',
    }
];

//initialize global variable that will hold the time 
var secondsPerQuestion = 6;   //50 seconds
//initialize variables to keep track of scores
var userInput; //here I want to capture the value of the li tag the user clicks
var ticktock; //timer
var unanswered = 0; //increment by 1 if unanswered
var correct = 0; //increment by 1 if answered correctly
var wrong = 0; //increment by onw if answered incorrectly
var i = 0; //questions array index of objects

//select button tag & start on click function
$('button').on('click', function() {
    //select button tag to be removed, and later replaced with new html content (questions)
    $('button').remove();  //esta esta funcionando bien!
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
        //reset time 
        secondsPerQuestion = 6;
        //add question 
        $('h2').text(questions[i].askQuestion);
        console.log('i am iside of: ' + i);
        $('.firstOption').text(questions[i].answer1);
        $('.secondOption').text(questions[i].answer2);
        $('.thirdOption').text(questions[i].answer3); 
       
   //}else if(questions[i] === questions.length) {
        //i = 0;
    }else{
        clearInterval(ticktock);
        console.log(i);
        // hold results for 2 seconds then show results
        var holdResults = setTimeout(function() { 
            console.log('release results');
            displayResults();  
      }, 2000);   
}};


/*Next, create a click event funciton to capture when an li tag is clicked on.
& declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
//function userClickedLi() {
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
    }else if(!userInput && 0 === secondsPerQuestion) {
        unanswered++;
        $('#unanswered').text(unanswered);
        i++;
        console.log('this is i: ' + i);
        //secondsPerQuestion = 6;
        printQuestion();
    }
        
    
    //increment the index number in 'questions' array 
    
    //i++;
    //printQuestion(); 
});
//};


//when user answers a question correctly, an animated alert showd be displayed
function correctImgAlert() {
    clearInterval(ticktock);
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgCorrect);
    image.css('height', '20%');
    image.css('width', '25%');
    $('.imgDiv').append(image);
    //I need to stop the timer
    //$('.imgDiv').show();
    $('.winMssg').show();
    holdAlert = setTimeout(function() {  
        $('.winMssg').hide();
        $('.imgDiv').empty();
        $('#mainDiv').show();
        timeCount();
        ticktock = setInterval(timeCount, 1000); 
    }, 2000);
    //then, I need to display the alert message for only 3 seconds
};

function incorrectImgAlert() {
    clearInterval(ticktock);
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgIncorrect);
    $('.imgDivIncorrect').append(image);
    image.css('height', '20%');
    image.css('width', '25%');
    $('#showCorrectAnswer').text(questions[i].correctAnswer);
    //I need to stop the timer
    //$('.imgDiv').show();
    $('.mssg').show();
    //ticktock = setInterval(timeCount, 1000);
    holdAlert = setTimeout(function() {  
        $('.mssg').hide();
        $('.imgDivIncorrect').empty();
        $('#mainDiv').show();
        //secondsPerQuestion = 30;
        timeCount();
        ticktock = setInterval(timeCount, 1000);
        //i++;
        //printQuestion();  
    }, 2000);
    //then, I need to display the alert message for only 2 seconds
};

function timeCount() { 
    //set conditions for when the time should be running
    console.log('seconds per question' + secondsPerQuestion);
    if(0 < secondsPerQuestion) {
        secondsPerQuestion--; //I changed the order of lines 168 & 169, now timer reaches zero
        $('#timeCountDown').text(secondsPerQuestion);
    }else if(!userInput && 0 === secondsPerQuestion) {
        unanswered++;
        $('#unanswered').text(unanswered);
        i++;
        console.log('this is i: ' + i);
        //secondsPerQuestion = 6;
        printQuestion();
    }
};
//timeCount();

//we need the timer to stop /freeze when results are displayed at the end of the game
function displayResults() {
    //Stop timer from running while results are displayed
    clearInterval(ticktock);
    $('#mainDiv').hide();
    $('#resultsDiv').show();
            
};


    $('#restart').on('click', function() {
        i = 0;
        printQuestion();correct = 0;
        wrong = 0;
        unasnwered = 0;
        $('#resultsDiv').hide();
        $('#mainDiv').show();
        timeCount();
        //set interval
        ticktock = setInterval(timeCount, 1000);
        // i must be set back to zero. i has been set back to zero, however, the question is not regenerated (bug) *********
        
    });
    //when restart button is clicked do the following:
    //i must be reset back to 0
    //first question needs to be reprinted, then second and so on
    
    //timer reset to 30 seconds


//left off on line 87
//bug: see line 155

//closes $(document).ready(function() 
});