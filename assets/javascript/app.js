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
    }
];
//initialize global variable that will hold the time 
var timeIsUp = 0; 
var secondsPerQuestion = 30;   //30 seconds
//initialize variables to keep track of scores
var score = 0;
var correct = 0;
var wrong = 0;
var questionIndex = 0;  //this can help to keep track of which question is being generated
var userInput; //here I want to capture the value of the li tag the user clicks
var i = 0;
var ticktock;
var showNextQuestion;





//select button tag & start on click function
var startButton = $('button').on('click', function() {
    //select button tag to be removed, and later replaced with new html content (questions)
    $('button').remove();  //esta esta funcionando bien!
    //call loopThroughQuestions funciton
    //loopThroughQuestions(); 
    //show hidden html
    $('#mainDiv').show();
    printQuestion();
    //generateQuestion();
    //display time
    //$('#timeCountDown').text(30);
    timeCount();
    var ticktock = setInterval(timeCount, 1000);

});

function printQuestion() {
    if(i  < questions.length) {
        $('h2').text(questions[i].askQuestion);
                //$('.firstOption').attr('value', questions[i].answer1);  //attributes are always strings
                //$('.secondOption').attr('value', questions[i].answer2);
                //$('.thirdOption').attr('value', questions[i].answer3);
        $('.firstOption').text(questions[i].answer1);
        $('.secondOption').text(questions[i].answer2);
        $('.thirdOption').text(questions[i].answer3); //1st question and 1st set of answers are printed on the page uffff! x fin!!!!!
        userClickedLi();
        
        
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
        score++;
        $('#perQuestionScore').text(score);  //I am not required to display the point here, but I will keep it here for now
                //animated alert congratulating user
        //$('.firstOption').detach(questions[i].answer1);
        //$('.secondOption').detach(questions[i].answer2);
        //$('.thirdOption').detach(questions[i].answer3);
        //increment the index number in 'questions' array 
        //if(i  < questions.length - 1) {
         i++;
        console.log([i]);
        //if var i is less than questions.length, generate the next question
        printQuestion();    
    }else{
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
    }else{
        //reset time per question back to 30 seconds
        secondsPerQuestion = 30;
    }
};


//this function will have an if/else statement to compare the user's input to the answers
function conditionsCorrectAnswer() {
     
}

//closes $(document).ready(function() 
});