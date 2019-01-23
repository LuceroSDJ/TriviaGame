$(document).ready(function() {

//Create an array of question objects to loop through
var questions = [
    {
        askQuestion: 'Test question #1?', 
        answer1: 'one',
        answer2: 'two',
        answer3: 'three',
        correctAnswer: 'one', //this indicates the index number of the correct answer(not anymore). Now, it represents the value
        imgCorrect: 'assets/images/testIMG1.gif',
        imgIncorrect: 'assets/images/estrellas.gif',
    },
    {
        askQuestion: 'Test question #2?', 
        answer1: 'uno',
        answer2: 'dos',
        answer3: 'tres',
        correctAnswer: 'dos',
        imgCorrect: 'assets/images/testIMG2.gif',
        imgIncorrect: 'assets/images/estrellas.gif',
    },
    {
        askQuestion: 'Test question #3?', 
        answer1: 'uno',
        answer2: 'dos',
        answer3: 'tres',
        correctAnswer: 'tres',
        imgCorrect: 'assets/images/testIMG3.gif',
        imgIncorrect: 'assets/images/estrellas.gif',
    }
];

//initialize global variable that will hold the time 
var timeIsUp = 0; 
var secondsPerQuestion = 30;   //30 seconds
//initialize variables to keep track of scores
//var score = 0;
var unasnwered = 0;
var correct = 0;
var wrong = 0;
var userInput; //here I want to capture the value of the li tag the user clicks
var i = 0;
var ticktock; //timer
var holdAlert;
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
        $('.firstOption').text(questions[i].answer1);
        $('.secondOption').text(questions[i].answer2);
        $('.thirdOption').text(questions[i].answer3); 
        secondsPerQuestion = 30;
        //userClickedLi();   
   //}else if(questions[i] === questions.length) {
        //i = 0;
    }else{
        clearInterval(ticktock);
        //i = 0; //this fixed the error 'i' undefined
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

function iTOzero() {
    if(i === questions.length - 1) {
        i = 0;
        printQuestion();
    }
};

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
        i++;
        console.log([i]);
        //if var i is less than questions.length, generate the next question
        printQuestion();
        //userClickedLi();  
        //since i is being incremented after we run the last question index number, I am getting an error of undefined 
        //a solution would be to prevent our printQuestion function from running if index number exceeds the existing ones  

    }else if (userInput !== questions[i].correctAnswer && i < questions.length) {
        //increment wrong by 1
        wrong++;
        $('#wrong').text(wrong);
        //alert user answer is wrong and display the correct answer
        incorrectImgAlert();
     

        i++;
        printQuestion();           
    }
    /*else{
        holdUnanswered();
    }*/
});


function holdUnanswered() {
    var delayUnasnwered = setTimeout(function(){
        if(secondsPerQuestion === timeIsUp) {
        i++;
        printQuestion();
        }

    },30000);    
};
//}

holdUnanswered();

//when user answers a question correctly, an animated alert showd be displayed
function correctImgAlert() {
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgCorrect);
    $('.imgDiv').append(image);
    //I need to stop the timer
    clearInterval(ticktock);
    //$('.imgDiv').show();
    $('.winMssg').show();
    
    //ticktock = setInterval(timeCount, 1000);
    holdAlert = setTimeout(function() {  
        $('.winMssg').hide();
        $('.imgDiv').empty();
        $('#mainDiv').show();
        //secondsPerQuestion = 30;
        timeCount();
        ticktock = setInterval(timeCount, 1000);
        //i++;
        //printQuestion();  
    }, 2000);
    //then, I need to display the alert message for only 3 seconds
}

function incorrectImgAlert() {
    $('#mainDiv').hide();
    var image = $('<img>');
    image.prop('src', questions[i].imgIncorrect);
    $('.imgDivIncorrect').append(image);
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
    //then, I need to display the alert message for only 3 seconds
}



function timeCount() { //esta esta funcionando bien
    //set conditions for when the time should be running
    if(timeIsUp <= secondsPerQuestion) {
        //$('#timeCountDown').innerHTML = count;
        $('#timeCountDown').text(secondsPerQuestion);
        secondsPerQuestion--;
        //clockRunning = true;
    //}else{
        //reset time per question back to 30 seconds
        //secondsPerQuestion = 30;
    }
};

function displayResults() {
    $('#mainDiv').remove();
    $('#resultsDiv').show();
    //I need to stop the timer
    clearInterval(ticktock);
    //clockRunning = false;          
};

//function restart() {
    $('#restart').on('click', function() {
        
        correct = 0;
        wrong = 0;
        unasnwered = 0;
        $('#resultsDiv').hide();
        $('#mainDiv').show();
        // i must be set back to zero. i has been set back to zero, however, the question is not regenerated (bug) *********
        i = 0;
        printQuestion();
        

    });
    //when restart button is clicked do the following:
    //i must be reset back to 0
    //first question needs to be reprinted, then second and so on
    
    //timer reset to 30 seconds
//};

//left off on line 87
//bug: see line 155

//closes $(document).ready(function() 
});