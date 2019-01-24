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
        imgIncorrect: 'assets/images/estrellas.gif',
    },
    {
        askQuestion: 'Which pair of innovators are the authors of Mosaic, the 1st widely used Web Browser, and founders of Netscape?', 
        answer1: 'Marc Mozart & Eric Carr',
        answer2: 'Marc Andreessen & Eric Bina',
        answer3: 'Marc Anthony & Eric Bana',
        correctAnswer: 'Marc Andreessen & Eric Bina',
        imgCorrect: 'assets/images/testIMG2.gif',
        imgIncorrect: 'assets/images/estrellas.gif',
    },
    {
        askQuestion: 'Which company, also known as the Internet\'s "Big Bang," introduced the world wide "Navigator" Web Browser in the mid 1990\'s, and developed JavaScript to animate the Web?', 
        answer1: 'Microsoft',
        answer2: 'Nescafé',
        answer3: 'Nestcape',
        correctAnswer: 'Nestcape',
        imgCorrect: 'assets/images/testIMG3.gif',
        imgIncorrect: 'assets/images/estrellas.gif',
    }
];

//initialize global variable that will hold the time 
var secondsPerQuestion = 3;   //30 seconds
//initialize variables to keep track of scores
//var score = 0;
var unasnwered = 0;
var correct = 0;
var wrong = 0;
var userInput; //here I want to capture the value of the li tag the user clicks
var i = 0;
var ticktock; //timer

//array with images to alert win 
//var correctImages = ['assets/images/testIMG1.gif', 'assets/images/testIMG2/gif', 'assets/images/testIMG3'];
//var incorrectImges = ['assets/images/testIMG3.gif', 'assets/images/testIMG2.gif', 'assets/images/testIMG1'];

//we need the timer to stop ]/freeze when results are displayed at the end of the game
//var clockRunning = false;

//select button tag & start on click function
    $('button').on('click', function() {
    //select button tag to be removed, and later replaced with new html content (questions)
    $('button').remove();  //esta esta funcionando bien!
    //show hidden html
    $('#mainDiv').show();
    //show timer
    $('.timer').show();
    printQuestion();
    //display time
    timeCount();
    //set interval
    ticktock = setInterval(timeCount, 1000);
});

function printQuestion() {
    if(i  < questions.length) {
        $('h2').text(questions[i].askQuestion);
        console.log('i am iside of: ' + i);
        $('.firstOption').text(questions[i].answer1);
        $('.secondOption').text(questions[i].answer2);
        $('.thirdOption').text(questions[i].answer3); 
        secondsPerQuestion = 3;
        //userClickedLi();   
   //}else if(questions[i] === questions.length) {
        //i = 0;
    }else{
        clearInterval(ticktock);
        console.log(i);
        //show results
        //alert('last index number');
        var holdResults = setTimeout(function() { 
            console.log('release results');
            displayResults();
            //clearInterval(ticktock); it does not seem to have any effect if I remove it 
            //restart();
      }, 2000);   
}};

//now, how can I make the options clickable: made changes in css file
/* next, I have to create a click event funciton to capture when an li tag is clicked on.
Effect: declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
//function userClickedLi() {
$('li').on('click', function() { 
    userInput = $(this).text(); 
    if(userInput === questions[i].correctAnswer && i < questions.length) {
        console.log(userInput);
        correct++;
        $('#correct').text(correct);  //I am not required to display the point here, but I will keep it here for now
                //animated alert congratulating user
                            //$('#mainDiv').remove(); //I will make a funciton outside this function and call it back here once it is ready
                            //$('.correctAlert').show(); //i want to display an animated alert for 3 seconds
        //increment the index number in 'questions' array 
        //imgae alert for 3 seconds
        correctImgAlert();
        console.log([i]);
        console.log([i]);
        //if var i is less than questions.length, generate the next question
        //userClickedLi();  
        //since i is being incremented after we run the last question index number, I am getting an error of undefined 
        //a solution would be to prevent our printQuestion function from running if index number exceeds the existing ones 
    }else if(userInput !== questions[i].correctAnswer && i < questions.length) {
        //increment wrong by 1
        wrong++;
        $('#wrong').text(wrong);
        //alert user answer is wrong and display the correct answer
        incorrectImgAlert();
                 
    }else if(!userInput && 0 === secondsPerQuestion) {
        unasnwered++;
        console.log(unasnwered);
        $('#unasnwered').text(unasnwered);    
    }
    i++;
    printQuestion(); 
});


//when user answers a question correctly, an animated alert showd be displayed
function correctImgAlert() {
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgCorrect);
    image.css('height', '20%');
    image.css('width', '25%');
    $('.imgDiv').append(image);
    //I need to stop the timer
    clearInterval(ticktock);
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
}

function incorrectImgAlert() {
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgIncorrect);
    $('.imgDivIncorrect').append(image);
    image.css('height', '20%');
    image.css('width', '25%');
    //I need to stop the timer
    clearInterval(ticktock);
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
}

function timeCount() { //esta esta funcionando bien
    //set conditions for when the time should be running
    console.log('seconds per question' + secondsPerQuestion);
    if(0 < secondsPerQuestion) {
        //$('#timeCountDown').innerHTML = count;
        $('#timeCountDown').text(secondsPerQuestion);
        secondsPerQuestion--;
        //if(0 === secondsPerQuestion) {
            //unasnwered++;
            //console.log(unasnwered);
            //$('#unasnwered').text(unasnwered);
            //i++;
            //}
    }else if(0 === secondsPerQuestion) {
        
        i++;
        console.log('this is i: ' + i);
        printQuestion();

    }
};

function displayResults() {
    $('#mainDiv').hide();
    $('#resultsDiv').show();
    //I need to stop the timer
    clearInterval(ticktock);
    //clockRunning = false;          
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