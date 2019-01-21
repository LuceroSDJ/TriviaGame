$(document).ready(function() {

//Create an array of question objects to loop through
var questions = [
    {
        askQuestion: 'Test question #1?', 
        answer1: 'one',
        answer2: 'two',
        answer3: 'three',
        correctAnswer: 'one', //this indicates the index number of the correct answer(not anymore). Now, it represents the value
    },
    {
        askQuestion: 'Test question #2?', 
        answer1: 'uno',
        answer2: 'dos',
        answer3: 'tres',
        correctAnswer: 'dos',
    },
    {
        askQuestion: 'Test question #3?', 
        answer1: 'uno',
        answer2: 'dos',
        answer3: 'tres',
        correctAnswer: 'tres',
    }
];

//initialize global variable that will hold the time 
var timeIsUp = 0; 
var secondsPerQuestion = 30;   //30 seconds
//initialize variables to keep track of scores
//var score = 0;
var correct = 0;
var wrong = 0;
var userInput; //here I want to capture the value of the li tag the user clicks
var i = 0;
var ticktock; //timer

//we need the timer to stop ]/freeze when results are displayed at the end of the game
//var clockRunning = false;

//select button tag & start on click function
var startButton = $('button').on('click', function() {
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
        $('.thirdOption').text(questions[i].answer3); //1st question and 1st set of answers are printed on the page uffff! x fin!!!!!
        secondsPerQuestion = 30;
        userClickedLi();   
    }else{
        //show results
        alert('last index number');
        displayResults();
    }
};

 //now, how can I make the options clickable: made changes in css file
/* next, I have to create a click event funciton to capture when an li tag is clicked on.
Effect: declare conditions comparing user's input to the  VALUE of 'correctAnswer' */
function userClickedLi() {
$('li').on('click', function() { 
    userInput = $(this).text(); 
    if(userInput === questions[i].correctAnswer) { 
        console.log(userInput);
        correct++;
        $('#correct').text(correct);  //I am not required to display the point here, but I will keep it here for now
                //animated alert congratulating user
    
        //increment the index number in 'questions' array 
        i++;
        console.log([i]);
        //if var i is less than questions.length, generate the next question
        printQuestion();
        userClickedLi();  
        //since i is being incremented after we run the last question index number, I am getting an error of undefined 
        //a solution would be to prevent our printQuestion function from running if index number exceeds the existing ones  
    }else{
        wrong++;
        $('#wrong').text(wrong);
                //alert user answer is wrong and display the correct answer
                //increment wrong by 1
                //printQuestion();
    }
});
}

function timeCount() { //esta esta funcionando bien
    //set conditions for when the time should be running
    if(timeIsUp <= secondsPerQuestion) {
        //$('#timeCountDown').innerHTML = count;
        $('#timeCountDown').text(secondsPerQuestion);
        secondsPerQuestion--;
        //clockRunning = true;
    }else{
        //reset time per question back to 30 seconds
        secondsPerQuestion = 30;
    }
};

function displayResults() {
    $('#mainDiv').remove();
    $('#resultsDiv').show();
    //I need to stop the timer
    clearInterval(ticktock);
    //clockRunning = false;          
};

//closes $(document).ready(function() 
});